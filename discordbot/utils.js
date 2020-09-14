const Discord = require('discord.js');

module.exports = {
      throwEmbed: async function throwEmbed(msg, title, description, color ,thumbnail, url, react){
          const embed = new Discord.MessageEmbed()
          .setFooter("selphybot by lyxt#0666")
          .setURL(url)
          .setColor(color)
          .setTitle(title)
          .setDescription(description)
          .setImage(thumbnail);

          if(react) {
            msg.channel.send(embed)
            .then(function(message) {
              message.react('✅')
          }).catch(function(){
            console.log("Internal error")
          });
        } else {
          msg.channel.send(embed);
        }
      }
}
