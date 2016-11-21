'use strict';

let fs = require('fs');
let express = require('express');
let path = require('path');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();

let data = require(__dirname + '/server/data');

const PORT = 3333;
const app = express();

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/audio', express.static(__dirname + '/media/audio'));
app.use('/vendor', express.static(__dirname + '/node_modules'));

if(app.get('env') === 'development') {
  let bundle = require('./server/webpack.bundle.js');
  bundle();

  app.all('/dist/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8888'
    });
  });
}

proxy.on('error', (err) => {
  console.log('Could not connect to proxy');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/username', (req, res) => {
  res.send({username: 'Who are you?'});
});

app.get('/search/words/:word', (req, res) => {
  //console.log(req.params.word);
  let responseData = data.getData();
  //console.log(responseData);
  res.send(responseData);
});

app.get('/search/before/:timestamp', (req, res) => {
  //console.log(req.params.word);
  let responseData = data.getData();
  console.log(responseData);
  res.send(responseData);
});

app.get('/search/after/:timestamp', (req, res) => {
  //console.log(req.params.word);
  let responseData = data.getData();
  console.log(responseData);
  res.send(responseData);
});

var streamAudio = function(req,res) {
    var filePath = __dirname + '/media/audio/file.mp3';
    var stat = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });
    // We replaced all the event handlers with a simple call to util.pump()
    fs.createReadStream(filePath).pipe(res);
};
app.get("/streamaudio/:filename", streamAudio)

app.listen(PORT, (err) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(`Listening @ http://localhost:${PORT}`);
});
