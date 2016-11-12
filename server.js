'use strict';

let express = require('express');
let path = require('path');


const PORT = 3333;
const app = express();

app.use('/dist', express.static(__dirname + '/dist'));



app.get('/', (req, res) => {
  console.log(req);
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, (err) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(`Listening @ http://localhost:${PORT}`);
});
