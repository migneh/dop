const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const emojis = require("./emojis");

/**
 * إنشاء أزرار Pagination
 * @param {number} page الصفحة الحالية (0-based)
 * @param {number} maxPage آخر صفحة (0-based)
 */
function paginationRow(page, maxPage) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("page_prev")
      .setEmoji(emojis.left)
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page <= 0),

    new ButtonBuilder()
      .setCustomId("page_next")
      .setEmoji(emojis.right)
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page >= maxPage)
  );
}

/**
 * Pagination Collector
 * @param {Message} message رسالة الإيمبد
 * @param {User} user صاحب التفاعل
 * @param {Function} onPageChange callback(page)
 * @param {number} maxPage
 */
function createPaginationCollector(message, user, onPageChange, maxPage) {
  let page = 0;

  const collector = message.createMessageComponentCollector({
    filter: (i) => i.user.id === user.id,
    time: 60000
  });

  collector.on("collect", async (i) => {
    if (i.customId === "page_next" && page < maxPage) page++;
    if (i.customId === "page_prev" && page > 0) page--;

    await onPageChange(page, i);
  });

  return collector;
}

module.exports = {
  paginationRow,
  createPaginationCollector
};
