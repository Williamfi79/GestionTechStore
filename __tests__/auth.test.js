const request = require('supertest');
const app = require('../index');
const db = require('../models');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await db.User.destroy({ where: {} });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should login a user', async () => {
    const user = await db.User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: '123456'
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: '123456'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
