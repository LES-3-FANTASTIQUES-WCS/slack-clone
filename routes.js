const router = require('express').Router();

const controllers = require('./controllers');
const { allowAuthenticatedUserOnly } = require('./middlewares');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.post('/users', controllers.createUser);

router.post('/sessions', controllers.createSession);

router.delete('/sessions', controllers.deleteSession);

router.get('/whoami', controllers.getCurrentUser);

router.use(allowAuthenticatedUserOnly);

router.get('/channels', controllers.getChannels);

router.post('/channels', controllers.createChannel);

router.get(
  '/channels/:channelId/messages/:limit/:offset',
  controllers.getMessagesByChannelId
);

router.post('/channels/:channelId/messages', controllers.createMessage);

module.exports = router;
