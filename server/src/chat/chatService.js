const messages = [];

function sendMessage({ sender, text }) {
  if (!text) throw new Error('Message cannot be empty');

  const message = { sender, text };
  messages.push(message);
  return message;
}

function getMessages() {
  return messages;
}

module.exports = { sendMessage, getMessages };
