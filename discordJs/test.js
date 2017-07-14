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

  function slots(amount) {
    var path = '/tmp/' + message.author.id + '.json';
    if (FS.existsSync(path) == false) {
      UTIL.addCoins(message);
    }
    var readFile = FS.readFileSync(path);
    var obj = JSON.parse(readFile);

    if (SLTS.checkrequirements(obj, amount)) {
      console.log(amount[2]);
      obj.coins = Number(obj.coins) + sendSlotResults(SLTS.slotsLogic(SLTS.genSlotsNumbers(), Number(amount[2]), amount[1].toLowerCase()));
<<<<<<< HEAD
      FS.writeFileSync(path, JSON.stringify(obj), function(err) {
        if (err) {
          return console.log(err);
        }
      });
=======
      FS.writeFileSync(path, JSON.stringify(obj));
>>>>>>> origin/master
    } else {
      console.log(obj.coins);
      message.channel.send("You don't have enough coins to play slots");
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
    var ts = UTIL.getTimestamp();
    var path = '/tmp/' + message.author.id + '.json';
    var readFile;
    var obj;
    if (FS.existsSync(path)) {
      readFile = FS.readFileSync(path);
      obj = JSON.parse(readFile);
      if (ts > Number(obj.timestamp) + 86400) {
        UTIL.addCoins(message);
      } else {
        console.log(obj.timestamp);
        message.channel.send('Sorry!\nIt looks like you already got your daily reward.\nPlease try again in ' + UTIL.getHours(Number(obj.timestamp) + 86400 - ts));
      }
    } else {
      UTIL.addCoins(message);
    }
  }

  function isSlots(strText) {
    strText = strText.toLowerCase();
    if (strText.includes("mako slots") || strText.includes("mako multislots")) {
      return true;
    }
  }
  // If the message is "slots"
  if (isSlots(message.content) && message.author.id != 331717125830082560) {

    if (UTIL.readObjProperty(message, 'slotTimer') == null) {
      UTIL.writeObjProperty(message, 'slotTimer', UTIL.getTimestamp());
    } else {
      if (Number(UTIL.readObjProperty(message, 'slotTimer')) + 4 < UTIL.getTimestamp()) {
        UTIL.writeObjProperty(message, 'slotTimer', UTIL.getTimestamp());
        var str = message.content.toLowerCase().split(" ", 3);
        if (!isNaN(Number(str[2]))) {
          EVENTS.getRandomEvent(message);
          slots(str);
        } else {
          message.channel.send(message.author + ' you forgot to specify an ammount of coins\nThe command should look like this:\n<slots> <Coins>');
        }

      } else {
        message.channel.send('You need to cool down a bit');
      }
    }
  }

  if (message.content === 'mako wage') {
    // Send to the same channel
    EVENTS.getRandomEvent(message);
    wage();
  }

  if (message.content === 'mako id') {
    // Send to the same channel
    message.channel.send(message.author.id);
  }

  if (message.content === 'patch') {
    // Send to the same channel
    EXECFILE("/root/makobot/MakoBot/discordJs/syncGitRepo.sh");
    message.channel.send("patched git");
    message.channel.send("restart now");
  }

  if (message.content === 'mako credits') {
    UTIL.getCredits(message);
  }
});
// Log our bot in
CLIENT.login(TOKEN);
