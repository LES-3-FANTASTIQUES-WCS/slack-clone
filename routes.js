const router = require('express').Router();

const controllers = require('./controllers');
const { allowAuthenticatedUserOnly } = require('./middlewares');

const routesChannelsId = require('./routeChannelId');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.post('/users', controllers.createUser);

router.post('/addUser', controllers.addUserToChannel);

router.get('/permissionOnChannel/:channelId', controllers.getPermission);

router.delete('/removePermission', controllers.removePermission);

router.post('/sessions', controllers.createSession);

router.delete('/sessions', controllers.deleteSession);

router.get('/whoami', controllers.getCurrentUser);

router.use(allowAuthenticatedUserOnly);

router.get('/channels', controllers.getChannels);

router.post('/channels', controllers.createChannel);

router.use('/channels/:channelId', routesChannelsId);

router.delete('/messages/:id', controllers.deleteMessage);

router.get('/message/:id', controllers.getMessage);

module.exports = router;
