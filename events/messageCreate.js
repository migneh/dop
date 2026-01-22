const config = require("../config.json");
const commandHandler = require("../handlers/commandHandler");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  commandHandler(client, message);
};
