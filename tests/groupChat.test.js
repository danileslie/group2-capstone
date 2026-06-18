const { sendMessage, getMessages } = require('../server/src/chat/chatService');

describe('Group Chat', () => {

  test('should send a message to the group', () => {
    const message = sendMessage({
      sender: 'user1',
      text: 'Hello everyone!'
    });

    expect(message.sender).toBe('user1');
    expect(message.text).toBe('Hello everyone!');
  });

  test('should reject empty messages', () => {
    expect(() =>
      sendMessage({
        sender: 'user1',
        text: ''
      })
    ).toThrow('Message cannot be empty');
  });

  test('should store messages in chat history', () => {
    sendMessage({
      sender: 'user1',
      text: 'Study session at 7 PM'
    });

    const messages = getMessages();

    expect(messages.length).toBeGreaterThan(0);
  });

});
