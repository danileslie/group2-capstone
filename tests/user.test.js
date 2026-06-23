const { registerUser } = require('../server/src/users/userService');

describe('User Registration', () => {
  test('should create a user with a hashed password', () => {
    const user = registerUser({ email: 'student@example.com', password: 'password123', name: 'Jane Doe' });
    expect(user.email).toBe('student@example.com');
    expect(user.hashedPassword).not.toBe('password123');
  });

  test('should not include the plaintext password field in the returned user object', () => {
    const user = registerUser({ email: 'student2@example.com', password: 'password123', name: 'Jane Doe' });
    expect(user.password).toBeUndefined();
  });

  test('should throw if email is missing', () => {
    expect(() => registerUser({ password: 'password123', name: 'Jane Doe' })).toThrow('Email is required');
  });

  test('should throw if password is missing', () => {
    expect(() => registerUser({ email: 'student@example.com', name: 'Jane Doe' })).toThrow('Password is required');
  });
});
