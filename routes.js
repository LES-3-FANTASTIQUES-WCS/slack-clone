const router = require('express').Router();

const route = require('./controllers');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/channels', route.getChannels);

router.post('/channels', route.createChannel);

router.get('/channels/:channelId/messages', route.getMessagesByChannelId);

router.post('/channels/:channelId/messages', route.createMessage);

module.exports = router;
