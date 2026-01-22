const { EmbedBuilder } = require("discord.js");
const { getPoints } = require("../utils/database");
const emojis = require("../utils/emojis");

module.exports = {
  name: "points",
  execute: async (client, message) => {
    const pts = getPoints(message.guild.id, message.author.id);

    const embed = new EmbedBuilder()
      .setTitle("نقاطك")
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`${emojis.points} **${pts}**`)
      .setColor("#5865F2");

    message.channel.send({ embeds: [embed] });
  }
};
