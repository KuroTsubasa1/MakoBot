const UTIL = require('./util');

module.exports = {

  getRandomEvent: function(message) {
    switch (UTIL.getRandomInt(0, 2)) {
      case 1:
        module.exports.getingRobbed(message);
        break;
      case 2:
        message.channel.send('just a placeholder for a new event');
        break;
      default:
        message.channel.send('Just the default case for an event.\nOr should I say: You lucky bastard !!!! Nothing happend ..... ? ');
    }
  },

getingRobbed: function(message) {
  var ammount = UTIL.getRandomInt(10, 250);
  message.channel.send(message.author + ' OHHHHH NOOOO!!!!!! \nYou gabled too much and fell asleep. \n\nIn the meantime someone stole your hard earned cash....\n' + ammount + ' coins are missing');
}
};
