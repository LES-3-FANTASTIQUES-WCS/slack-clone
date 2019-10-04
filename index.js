const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', function(req, res) {
  res.send('Hello W!');
});

app.get('/channels', (req, res) => {
  res.status(200).json({
    channels: [
      {
        id: 'abc',
        name: 'general',
      },
      {
        id: 'def',
        name: 'random',
      },
    ],
  });
});

app.listen(8000, function() {
  console.log('Example app listening on port 8000!');
});
