var messages = {};

messages.data = [];

messages.getMessages = function() {
  return messages.data;
};

messages.addMessages = function(message) {
  messages.data.push(message);
  return messages.data;
};

// var messages = {
//   _data: [],

//   getMessages: () => {
//     return messages._data;
//   },

//   addMessages: (message) => {
//     messages._data.push(message);
//     return messages._data;
//   }
// };

module.exports.getMessages = messages.getMessages;
module.exports.addMessages = messages.addMessages;