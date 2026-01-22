const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const { db } = require("../utils/database");
const emojis = require("../utils/emojis");

module.exports = async (interaction) => {
  const guildId = interaction.guild.id;
  const data = Object.entries(db.points[guildId] || {})
    .sort((a, b) => b[1] - a[1]);

  if (!data.length)
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${emojis.error} لا يوجد نقاط مسجلة`)
          .setColor("Red")
      ],
      ephemeral: true
    });

  let page = 0;
  const perPage = 10;
  const maxPage = Math.floor((data.length - 1) / perPage);

  const buildEmbed = () => {
    const slice = data.slice(page * perPage, page * perPage + perPage);
    return new EmbedBuilder()
      .setTitle(`${emojis.top} ترتيب نقاط الإداريين`)
      .setThumbnail(interaction.guild.iconURL())
      .setColor("#5865F2")
      .setFooter({ text: `الصفحة ${page + 1} من ${maxPage + 1}` })
      .setDescription(
        slice
          .map(
            (u, i) =>
              `**${page * perPage + i + 1}.** <@${u[0]}> — ${u[1]} ${emojis.points}`
          )
          .join("\n")
      );
  };

  const row = () =>
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("lb_prev")
        .setEmoji(emojis.left)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === 0),
      new ButtonBuilder()
        .setCustomId("lb_next")
        .setEmoji(emojis.right)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === maxPage)
    );

  const msg = await interaction.reply({
    embeds: [buildEmbed()],
    components: [row()],
    fetchReply: true
  });

  const collector = msg.createMessageComponentCollector({
    filter: (b) => b.user.id === interaction.user.id,
    time: 60000
  });

  collector.on("collect", async (b) => {
    if (b.customId === "lb_next") page++;
    if (b.customId === "lb_prev") page--;

    await b.update({
      embeds: [buildEmbed()],
      components: [row()]
    });
  });
};
