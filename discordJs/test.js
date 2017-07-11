/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const DISCORD = require("discord.js");

const EXECFILE = require("child_process").execFile;
const FS = require('fs');
const SLTS = require('./slots');
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
  function slots() {

    var path = '/tmp/' + message.author.id + '.json';

    // checks if path / file already exiest
    if (FS.existsSync(path)) {

      // read file as plain text
      var readFile = FS.readFileSync(path);
      // creates js object from plain text
      var obj = JSON.parse(readFile);
    } else {}
      if (SLTS.checkrequirements(obj)) {
        obj.coins = obj.coins + sendSlotResults(SLTS.slotsLogic(SLTS.genSlotsNumbers(), 1, obj, message.content.toLowerCase()));
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
    message.channel.send(all.slotRows[0] + ' ' + all.slotRows[1] + ' ' + all.slotRows[2] + '\n' + all.slotRows[3] + ' ' +  all.slotRows[4] + ' ' + all.slotRows[5] + '\n' + all.slotRows[6] + ' ' + all.slotRows[7] + ' ' + all.slotRows[8]);
    message.channel.send("You Won " + all.coins + "!\nYour coin multiplicator is " + all.mltipler);
    return all.coins;
  }

  function wage() {

    // setting up path
    var path = '/tmp/' + message.author.id + ".json";

    // checks if path / file already exist
    if (FS.existsSync(path)) {

      message.channel.send("loading file");
      // read file as plain text
      var readFile = FS.readFileSync(path);
      // creates js object from plain text
      var obj = JSON.parse(readFile);
      message.channel.send("You recived 100 Coins !!!!");
      obj.coins = obj.coins + 100;
      FS.writeFile(path, JSON.stringify(obj), function(err) {
        if (err) {
          return console.log(err);
        }
      });
      message.channel.send("You have " + obj.coins + " coins in your account.");
      message.channel.send("The file (" + message.author.id + ".json" + ") was saved!");

    } else {
      // writes object to plain text file
      FS.writeFile(path, '{"coins":"100"}', function(err) {
        if (err) {
          return console.log(err);
        }
        message.channel.send("The file (" + message.author.id + ".json" + ") was saved!");
        message.channel.send("Mako created a bank account for you !");
        message.channel.send("You recived 100 Coins !!!!");
      });
    }
  }
  function isSlots(strText) {
    strText = strText.toLowerCase();
    if (strText == 'slots' || strText == 'multislots') {
      return true;
    }
  }
  // If the message is "slots"
  if (isSlots(message.content)) {
    // Send to the same channel
    console.log('slots');
    slots();
  }

  if (message.content === 'wage') {
    // Send to the same channel
    wage();
  }

  if (message.content === 'id') {
    // Send to the same channel
    message.channel.send(message.author.id);
  }

  if (message.content === 'test') {
    // Send to the same channel
    message.channel.send('yep just a test! this is a second test, 3test');
  }

  if (message.content === 'patch') {
    // Send to the same channel
    EXECFILE("/root/makobot/MakoBot/discordJs/syncGitRepo.sh");
    message.channel.send("patched git");
    message.channel.send("restart now");
  };
});
// Log our bot in
CLIENT.login(TOKEN);
