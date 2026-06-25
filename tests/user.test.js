const bcrypt = require('../server/node_modules/bcryptjs');
const { registerUser, loginUser } = require('../server/src/users/userService');

jest.mock('../server/src/users/User', () => ({
  create: jest.fn(({ hashedPassword, ...rest }) => Promise.resolve(rest)),
  findOne: jest.fn(),
}));

const User = require('../server/src/users/User');

beforeAll(() => {
  process.env.JWT_SECRET = 'testsecret';
});

describe('User Registration', () => {
  test('should hash the password before saving', async () => {
    await registerUser({ email: 'student@example.com', password: 'password123', name: 'Jane Doe' });
    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({ hashedPassword: expect.stringMatching(/^\$2[ab]\$/) })
    );
  });

  test('should not include the plaintext password field in the returned user object', async () => {
    const user = await registerUser({ email: 'student2@example.com', password: 'password123', name: 'Jane Doe' });
    expect(user.password).toBeUndefined();
  });

  test('should throw if email is missing', async () => {
    await expect(registerUser({ password: 'password123', name: 'Jane Doe' })).rejects.toThrow('Email is required');
  });

  test('should throw if password is missing', async () => {
    await expect(registerUser({ email: 'student@example.com', name: 'Jane Doe' })).rejects.toThrow('Password is required');
  });
});

describe('User Login', () => {
  test('should return a token on valid credentials', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    User.findOne.mockResolvedValue({ _id: 'user123', email: 'student@example.com', hashedPassword });

    const result = await loginUser({ email: 'student@example.com', password: 'password123' });
    expect(result.token).toBeDefined();
  });

  test('should throw if email is missing', async () => {
    await expect(loginUser({ password: 'password123' })).rejects.toThrow('Email is required');
  });

  test('should throw if password is missing', async () => {
    await expect(loginUser({ email: 'student@example.com' })).rejects.toThrow('Password is required');
  });

  test('should throw if user not found', async () => {
    User.findOne.mockResolvedValue(null);
    await expect(loginUser({ email: 'nobody@example.com', password: 'password123' })).rejects.toThrow('Invalid credentials');
  });

  test('should throw if password is wrong', async () => {
    const hashedPassword = await bcrypt.hash('correctpassword', 10);
    User.findOne.mockResolvedValue({ _id: 'user123', email: 'student@example.com', hashedPassword });
    await expect(loginUser({ email: 'student@example.com', password: 'wrongpassword' })).rejects.toThrow('Invalid credentials');
  });
});
