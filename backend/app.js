const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('{API Overview: /api/song[], /api/game/element}')
})

app.get('/api/', function(req, res) {
  res.send('{/song,/game/element}')
})

app.get('/api/song', function(req, res) {
  let channelID = "UCBdIstCmMf6W1IcL7hgyL9Q";
  let api = "AIzaSyDxj7GeLb6jKxVLbDj68xjlFOM59QJW9Z8";
  let videoUrls = "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=" + channelID + "&maxResults=50&key=" + api;

  var ajax = new XMLHttpRequest();
  ajax.open("GET", videoUrls, true);
  ajax.send();
  ajax.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var json = JSON.parse(this.responseText);
      var videos = json.items;
      var random = Math.floor(Math.random() * (videos.length + 1));
      var video = videos[random];
      res.send('{"link":"https://www.youtube.com/watch?v='+ video.id.videoId + '", "title": "' + video.snippet.title + '"}');
    }
  }
})


app.listen(8000, function(){
  console.log('running on port 8000');
})
