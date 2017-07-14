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
    var ts = Math.floor(Date.now() / 1000);
    return ts;
  },

  getCredits: function(message) {
    var path = '/tmp/' + message.author.id + ".json";
    var obj;
    if (FS.existsSync(path)) {
      var readFile = FS.readFileSync(path);
      obj = JSON.parse(readFile);
      message.channel.send(message.author + ' you have ' + obj.coins);
    } else {
      message.channel.send('You need a bank account to use this command!\nPlease type <mako wage> to create one.');
    }
  },

  getHours: function(seconds) {
    console.log('seconds ' + seconds);

    var minutes = seconds / 60;
    minutes = Math.floor(minutes);

    var hours = minutes / 60;
    hours = Math.floor(hours);

    console.log('minutes ' + minutes);
    console.log('hours ' + hours);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 60;

    console.log('minutes ' + minutes);
    console.log('hours ' + hours);
    //  hours = 24 - hours;
    // minutes = 60 -minutes;
    // seconds = 60 - seconds;

    var time = '' + hours + ':' + minutes + ':' + seconds + '';
    return time;
  },

  writeObjProperty: function(message, propertyName, propertyValue) {
    var path = '/tmp/' + message.author.id + '.json';
    if (FS.existsSync(path) == true) {
      var readFile = FS.readFileSync(path, function(err) {
        if (err) {
          return console.log(err);
        }
      });
      var obj = JSON.parse(readFile);
      obj[propertyName] = propertyValue;
      FS.writeFileSync(path, JSON.stringify(obj), function(err) {
        if (err) {
          return console.log(err);
        }
      });

    } else {
      FS.writeFileSync(path, function(err) {
        if (err) {
          return console.log(err);
        }
      });
    }
  },

  readObjProperty: function(message, propertyName) {
    var path = '/tmp/' + message.author.id + '.json';
    if (FS.existsSync(path) == true) {
      var readFile = FS.readFileSync(path, function(err) {
        if (err) {
          return console.log(err);
        }
      });
      var obj = JSON.parse(readFile);
      if (typeof obj[propertyName] == 'undefined') {
        console.log('propertyName does not exist');
        return null;
      } else {
        return obj[propertyName];
      }
    } else {
      console.log('file does not exist');
      return null;
    }
  }
};
