const Discord = require('discord.js');
const { config } = require("dotenv");
const utils = require('./utils')
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const version = "1.0.0";
const prefix = "selphy! ";
config({ path: __dirname + "/.env" });

//commands
const radioCMD = require('./cmds/radio')
const statsCMD = require('./cmds/stats')
const leaveCMD = require('./cmds/leave')
const helpCMD = require('./cmds/help')
const liveCMD = require('./cmds/twitch')
const flipCMD = require('./cmds/flip')

bot.on('ready', () => {
  console.log("Selphy ist on!");
  refreshPresence(bot)
})

bot.on('guildCreate', guild => {
  console.log("Neuem Server beigetreten: " + guild.name);
  refreshPresence(bot)
})

bot.on('message', async msg => {
  let cmd = msg.content;
  let args = cmd.split(' ');
	let argCMD = args.shift().toLowerCase();

  switch(cmd){
    case prefix + "radio":
       radioCMD.radio(msg);
    break;

    case prefix + "help":
      helpCMD.help(msg);
    break;

    case prefix + "live":
      liveCMD.twitch(msg);
    break;

    case prefix + "leave":
      leaveCMD.leave(msg);
    break;

    case prefix + "stats":
      statsCMD.stats(msg, bot);
    break;

    case prefix + "flip":
      flipCMD.flip(msg, args, argCMD);
    break;
  }
});


async function refreshPresence(bot){
  bot.user.setActivity("music on " + bot.guilds.cache.size + " servers", {type: "PLAYING"});
}

bot.login(process.env.token);
