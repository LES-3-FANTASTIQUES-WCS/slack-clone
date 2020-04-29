/* eslint-disable radix */
const dataAccess = require('./data-access');
const services = require('./services');
// eslint-disable-next-line import/no-unresolved
const { EVENTS, eventEmitter } = require('./events');

const getChannels = async (req, res) => {
  const channels = await dataAccess.getChannels();
  return res.status(200).json({ channels });
};

const createChannel = async (req, res) => {
  const { name } = req.body;

  const channelId = await services.createChannelAndGetId(name);

  return res.status(201).send(`Channel added with ID: ${channelId}`);
};

const MESSAGES_PAGE_SIZE = 10;

const getMessagesByChannelId = async (req, res) => {
  const { channelId } = req.params;
  const page = parseInt(req.query.page);
  const offset = (page - 1) * MESSAGES_PAGE_SIZE;
  const messages = await dataAccess.getMessagesByChannel(channelId, offset);
  if (page * MESSAGES_PAGE_SIZE >= messages.totalCount) {
    messages.nextPage = null;
  } else {
    messages.nextPage = page + 1;
  }
  return res.status(200).json({ messages });
};

const createMessage = async (req, res) => {
  const { text, channelId } = req.body;
  const { user } = req;
  const extraInfo = JSON.stringify(
    await services.getExtraInfoFromMessage(text)
  );
  const { id } = await dataAccess.createMessage(
    text,
    channelId,
    user.id,
    extraInfo
  );
  const result = await dataAccess.getMessage(id);

  eventEmitter.emit(EVENTS.MESSAGE_CREATED, result);
  return res.status(201).send(result);
};

const getMessage = async (req, res) => {
  const { id } = req.params;
  const response = await dataAccess.getMessage(id);
  console.log(response);
  if (response === null) {
    res.sendStatus(403);
  } else {
    res.sendStatus(200);
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const { sessionId } = req.cookies;
  const myUserId = await dataAccess.getUserFromSessionId(sessionId);
  const message = await dataAccess.getMessage(id);
  // eslint-disable-next-line no-cond-assign
  if (message.user_id === myUserId.id) {
    await dataAccess.deleteMessage(id);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
};

const getCleanPassword = password => {
  if (password.length >= 8) {
    return password;
  }
  throw new Error('Password must contain at least 8 characters.');
};

const createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const password = getCleanPassword(req.body.password);
    await dataAccess.createUser(username, password);
  } catch (error) {
    if (error.isUnknown) {
      return res.sendStatus(500);
    }
    return res.status(400).send({ errorMessage: error.message });
  }
  return res.sendStatus(201);
};

const createSession = async (req, res) => {
  const { username, password } = req.body;
  const userId = await dataAccess.getVerifiedUserId(username, password);
  const sessionId = await dataAccess.createSession(userId);
  res.cookie('sessionId', sessionId, {
    maxAge: 999900000,
    httpOnly: true,
    sameSite: true,
  });
  return res.status(201).json({ userId });
};

const deleteSession = async (req, res) => {
  const { sessionId } = req.cookies;
  await dataAccess.deleteSession(sessionId);
  return res.sendStatus(200);
};

const getCurrentUser = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).send(user);
  }
  return res.sendStatus(401);
};

module.exports = {
  getChannels,
  createChannel,
  getMessagesByChannelId,
  createMessage,
  deleteMessage,
  createUser,
  createSession,
  deleteSession,
  getCurrentUser,
  getMessage,
};
