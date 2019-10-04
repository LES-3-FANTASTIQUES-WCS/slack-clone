const router = require('express').Router();

router.get('/', function(req, res) {
  res.send('Hello W!');
});

router.get('/channels', (req, res) => {
  res.json({
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

router.get('/channels/:channelId/messages', (req, res) => {
  console.log(req.params.channelId);
  res.json({
    messages: [
      {
        id: '1234',
        content: 'Hello',
      },
      {
        id: '5678',
        content: 'Bonjour',
      },
      {
        id: '1290',
        content: 'Ciao',
      },
      {
        id: '9835',
        content: 'Holà',
      },
    ],
  });
});

module.exports = router;
