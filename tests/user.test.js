const { registerUser } = require('../server/src/users/userService');

jest.mock('../server/src/users/User', () => ({
  create: jest.fn(data => Promise.resolve(data)),
}));

describe('User Registration', () => {
  test('should create a user with a hashed password', async () => {
    const user = await registerUser({ email: 'student@example.com', password: 'password123', name: 'Jane Doe' });
    expect(user.email).toBe('student@example.com');
    expect(user.hashedPassword).not.toBe('password123');
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
