const Discord = require('discord.js');

module.exports = {
      throwEmbed: async function throwEmbed(msg, title, description, color ,thumbnail){
          const embed = new Discord.MessageEmbed()
          .setFooter("selphybot by lyxt#0666")
          .setColor(color)
          .setTitle(title)
          .setDescription(description)
          .setThumbnail(thumbnail);
          msg.channel.send(embed);
      }
}
