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

module.exports = { setUser, allowAuthenticatedUserOnly };
