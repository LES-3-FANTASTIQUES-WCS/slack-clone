const { when } = require('jest-when');
const superTest = require('supertest'); // superTest is a library

jest.mock('./data-access.js');
const dataAccess = require('./data-access');
const app = require('./app');

const agent = superTest.agent(app);

describe('app', () => {
  describe('GET /api/channels', () => {
    const channels = [
      { id: 'abc', name: 'general' },
      { id: 'def', name: 'random' },
    ];

    beforeEach(() => {
      dataAccess.getUserFromSessionId = jest.fn();
      when(dataAccess.getUserFromSessionId)
        .calledWith('AE7645-B120C7')
        .mockReturnValue({
          id: 1,
          username: 'Me',
        });

      dataAccess.getChannels = jest.fn(() => channels);
    });

    describe('when user is authenticated', () => {
      it('responds with channel list', async () => {
        const response = await agent
          .get('/api/channels')
          .set('Cookie', 'sessionId=AE7645-B120C7');
        expect(response.status).toEqual(200);
        expect(JSON.parse(response.text)).toEqual({ channels });
      });
    });

    describe('when user is not authenticated', () => {
      it('responds with status 401', async () => {
        const response = await agent.get('/api/channels');
        expect(response.status).toEqual(401);
      });
    });
  });

  describe('DELETE /api/sessions', () => {
    describe('when user is authenticated', () => {
      let response;

      beforeEach(async () => {
        dataAccess.deleteSession = jest.fn();
        response = await agent
          .delete('/api/sessions')
          .set('Cookie', 'sessionId=AE7645-B120C7');
      });

      it('deletes session in database', () => {
        expect(dataAccess.deleteSession).toHaveBeenCalledTimes(1);
        expect(dataAccess.deleteSession).toHaveBeenCalledWith('AE7645-B120C7');
      });

      it('responds with status 200', () => {
        expect(response.status).toEqual(200);
      });
    });
  });
});
