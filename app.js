var express = require('express');
var bodyParser = require('body-parser');
const { Curl } = require('node-libcurl');
var mysql = require('mysql');
var app = express();

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


/*app.post("/v1/app-node/login-facebook",(req,res)=>{
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
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*//*;q=0.8,application/signed-exchange;v=b3;q=0.9',
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
            'encpass': '#PWD_BROWSER:5:1606925734:AeFQANyfRoBealCQMUgLNcrlwl0RGTFPXJ5+IHPp3PNYPXI1MpP75Nu1ogAwsY+/JiDN0mlnGF9+UE7/FjEfMRMrU7rRHoxINQEch0rwabNZR+Hzw23v2hzoVBCi0Y5MlYjwvx5ixfw6mx4OAcDccdA='
          }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.headers['set-cookie']);
        res.json(response.headers['set-cookie']);
      });
})*/

const curl = new Curl();
curl.setOpt(Curl.option.URL, 'http://www.cualesmiip.com/');
//curl.setOpt(Curl.option.RETURNTRANSFER, true);
curl.setOpt(Curl.option.ENCODING, '');
curl.setOpt(Curl.option.MAXREDIRS,10);
curl.setOpt(Curl.option.TIMEOUT,0);
curl.setOpt(Curl.option.HTTP_VERSION,1);
curl.setOpt(Curl.option.CUSTOMREQUEST, 'GET');
curl.setOpt(Curl.option.MAXREDIRS,10);
curl.setOpt(Curl.option.INTERFACE,'lo0');
curl.setOpt(Curl.option.HTTPHEADER,[
    'Connection: keep-alive',
    'Cache-Control: max-age=0',
    'Upgrade-Insecure-Requests: 1',
    'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Language: es-ES,es;q=0.9',
    'Cookie: PHPSESSID=8l3j37esn7g11vpkheasn2ecc0; __utma=262111647.2111998321.1607269121.1607269121.1607269121.1; __utmc=262111647; __utmz=262111647.1607269121.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmt=1; __utmb=262111647.1.10.1607269121; __gads=ID=1d83c35c3227472b-22943cdf82a600d6:T=1607269121:RT=1607269121:S=ALNI_MaIUddAhWFD9tEpv6uoMepMlaK_6A'
  ]);


 
curl.on('end',function(statusCode,data,headers){
  console.info(headers);
  console.info('---');
  console.info(this.getInfo( 'TOTAL_TIME'));
  
  this.close();
});
curl.on('error', curl.close.bind(curl));
curl.perform();

app.listen(9429,()=>{
  console.log("Escuchando en el puerto: 9429")
})