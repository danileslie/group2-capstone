const bcrypt = require('../server/node_modules/bcryptjs');
const request = require('supertest');
const app = require('../server/src/app');

jest.mock('../server/src/users/User', () => ({
  create: jest.fn(({ hashedPassword, ...rest }) => Promise.resolve(rest)),
  findOne: jest.fn(),
}));

const User = require('../server/src/users/User');

beforeAll(() => {
  process.env.JWT_SECRET = 'testsecret';
});

describe('POST /api/users/register', () => {
  test('should return 201 and user object without password field on valid registration', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Jane Doe', email: 'jane@example.com', password: 'secret123' });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe('jane@example.com');
    expect(res.body.name).toBe('Jane Doe');
    expect(res.body.password).toBeUndefined();
    expect(res.body.hashedPassword).toBeUndefined();
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

describe('POST /api/users/login', () => {
  test('should return 200 and a token on valid login', async () => {
    const hashedPassword = await bcrypt.hash('secret123', 10);
    User.findOne.mockResolvedValue({ _id: 'user123', email: 'jane@example.com', hashedPassword });

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'jane@example.com', password: 'secret123' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('should return 400 when email is missing', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ password: 'secret123' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email is required');
  });

  test('should return 400 when credentials are invalid', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'nobody@example.com', password: 'wrong' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid credentials');
  });
});
