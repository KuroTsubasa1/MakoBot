module.exports = {

  // prints id of the user
  getId: function(message) {
   return message.channel.send(message.author.id);
  },

  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
