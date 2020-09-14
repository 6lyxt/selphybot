const utils = require('../utils')
const needle = require('needle')
const fs = require("fs")

process.on('uncaughtException', function () {
  console.log('An internal error occured');
});

module.exports = {
  flip: async function flip(msg, args, argCMD){
    needle.get("http://www.selphybot.xyz:1337/api/flip", (rej, res) => {
      if(rej) return rej;

      let json = JSON.parse(res.body);
      let character = json.character;
      let picture = json.picture;
      utils.throwEmbed(msg, "Flip", character, "#c96363", picture, "http://www.selphybot.xyz:1337/api/", true)

      const filter = (reaction, user) => {
      	return reaction.emoji.name === '✅' && user.id === msg.author.id;
      };

      const collector = msg.createReactionCollector(filter, { time: 15000 });

      collector.on('collect', (reaction, user) => {
         fs.readFile("./json/" + user.id + ".json", (err, data) => {
          if(err) console.log(err);
          if(data !== undefined && data.toString().includes(character)) {
            msg.reply("du hast diesen Charakter doch schon!")
            return
          }
      	    fs.appendFile("./json/" + user.id + ".json", '["' + character + '"]' , (err) => {
             if(err) throw err;
             console.log(err);
             msg.reply("du hast diesen Charakter absofort im Inventar!");

         })
        })
      });

      collector.on('end', () => {
      	console.log('Collector ended');
      });
    })
  }
}
