var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Jesus17121987.",
  database: "scrapperdatabase"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM facebook_groups", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Allow', 'POST');
    next();
});

const request = require('request');


app.post("/v1/app-node/login-facebook",(req,res)=>{
    setTimeout(()=>{
      req.body.action = req.body.action.replace("==","%3D%3D");
      var options = {
        'method': 'POST',
        'url': 'https://www.facebook.com/'+req.body.action,
        'headers': {
          'authority': 'www.facebook.com',
          'cache-control': 'max-age=0',
          'upgrade-insecure-requests': '1',
          'origin': 'https://www.facebook.com',
          'content-type': 'application/x-www-form-urlencoded',
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-user': '?1',
          'sec-fetch-dest': 'document',
          'referer': 'https://www.facebook.com/',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7',
          'cookie': 'wd=1920x472; datr='+req.body.datr
        },
        form: {
            'jazoest': req.body.jazoest,
            'lsd': req.body.lsd,
            'email': req.body.email,
            'login_source': 'comet_headerless_login',
            'next': '',
            'encpass': '#PWD_BROWSER:5:1605129546:AZZQACByylewGYaaorshxwZuJp5LPuUNRz8r+hgqp7cIBnVZX5kVWrOwQaeLSQ7JzddanIq/U0mxoXXi/Tdswj6hoB8dfopSqofbG+EXktCRywuXwHtX9MORWB63FeZEq22oy09djhCSr6xzFcRKQkiG'
          }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.headers);
        res.json(response.headers);
      });
    },3000)
})

app.listen(9429,()=>{
  console.log("iiiilllllooooooooooooooooooooooooo")
})