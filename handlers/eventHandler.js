const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const eventsPath = path.join(__dirname, "../events");
  const events = fs.readdirSync(eventsPath);

  for (const file of events) {
    const event = require(`../events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  }
};
