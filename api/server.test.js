const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig.js');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('users').truncate();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it('process.env.NODE_ENV must be "testing"', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});

describe('Auth endpoints', () => {
  describe('[POST] /register', () => {
    it('registers a new user to the db', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({ username: 'shrek', password: '12345' });
      const shrek = await db('users').where('username', 'shrek').first();
      expect(shrek).toMatchObject({ username: 'shrek' });
    });
  });
});
