const { Client } = require("discord.js");
const Distube = require("distube").default;
const { YtDlpPlugin } = require(`@distube/yt-dlp`);
const { token } = require("./config.json");

const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_VOICE_STATES"],
});

const distube = new Distube(client, {
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  youtubeDL: false, // Disable the deprecated version of YTDL
  plugins: [
    new YtDlpPlugin({
      updateYouTubeDL: true,
    }),
  ],
  searchCooldown: 0,
});

client.on("ready", async () => {
  await require("./player")(client, distube);
  console.log(`${client.user.tag} is Ready`);
  client.user.setActivity({
    name: `Coded By XTawhidX#6585`,
    type: "WATCHING",
  });
});
require('./server')();
client.login(token);
