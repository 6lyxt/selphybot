const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require("express")
const fs = require("fs")
const {config} = require("dotenv")
const app = express()
config({ path: __dirname + "/.env" });

process.on('uncaughtException', function () {
  console.log('An internal error occured');
});

app.get('/', async function (req, res) {
  res.send('/api, /api/song')
})

app.get('/api/', async function(req, res) {
  res.send('/song')
})

app.get('/api/flip', async function(req, res) {
    fs.readFile("./api/characters.json", (err,data) => {
      let json = JSON.parse(data);
      let info = json.items;
      let random = Math.floor(Math.random() * (info.length + 1));
      let final = info[random];
      res.send('{"character": "' + final.character + '", "picture": "' + final.picture + '"}');
    })
})

app.get('/api/song', async function(req, res) {
  let channelID = "UCBdIstCmMf6W1IcL7hgyL9Q";
  let api = process.env.apiKey;
  let videoUrls = "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=" + channelID + "&maxResults=50&key=" + api;

  var ajax = new XMLHttpRequest();
  ajax.open("GET", videoUrls, true);
  ajax.send();
  ajax.onreadystatechange = function(){
  let stringed = this.responseText.toString();
      if(stringed.includes("error")) {

        fs.readFile("./api/videos.json", (err,data) => {
          if(err) return err;
          var json = JSON.parse(data);
          var videos = json.items;
          var random = Math.floor(Math.random() * (videos.length + 1));
          var video = videos[random];
          if(video.id.videoId !== undefined){
            res.send('{"link":"https://www.youtube.com/watch?v='+ video.id.videoId + '", "title": "' + video.snippet.title + '", "thumbnail": "' + video.snippet.thumbnails.medium.url + '"}');
          } else {
            res.send('an error occured')
          }
        })
      } else {
      if(this.readyState == 4 && this.status == 200){
      var json = JSON.parse(this.responseText);
      var videos = json.items;
      var random = Math.floor(Math.random() * (videos.length + 1));
      var video = videos[random];
      if(video.id.videoId !== undefined){
      res.send('{"link":"https://www.youtube.com/watch?v='+ video.id.videoId + '", "title": "' + video.snippet.title + '", "thumbnail": "' + video.snippet.thumbnails.medium.url + '"}');
    } else {
      res.send('an error occured')
    }
    }
  }
}
})


app.listen(1337, function(){
  console.log('running on port 1337');
})
