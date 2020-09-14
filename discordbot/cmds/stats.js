const utils = require('../utils')
const needle = require("needle")

module.exports = {
  stats: async function stats(msg, bot){
    needle.get("http://www.selphybot.xyz:1337", (req, res) => {
      var status;
        if(res.statusCode == 200) status = "OK";
        if(res.statusCode != 200) status = "OFFLINE";

        utils.throwEmbed(msg, "Stats", "Also mein Ping liegt bei **" + (Date.now() - msg.createdTimestamp) + "**, ich bin auf **" + bot.guilds.cache.size + "** Servern, ich bin seit **" + msToTime(bot.uptime) +  "** online und mein WEBAPI Status ist **" + status + "**!", "#c96363", null, "http://www.selphybot.xyz", null);
    })
  }
}

function msToTime(ms){
  days = Math.floor(ms / 86400000);
  daysms = ms % 86400000;
  hours = Math.floor(daysms / 3600000);
  hoursms = ms % 3600000;
  minutes = Math.floor(hoursms / 60000);
  minutesms = ms % 60000;
  sec = Math.floor(minutesms / 1000);

  let str = "";
  if (days) str = str + days + "d";
  if (hours) str = str + hours + "h";
  if (minutes) str = str + minutes + "m";
  if (sec) str = str + sec + "s";

  return str;
}
