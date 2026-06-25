const request = require('supertest');
const app = require('../server/src/app');

jest.mock('../server/src/users/User', () => ({
  create: jest.fn(data => Promise.resolve(data)),
}));

describe('POST /api/users/register', () => {
  test('should return 201 and user object without password field on valid registration', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Jane Doe', email: 'jane@example.com', password: 'secret123' });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe('jane@example.com');
    expect(res.body.name).toBe('Jane Doe');
    expect(res.body.password).toBeUndefined();
    expect(res.body.hashedPassword).toBeDefined();
    expect(res.body.hashedPassword).not.toBe('secret123');
  });

  test('should return 400 with error message when email is missing', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Jane Doe', password: 'secret123' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email is required');
  });

  test('should return 400 with error message when password is missing', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Jane Doe', email: 'jane@example.com' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Password is required');
  });
});
