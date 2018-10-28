// Import the discord.js module
const DISCORD = require("discord.js");
const EXECFILE = require("child_process").execFile;
const FS = require('fs');
const SLTS = require('./slots');
const EVENTS = require('./events');
const UTIL = require('./util');
const MEME = require('./memeGenerator');

const modifier = "::"

const MAKOID = 331717125830082560;
// Create an instance of a Discord CLIENT
const CLIENT = new DISCORD.Client();



// The TOKEN of your bot - https://discordapp.com/developers/applications/me
var readFileInput = FS.readFileSync('./token.json');
var token = JSON.parse(readFileInput);
const TOKEN = token.token;

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
      UTIL.addCoins(message, UTIL.getRandomInt(50, 500));
    }
    var readFile = FS.readFileSync(path);
    var obj = JSON.parse(readFile);

    if (SLTS.checkrequirements(obj, amount)) {
      console.log(amount[2]);
      obj.coins = Number(obj.coins) + sendSlotResults(SLTS.slotsLogic(SLTS.genSlotsNumbers(message), Number(amount[2]), amount[1].toLowerCase()));
      console.log('test.js line 38 : ' + JSON.stringify(obj));
      FS.writeFileSync(path, JSON.stringify(obj));
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
    var cooldown = 54000; /* for test changed to 3600 has to be reverted to 54000*/
    var path = '/tmp/' + message.author.id + '.json';
    var readFile;
    var obj;
    if (FS.existsSync(path)) {
      readFile = FS.readFileSync(path);
      obj = JSON.parse(readFile);
      if (ts > Number(obj.timestamp) + cooldown) {
        UTIL.addCoins(message, UTIL.getRandomInt(50, 500));
        UTIL.writeObjProperty(message, 'timestamp', UTIL.getTimestamp());
      } else {
        console.log(obj.timestamp);
        message.channel.send('Sorry!\nIt looks like you already got your daily reward.\nPlease try again in ' + UTIL.getHours(Number(obj.timestamp) + cooldown - ts));
      }
    } else {
      UTIL.addCoins(message, UTIL.getRandomInt(50, 500));
      UTIL.writeObjProperty(message, 'timestamp', UTIL.getTimestamp());
    }
  }

  function isSlots(strText) {
    strText = strText.toLowerCase();
    if (strText.includes(modifier + "slots") || strText.includes(modifier + "multislots")) {
      return true;
    }
  }
  // If the message is "slots"
  if (isSlots(message.content) && message.author.id != MAKOID) {

    if (UTIL.readObjProperty(message, 'slotTimer') == null) {
      UTIL.writeObjProperty(message, 'slotTimer', UTIL.getTimestamp());
    } else {
      if (Number(UTIL.readObjProperty(message, 'slotTimer')) + 4 < UTIL.getTimestamp()) {
        UTIL.writeObjProperty(message, 'slotTimer', UTIL.getTimestamp());
        var str = message.content.toLowerCase().split(" ", 2);
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

 

  if (message.content === modifier + 'wage') {
    // Send to the same channel
    EVENTS.getRandomEvent(message);
    wage();
  }

  if (message.content === modifier + 'id') {
    // Send to the same channel
    message.channel.send(message.author.id);
  }

  if (message.content === modifier +'patch') {
    // Send to the same channel
    EXECFILE("/root/makobot/MakoBot/discordJs/syncGitRepo.sh");
    message.channel.send("patched git");
    message.channel.send("restart now");
  }
  if (message.content === modifier +'coins') {
    UTIL.getCredits(message);
  }
  if (message.content === modifier +'well') {

  }
  if (message.content === modifier + 'jail') {
    MEME.sendMeme(message, 'jail.jpg')
  }

  if (message.content === modifier + 'boobs') {
    MEME.sendMeme(message, 'boobs.jpg')
  }

  if (message.content === modifier + 'hentai') {
    MEME.sendMeme(message, 'hentai.jpg')
  }

  if (message.content === modifier + 'sheep') {
    MEME.sendMeme(message, 'sheep.jpg')
  }
});
// Log our bot in
CLIENT.login(TOKEN);
