const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/bot/' || '/bot', function(req, res) {
  res.render('bot.ejs')
})

app.get('/invite', function(req, res) {
  res.redirect('https://discord.com/api/oauth2/authorize?client_id=744710150782189611&permissions=8&scope=bot')
})


app.listen(80, function() {
  console.log("running on port 80")
})
