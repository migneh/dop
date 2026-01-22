const {
  EmbedBuilder
} = require("discord.js");
const { getPoints, setPoints } = require("../utils/database");
const emojis = require("../utils/emojis");

async function collectMessage(channel, user, time = 30000) {
  try {
    const collected = await channel.awaitMessages({
      filter: (m) => m.author.id === user.id,
      max: 1,
      time
    });
    const msg = collected.first();
    await msg.delete();
    return msg.content;
  } catch {
    return null;
  }
}

async function ask(channel, user, text) {
  const m = await channel.send({ embeds: [new EmbedBuilder().setDescription(text).setColor("#5865F2")] });
  const res = await collectMessage(channel, user);
  await m.delete();
  return res;
}

function parseMentions(content) {
  return [...content.matchAll(/<@!?(\d+)>/g)].map(m => m[1]);
}

module.exports = async (interaction) => {
  const channel = interaction.channel;
  const author = interaction.user;
  const guildId = interaction.guild.id;

  const mode =
    interaction.customId === "points_add" ? "add" : "remove";

  await interaction.deferUpdate();

  const mentionInput = await ask(
    channel,
    author,
    "منشن الإداريين (يمكن أكثر من واحد)"
  );

  if (!mentionInput)
    return channel.send(`${emojis.error} لم يتم العثور على إداري`);

  const users = parseMentions(mentionInput);
  if (!users.length)
    return channel.send(`${emojis.error} منشن غير صحيح`);

  const amountInput = await ask(
    channel,
    author,
    "اكتب عدد النقاط أو `all`"
  );

  if (!amountInput)
    return channel.send(`${emojis.error} العدد غير صحيح`);

  users.forEach((id) => {
    const current = getPoints(guildId, id);

    if (amountInput === "all") {
      setPoints(guildId, id, 0);
    } else {
      const num = parseInt(amountInput);
      if (isNaN(num)) return;

      setPoints(
        guildId,
        id,
        mode === "add" ? current + num : Math.max(current - num, 0)
      );
    }
  });

  channel.send({
    embeds: [
      new EmbedBuilder()
        .setColor("Green")
        .setDescription(
          `${emojis.success} تم ${
            mode === "add" ? "إضافة" : "إزالة"
          } النقاط بنجاح`
        )
    ]
  });
};
