const Discord = require('discord.js');

module.exports = {
      throwEmbed: async function throwEmbed(msg, title, description, color ,thumbnail, url){
          const embed = new Discord.MessageEmbed()
          .setFooter("selphybot by lyxt#0666")
          .setURL(url)
          .setColor(color)
          .setTitle(title)
          .setDescription(description)
          .setThumbnail(thumbnail);
          msg.channel.send(embed);
      }
}
