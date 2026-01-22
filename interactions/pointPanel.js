const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const emojis = require("../utils/emojis");

function panelRow() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("points_add")
      .setLabel("إضافة نقاط")
      .setEmoji(emojis.add)
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("points_remove")
      .setLabel("إزالة نقاط")
      .setEmoji(emojis.remove)
      .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()
      .setCustomId("points_top")
      .setLabel("ترتيب النقاط")
      .setEmoji(emojis.top)
      .setStyle(ButtonStyle.Primary)
  );
}

module.exports = { panelRow };
