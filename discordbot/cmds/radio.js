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
          let jsonfs = JSON.parse(this.responseText);
          let url = jsonfs.link;
          if(url != null || url != undefined){
            let title = jsonfs.title;
            utils.throwEmbed(msg, "Radio", "Momentan läuft: \n" + title, "#c96363", "https://camo.githubusercontent.com/323e46a74461fd6c201cf91da6a8d2cbcca92297/68747470733a2f2f7669676e657474652e77696b69612e6e6f636f6f6b69652e6e65742f6e69636f646f75676173696e676572732f696d616765732f312f31382f53656c7068792e706e672f7265766973696f6e2f6c61746573743f63623d3230313830393037303531353533", url)
            const stream = ytdl(url, { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            dispatcher.on('finish', () => radio(msg));
        } else {
          msg.channel.send("> Oopsie! Anscheinend ist ein kleiner Fehler aufgetreten. Starte das Radio einfach mal neu, dann sollte alles wieder in Ordnung sein ^-^")
        }
    }
  })
}
}

async function readUrls(){
  //todo
}
