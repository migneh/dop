const fs = require("fs");
let db = require("../database.json");

if (!db.points) db.points = {};

function save() {
  fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
}

function ensureGuild(guildId) {
  if (!db.points[guildId]) db.points[guildId] = {};
}

function getPoints(guildId, userId) {
  ensureGuild(guildId);
  return db.points[guildId][userId] || 0;
}

function setPoints(guildId, userId, value) {
  ensureGuild(guildId);
  db.points[guildId][userId] = value;
  save();
}

module.exports = {
  ensureGuild,
  getPoints,
  setPoints,
  db,
  save
};
