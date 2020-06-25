const router = require('express').Router({ mergeParams: true });

const controllers = require('./controllers');
const { allowChannelPermission } = require('./middlewares');

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.use(allowChannelPermission);

router.get('/messages', controllers.getMessagesByChannelId);

router.post('/messages', controllers.createMessage);

router.get('/users', controllers.getUsersFromChannel);

module.exports = router;
