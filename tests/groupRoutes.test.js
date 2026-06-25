const request = require('supertest');
const jwt = require('../server/node_modules/jsonwebtoken');
const app = require('../server/src/app');

jest.mock('../server/src/groups/Group', () => ({
  create: jest.fn(data => Promise.resolve(data)),
  findById: jest.fn(),
}));

const Group = require('../server/src/groups/Group');

beforeAll(() => {
  process.env.JWT_SECRET = 'testsecret';
});

function authHeader() {
  const token = jwt.sign({ userId: 'user123' }, 'testsecret');
  return `Bearer ${token}`;
}

describe('POST /api/groups', () => {
  test('should return 201 and the new group when authenticated', async () => {
    const res = await request(app)
      .post('/api/groups')
      .set('Authorization', authHeader())
      .send({ name: 'Biology Study Group' });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Biology Study Group');
    expect(res.body.owner).toBe('user123');
  });

  test('should return 401 when no token provided', async () => {
    const res = await request(app)
      .post('/api/groups')
      .send({ name: 'Biology Study Group' });

    expect(res.status).toBe(401);
  });

  test('should return 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/groups')
      .set('Authorization', authHeader())
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Name is required');
  });
});

describe('POST /api/groups/:id/invite', () => {
  test('should return 200 and updated group when authenticated', async () => {
    const mockGroup = { _id: 'group123', invitations: [], save: jest.fn().mockResolvedValue(true) };
    Group.findById.mockResolvedValue(mockGroup);

    const res = await request(app)
      .post('/api/groups/group123/invite')
      .set('Authorization', authHeader())
      .send({ userId: 'user456' });

    expect(res.status).toBe(200);
  });

  test('should return 401 when no token provided', async () => {
    const res = await request(app)
      .post('/api/groups/group123/invite')
      .send({ userId: 'user456' });

    expect(res.status).toBe(401);
  });

  test('should return 400 when group not found', async () => {
    Group.findById.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/groups/nonexistent/invite')
      .set('Authorization', authHeader())
      .send({ userId: 'user456' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Group not found');
  });
});
