const { Client } = require("discord.js");
const { default: DisTube } = require("distube");
let done = false;
const { serverID, channel } = require("./config.json");

/**
 *
 * @param {Client} client
 * @param {DisTube} distube
 */
module.exports = async (client, distube) => {
  console.log(`[CONNECTED PLAYER]`);
  let guild = await client.guilds.cache.get(serverID);
  // voiceChannel
  let song = `https://www.youtube.com/watch?v=jfKfPfyJRdk`
  await guild.channels.fetch();
  let voiceChannel = await client.channels.cache
    .filter((ch) => ch.type === "GUILD_STAGE_VOICE")
    .get(channel);

  setInterval(async () => {
    let currentTime = calcTime(`+6`);
    let fajrTime = `5:30:00 AM`;
    let JoharTime = `1:00:00 PM`;
    let AsarTime = `4:15:00 PM`;
    let MaghribTime = `5:55:00 PM`;
    let IshaTime = `07:10:00 PM`;

    if (currentTime == fajrTime) {
      if (done === false) {
        await distube.play(voiceChannel, song);
      } else {
        done = true;
      }
    } else if (currentTime == JoharTime) {
      if (done === false) {
        await distube.play(voiceChannel, song);
      } else {
        done = true;
      }
    } else if (currentTime == AsarTime) {
      if (done === false) {
        await distube.play(voiceChannel, song);
      } else {
        done = true;
      }
    } else if (currentTime == MaghribTime) {
      if (done === false) {
        await distube.play(voiceChannel, song);
      } else {
        done = true;
      }
    } else if (currentTime == IshaTime) {
      if (done === false) {
        await distube.play(voiceChannel, song);
      } else {
        done = true;
      }
    }
  }, 1000);

  // events
  distube.on("disconnect", async (queue) => {
    done = false;
  });
  distube.on("finishSong", async (queue, song) => {
    done = false;
  });

  // for stage channel
  client.on("voiceStateUpdate", async (os, ns) => {
    if (
      ns.channelId &&
      ns.channel.type === "GUILD_STAGE_VOICE" &&
      ns.guild.me.voice.suppress
    ) {
      if (
        ns.guild.me.permissions.has("SPEAK") ||
        (ns.channel && ns.channel.permissionsFor(ns.guild.me).has("SPEAK"))
      ) {
        await ns.guild.me.voice.channel.createStageInstance({
          topic: `Azan is now, do you remember the prayers?`,
          privacyLevel: "PUBLIC",
        });
        await ns.guild.me.voice.setSuppressed(false).catch((e) => {});
      }
    }
  });
};

function calcTime(offset) {
  d = new Date();

  utc = d.getTime() + d.getTimezoneOffset() * 60000;

  nd = new Date(utc + 3600000 * offset);

  return nd.toLocaleTimeString();
}
