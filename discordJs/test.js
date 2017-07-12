/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const DISCORD = require("discord.js");
const EXECFILE = require("child_process").execFile;
const FS = require('fs');
const SLTS = require('./slots');
const EVENTS = require('./events');
const UTIL = require('./util');
// Create an instance of a Discord CLIENT
const CLIENT = new DISCORD.Client();

// The TOKEN of your bot - https://discordapp.com/developers/applications/me
const TOKEN = 'MzMxNzE3MTI1ODMwMDgyNTYw.DDznVA.CwWs-HqWVwuez-FeReIY9Y8aMYQ';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
CLIENT.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
CLIENT.on('message', message => {

  function slots(ammount) {
    var path = '/tmp/' + message.author.id + '.json';
    var obj;
    if (FS.existsSync(path)) {
      var readFile = FS.readFileSync(path);
      obj = JSON.parse(readFile);
    }
    if (SLTS.checkrequirements(obj)) {
      console.log(ammount[1]);
      obj.coins = Number(obj.coins) + sendSlotResults(SLTS.slotsLogic(SLTS.genSlotsNumbers(), Number(ammount[1]), ammount[0].toLowerCase()));
      FS.writeFile(path, JSON.stringify(obj), function(err) {
        if (err) {
          return console.log(err);
        }
      });
    }
  }
  // Handles the display of the slots results
  function sendSlotResults(all) {
    message.channel.send('   S   L   O   T   S   ');
    all.slotRows = SLTS.changeNrToEmo(all.slotRows);
    message.channel.send(all.slotRows[0] + ' ' + all.slotRows[1] + ' ' + all.slotRows[2] + '\n' + all.slotRows[3] + ' ' + all.slotRows[4] + ' ' + all.slotRows[5] + '\n' + all.slotRows[6] + ' ' + all.slotRows[7] + ' ' + all.slotRows[8]);
    if (all.coins > 0) {
      message.channel.send("You Won " + all.coins + "!\nYour coin multiplicator is " + all.mltipler);
    } else {
      message.channel.send("You Lost " + all.coins + '!');
    }

    return all.coins;
  }

  function wage() {
    // 86400
    var ts = UTIL.getTimestamp();
    var path = '/tmp/' + message.author.id + ".json";
    if (FS.existsSync(path)) {
      var readFile = FS.readFileSync(path);
      var obj = JSON.parse(readFile);

      if (ts > Number(obj.timestamp) + 86400) {
        obj.coins = obj.coins + UTIL.getRandomInt(50, 500);
        FS.writeFile(path, JSON.stringify(obj), function(err) {
          if (err) {
            return console.log(err);
          }
        });
        message.channel.send("You recived" + obj.coins + " Coins !!!!");
        message.channel.send("You now have " + obj.coins + " coins in your account.");
      } else {
        message.channel.send('Sorry!\nIt looks like you already got your daily reward.\nPlease try it again tomorrow!');
      }

    } else {
      FS.writeFile(path, '{"coins":"100","timestamp":"' + ts + '"}', function(err) {
        if (err) {
          return console.log(err);
        }
        message.channel.send("Mako created a bank account for you !");
        message.channel.send("You recived 100 Coins !!!!");
      });
    }
  }

  function isSlots(strText) {
    strText = strText.toLowerCase();
    if (strText.includes("slots") || strText.includes("multislots")) {
      return true;
    }
  }
  // If the message is "slots"
  if (isSlots(message.content) && message.author.id != 331717125830082560) {
    // Send to the same channel
    var str = message.content.toLowerCase().split(" ", 2);
    if (!isNaN(Number(str[1]))) {
      EVENTS.getRandomEvent(message);
      slots(str);
    } else {
      message.channel.send(message.author + ' you forgot to specify an ammount of coins\nThe command should look like this:\n<slots> <Coins>');
    }


  }

  if (message.content === 'wage') {
    // Send to the same channel
    EVENTS.getRandomEvent(message);
    wage();
  }

  if (message.content === 'id') {
    // Send to the same channel
    message.channel.send(message.author.id);
  }

  if (message.content === 'patch') {
    // Send to the same channel
    EXECFILE("/root/makobot/MakoBot/discordJs/syncGitRepo.sh");
    message.channel.send("patched git");
    message.channel.send("restart now");
  }
});
// Log our bot in
CLIENT.login(TOKEN);
