const pg = require('pg');
const util = require('util');
const request = require('supertest');
// Use exec as a promise to be able to await it
const exec = util.promisify(require('child_process').exec);

const app = require('./app');
const dataAccess = require('./data-access');

const agent = request.agent(app);

const resetDatabase = async () => {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  await pool.query(`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
  `);
};

const migrateDatabase = async () => {
  const { stdout, stderr } = await exec('npm run migrate');
  // eslint-disable-next-line no-console
  console.log('migrateDatabase--stdout:', stdout);
  // eslint-disable-next-line no-console
  console.log('migrateDatabase--stderr:', stderr);
};

describe('App', () => {
  let myMessage;
  let mySessionId;
  let messageFromUser2;

  beforeEach(async () => {
    await resetDatabase();
    await migrateDatabase();
    await dataAccess.createUser('me', 'myPassword');
    await dataAccess.createUser('user2', 'myPassword');
    const myUserId = await dataAccess.getVerifiedUserId('me', 'myPassword');
    const user2Id = await dataAccess.getVerifiedUserId('user2', 'myPassword');
    mySessionId = await dataAccess.createSession(myUserId);
    myMessage = await dataAccess.createMessage('myMessage', 1, myUserId);
    messageFromUser2 = await dataAccess.createMessage(
      'message from user2',
      1,
      user2Id
    );
  });

  describe('DELETE /api/messages', () => {
    describe('when the user owns the message', () => {
      it('responds with 200 and deletes the message', async done => {
        const response = await agent
          .delete(`/api/messages/${myMessage.id}`)
          .set('Cookie', `sessionId=${mySessionId}`);
        expect(response.status).toEqual(200);
        expect(await dataAccess.getMessage(myMessage.id)).toEqual(null);
        done();
      });
    });

    describe('when the user does not own the message', () => {
      it('responds with 403 and does not delete the message', async done => {
        const response = await agent
          .delete(`/api/messages/${messageFromUser2.id}`)
          .set('Cookie', `sessionId=${mySessionId}`);
        expect(response.status).toEqual(403);
        expect(await dataAccess.getMessage(messageFromUser2.id)).toBeTruthy();
        done();
      });
    });

    describe('when the message does not exist', () => {
      it('responds with 404', async done => {
        const response = await agent
          .delete(`/api/messages/78`)
          .set('Cookie', `sessionId=${mySessionId}`);
        expect(response.status).toEqual(404);
        done();
      });
    });
  });
});
