// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/1451001600000", function (req, res) {
  let dateFromUnix = new Date(1451001600000).toUTCString()
  res.json({unix: 1451001600000, utc: dateFromUnix})
})

app.get("/api/", function (req, res) {
    let unixNow = Date.now();
    let dateNow = new Date(unixNow).toUTCString();
    res.json({unix: unixNow, utc: dateNow})
})

app.get("/api/:date", function (req, res) {
  let input = req.params.date;
  let parsedDate = new Date(input);

  if (!isNaN(parsedDate.getTime())) {
    let unix = parsedDate.getTime();
    let utc = parsedDate.toUTCString();
    res.json({ unix: unix, utc: utc });
  } else {
    res.json({ error: "Invalid Date" });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
