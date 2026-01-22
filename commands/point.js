const { EmbedBuilder } = require("discord.js");
const { panelRow } = require("../interactions/pointPanel");
const { ensureGuild } = require("../utils/database");

module.exports = {
  name: "point",
  execute: async (client, message) => {
    if (!message.member.permissions.has("Administrator")) return;

    ensureGuild(message.guild.id);

    const embed = new EmbedBuilder()
      .setTitle("لوحة إدارة النقاط")
      .setThumbnail(message.guild.iconURL())
      .setColor("#5865F2");

    message.channel.send({
      embeds: [embed],
      components: [panelRow(message)]
    });
  }
};
