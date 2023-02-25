var messages = {};

messages.data = [];

messages.getMessages = function() {
  return messages.data;
};

messages.addMessages = function(message) {
  messages.data.push(message);
  return messages.data;
};

module.exports.getMessages = messages.getMessages;
module.exports.addMessages = messages.addMessages;