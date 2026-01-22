const { EmbedBuilder } = require("discord.js");
const emojis = require("./emojis");

const MAIN_COLOR = "#5865F2";
const SUCCESS_COLOR = "#57F287";
const ERROR_COLOR = "#ED4245";

/**
 * Embed خطأ
 */
function errorEmbed(text) {
  return new EmbedBuilder()
    .setColor(ERROR_COLOR)
    .setDescription(`${emojis.error} ${text}`);
}

/**
 * Embed نجاح
 */
function successEmbed(text) {
  return new EmbedBuilder()
    .setColor(SUCCESS_COLOR)
    .setDescription(`${emojis.success} ${text}`);
}

/**
 * Embed لوحة إدارة النقاط
 */
function pointPanelEmbed(guild) {
  return new EmbedBuilder()
    .setTitle("لوحة إدارة النقاط")
    .setThumbnail(guild.iconURL())
    .setColor(MAIN_COLOR)
    .setDescription(
      `${emojis.add} إضافة نقاط\n` +
      `${emojis.remove} إزالة نقاط\n` +
      `${emojis.top} ترتيب الإداريين`
    );
}

/**
 * Embed نقاط عضو
 */
function userPointsEmbed(user, points) {
  return new EmbedBuilder()
    .setTitle("نقاطك")
    .setThumbnail(user.displayAvatarURL())
    .setColor(MAIN_COLOR)
    .setDescription(`${emojis.points} **${points}**`);
}

/**
 * Embed ترتيب النقاط (Leaderboard)
 */
function leaderboardEmbed(guild, description, page, maxPage) {
  return new EmbedBuilder()
    .setTitle(`${emojis.top} ترتيب نقاط الإداريين`)
    .setThumbnail(guild.iconURL())
    .setColor(MAIN_COLOR)
    .setDescription(description)
    .setFooter({ text: `الصفحة ${page + 1} من ${maxPage + 1}` });
}

module.exports = {
  errorEmbed,
  successEmbed,
  pointPanelEmbed,
  userPointsEmbed,
  leaderboardEmbed
};
