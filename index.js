var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/colors-and-size', function (req, res, next) {
  var randomDelay = Math.floor(Math.random()* 2 + 1000);
  setTimeout(function () {
    res.send({
      date: new Date(),
      payload: req.body
    });
  }, randomDelay);

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


