const ytdl = require('ytdl-core');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const utils = require('../utils')
const fs = require('fs')
const needle = require("needle")

process.on('uncaughtException', function () {
  console.log('An internal error occured');
});


module.exports = {
  radio: async function radio(msg){
    if(!msg.member.voice.channel) return msg.reply("du musst in einem Voice Channel sein, damit du dem Radio lauschen kannst!")

    msg.member.voice.channel.join().then(connection => {
      var ajax = new XMLHttpRequest();
      ajax.open("GET", "http://www.selphybot.xyz:1337/api/song", true);
      ajax.send();
      ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          if(!(this.responseText.toString().includes("error"))){

          let jsonfs = JSON.parse(this.responseText);
            let url = jsonfs.link;
            let title = jsonfs.title;
            let thumb = jsonfs.thumbnail;
            utils.throwEmbed(msg, "Radio", "Momentan läuft: \n" + title, "#c96363", thumb, url)
            const stream = ytdl(url, { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            dispatcher.on('finish', () => radio(msg));
        } else {
          msg.channel.send("> Oopsie! Anscheinend ist ein kleiner Fehler aufgetreten. Starte das Radio einfach mal neu, dann sollte alles wieder in Ordnung sein ^-^")
        }
    }
  }
})
}
}

async function readUrls(){
  //todo
}
