const leaderboard = require("../interactions/leaderboard");
const pointActions = require("../interactions/pointActions");

module.exports = async (client, interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "points_top") return leaderboard(interaction);
  if (
    interaction.customId === "points_add" ||
    interaction.customId === "points_remove"
  )
    return pointActions(interaction);
};
