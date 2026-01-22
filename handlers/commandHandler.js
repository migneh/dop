const fs = require("fs");
const path = require("path");

module.exports = async (client, message) => {
  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const commandsPath = path.join(__dirname, "../commands");
  const files = fs.readdirSync(commandsPath);

  for (const file of files) {
    const command = require(`../commands/${file}`);
    if (command.name === commandName) {
      return command.execute(client, message, args);
    }
  }
};
