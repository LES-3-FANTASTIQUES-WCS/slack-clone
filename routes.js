const router = require('express').Router();

const controllers = require('./controllers');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/channels', controllers.getChannels);

router.post('/channels', controllers.createChannel);

router.get('/channels/:channelId/messages', controllers.getMessagesByChannelId);

router.post('/channels/:channelId/messages', controllers.createMessage);

module.exports = router;
