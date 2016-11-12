'use strict';

let express = require('express');
let path = require('path');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();

let data = require(__dirname + '/server/data');

const PORT = 3333;
const app = express();

app.use('/images', express.static(__dirname + '/dist/media'));
app.use('/vendor', express.static(__dirname + '/node_modules'));

let bundle = require('./server/webpack.bundle.js');
bundle();

app.all('/dist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://localhost:8888'
  });
});

proxy.on('error', (err) => {
  console.log('Could not connect to proxy');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, (err) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(`Listening @ http://localhost:${PORT}`);
});
