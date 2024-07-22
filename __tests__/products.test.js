const request = require('supertest');
const app = require('../index');
const db = require('../models');

describe('Product Endpoints', () => {
  let token;

  beforeAll(async () => {
    await db.User.destroy({ where: {} });
    await db.Product.destroy({ where: {} });

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

    token = res.body.token;
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        stock: 10,
        categoryId: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
