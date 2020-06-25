const dataAccess = require('./data-access');

const setUser = async (req, res, next) => {
  const { sessionId } = req.cookies;
  try {
    const user = await dataAccess.getUserFromSessionId(sessionId);
    req.user = user;
  } catch (error) {
    if (error.message === 'User is not authenticated.') {
      req.user = null;
    } else {
      console.error(error);
    }
  }
  next();
};

const allowAuthenticatedUserOnly = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const allowChannelPermission = async (req, res, next) => {
  const { user } = req;
  const { channelId } = req.params;
  const permission = await dataAccess.getPermission(channelId, user.id);
  if (permission) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  setUser,
  allowAuthenticatedUserOnly,
  allowChannelPermission,
};
