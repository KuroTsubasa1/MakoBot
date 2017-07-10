module.exports = {

  // prints id of the user
  getId: function(message) {
   return message.channel.send(message.author.id);
  }
};
