const jwt = require('jsonwebtoken');
const dataAccess = require('./data-access');
const services = require('./services');

const getChannels = async (_req, res) => {
  const channels = await dataAccess.getChannels();
  return res.status(200).json({ channels });
};

const createChannel = async (req, res) => {
  const { name } = req.body;

  const channelId = await services.createChannelAndGetId(name);

  return res.status(201).send(`Channel added with ID: ${channelId}`);
};

const getMessagesByChannelId = async (req, res) => {
  const { channelId } = req.params;

  const messages = await dataAccess.getMessagesByChannel(channelId);

  return res.status(200).json({ messages });
};

const createMessage = async (req, res) => {
  const { text, channelId, userId } = req.body;

  await dataAccess.createMessage(text, channelId, userId);

  return res.status(201).send('Message added');
};

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await services.hashUserPassword(password);

  await dataAccess.signupUser(
    username,
    email,
    hashedPassword.hash,
    hashedPassword.salt
  );

  return res.status(201).send('User Created');
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in DB
  const userAccount = await dataAccess.findUserAccount(email);
  if (!userAccount) return res.status(400).send('Email is not found');

  // Check if password is correct
  const validPassword = services.validateUserPassword(
    password,
    userAccount.salt,
    userAccount.hash
  );
  if (!validPassword) return res.status(400).send('Invalid password');

  // Create and assign a JWT Token
  const token = jwt.sign(
    {
      id: userAccount.id,
      email: userAccount.email,
    },
    process.env.TOKEN_SECRET
  );

  return res
    .cookie('tokens', token, {
      expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
    })
    .send(token);
};

module.exports = {
  getChannels,
  createChannel,
  getMessagesByChannelId,
  createMessage,
  signupUser,
  login,
};
