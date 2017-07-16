const UTIL = require('./util');
const FS = require('fs');

module.exports = {

  getRandomEvent: function(message) {
    switch (UTIL.getRandomInt(0, 256)) {
      case 1:
        module.exports.getingRobbed(message);
        break;
      case 2:
        message.channel.send('just a placeholder for a new event');
        break;
      default:
        //message.channel.send('Just the default case for an event.\nOr should I say: You lucky bastard !!!! Nothing happend ..... ? ');
    }
  },

getingRobbed: function(message) {
  var ammount = UTIL.getRandomInt(1, 100);
  message.channel.send(message.author + ' OHHHHH NOOOO!!!!!! \nYou gabled too much and fell asleep. \n\nIn the meantime someone stole your hard earned cash....\n' + ammount + ' coins are missing');
  var path = '/tmp/' + message.author.id + '.json';
  var obj;
  if (FS.existsSync(path)) {
    var readFile = FS.readFile(path,'utf8', function(err){
      if (err) {
        return console.log(err);
              }
    });
    obj = JSON.parse(readFile);
    obj.coins = Number(obj.coins) - ammount;
  }
    FS.writeFile(path, JSON.stringify(obj),function(err){
      if (err) {
        return console.log(err);
              }
    });
}
};
