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

  describe('DELETE message', () => {
    describe("when user is message's author delete message", () => {
      let response;
      beforeEach(async () => {
        // login
        dataAccess.getUserFromSessionId = jest.fn();
        when(dataAccess.getUserFromSessionId)
          .calledWith('AE7645-B120C7')
          .mockReturnValue({
            id: 1,
            username: 'Me',
          })
          .set('Cookie', 'sessionId=AE7645-B120C7');

        // post message
        dataAccess.createMessage = jest.fn();
        response = await agent
          .post('/api/channels/:channelId/messages')
          .send('text=hello&channelId=1&userId=3')
          .set('Accept', 'application/json')
          .expect(201);
      });
      it('check if the user wishing to delete the message is the author', () => {
        const user = dataAccess.getUserFromSessionId('AE7645-B120C7');
        expect(response.user_id).toEqual(user.id);
        // delete message
        dataAccess.deleteMessage = jest.fn();
        agent
          .delete(`/api/message/${response.id}`)
          .set('Accept', 'application/json')
          .expect(200);
        expect(dataAccess.deleteMessage).toHaveBeenCalledTimes(1);
      });
    });
  });
});
