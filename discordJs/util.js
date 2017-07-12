const FS = require('fs');
module.exports = {

  // prints id of the user
  getId: function(message) {
   return message.channel.send(message.author.id);
  },

  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  addCoins: function(message) {
    // 86400

    var path = '/tmp/' + message.author.id + ".json";
    if (FS.existsSync(path)) {
      var readFile = FS.readFileSync(path);
      var obj = JSON.parse(readFile);

    var gain = module.exports.getRandomInt(50, 500);
        obj.coins = Number(obj.coins) + Number(gain);
        FS.writeFile(path, JSON.stringify(obj), function(err) {
          if (err) {
            return console.log(err);
          }
        });
        message.channel.send("You received " + gain + " Coins !!!!");
        message.channel.send("You now have " + obj.coins + " coins in your account.");

    } else {
      var ts = module.exports.getTimestamp();
      FS.writeFile(path, '{"coins":"250","timestamp":"' + ts + '"}', function(err) {
        if (err) {
          return console.log(err);
        }
        message.channel.send("Mako created a bank account for you !");
        message.channel.send("You received 250 Coins !!!!");
      });
    }
  },

  removeCoins: function(ammount) {

  },

  getTimestamp: function() {
  var ts = Math.round((new Date()).getTime() / 1000);
  return ts;
  }
};
