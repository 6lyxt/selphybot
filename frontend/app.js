const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.listen(8000, function() {
  console.log("running on port 8000")
})
