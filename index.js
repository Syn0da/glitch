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

app.get("/api/:date?", function (req, res) {
  
 //obj to return 
  let result={"unix":+ new Date(req.params.date),
              utc:new Date(req.params.date).toUTCString()} 
  //to use after checking if date format is invalid, convert :date? to int to then check if valid for unix
  let unixTime= parseInt(req.params.date)
  
  
 //if request is falsy return curent date in unix time and normaldate as utc
  if (!req.params.date) result.unix = +new Date(), result.utc = new Date().toUTCString()
  //if request is not falsy but date fortmat is invalid for unix, use unixTime instead to check if conversion to unix is valid
  if (!result.unix) result.unix =+ new Date(unixTime),result.utc = new Date(unixTime).toUTCString()
  //if the parameters in result are not a valid date after all the work above, set result to invalid
  if (!result.unix||!result.utc){ result={ error : "Invalid Date" }}
  
   res.json(result);

  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
