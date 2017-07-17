const UTIL = require('./util');
module.exports = {
  dropCoins: function(message, amount) {
    if (UTIL.readObjProperty(message, 'location' == 'well')) {
    UTIL.subtrCoins(message, amount);

    }
  },
  approachwell: function(message) {
    if (UTIL.checklocation(message) != 'well') {
      UTIL.writeLocation(message, 'well');
      message.channel.send(message.author + " suddenly hears a faint voice, coming from the nearby well:");
      message.channel.send("Hey kiddo! \nMind dropping me some coins down here ?");

    }
  }
};
