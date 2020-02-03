const { allowAuthenticatedUserOnly } = require('./middlewares');

describe('allowAuthenticatedUserOnly', () => {
  let res;
  let next;

  beforeEach(() => {
    res = {
      sendStatus: jest.fn(),
    };
    next = jest.fn();
  });

  describe('user is authenticated', () => {
    const req = {
      user: {},
    };
    it('calls next function', () => {
      allowAuthenticatedUserOnly(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(0);
    });
  });

  describe('user is not authenticated', () => {
    const req = {
      user: null,
    };
    it('sends a 401 status', () => {
      allowAuthenticatedUserOnly(req, res, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });
  });
});
