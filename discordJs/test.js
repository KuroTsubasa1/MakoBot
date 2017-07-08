/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const Discord = require('discord.js');

const execFile = require('child_process').execFile;
const fs = require('fs');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'MzMxNzE3MTI1ODMwMDgyNTYw.DDznVA.CwWs-HqWVwuez-FeReIY9Y8aMYQ';

//require('battlesim.js');
// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {

    function slots() {
      var path =  '/tmp/' + message.author.id + ".json";

      // checks if path / file already exiest
      if (fs.existsSync(path)) {

          // read file as plain text
          var readFile = fs.readFileSync(path);
          // creates js object from plain text
          var obj = JSON.parse(readFile);

      if(checkrequirements(obj)){
      obj.coins = obj.coins + sendSlotResults(slotsLogic(genSlotsNumbers(), 1, obj));
        fs.writeFile(path, JSON.stringify(obj), function(err) {
          if (err) {
            return console.log(err);
          }
          }
        );
          }
    }};
// Handles the display of the slots results
  function sendSlotResults(all){
        var cpAll = all;
        message.channel.send("   S   L   O   T   S   ");
        all.slotRows =  changeNrToEmo(cpAll.slotRows);
        message.channel.send(all.slotRows[0] + " " + all.slotRows[1] + " " + all.slotRows[2] + "\n" + all.slotRows[3] + " " + all.slotRows[4] + " " + all.slotRows[5] + "\n" + all.slotRows[6] + " " + all.slotRows[7] + " " + all.slotRows[8]);
        message.channel.send("You Won " + all.coins + "!\nYour coin multiplicator is " + all.mltipler);
        return all.coins;
  }

    function genSlotsNumbers() {
      var slotRows = [0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (i = 0; i < 9;) {
        var numbers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6];
        var randNum = getRandomInt(1, numbers.length - 1);
        if (i <= 3) {
          slotRows[i] = numbers[randNum];
        }

        if (i <= 6 && i > 3) {
          slotRows[i] = numbers[randNum];
        }

        if (i <= 9 && i > 6) {
          slotRows[i] = numbers[randNum];
        }

        i++;
      }
      return slotRows;
    }
// converts the string to all lowercase and checks for slot command
    function isSlots(strText){
    strText = strText.toLowerCase();
    if(strText == 'slots' || strText == 'multislots'){
      return true;
    }
  };


function checkrequirements(chkobj){
  if (chkobj.coins >= 1){
    return true;
  } else {
    return false;
  }
};
function changeNrToEmo(slotRows2){
for (i = 0; i < slotRows2.length ;){
if (slotRows2[i] == 1){
slotRows2[i] = ":saxophone:";
}else if (slotRows2[i] == 2) {
  slotRows2[i] = ":ok_hand:";
}else if (slotRows2[i] == 3) {
  slotRows2[i] = ":guitar:";
}else if (slotRows2[i] == 4) {
  slotRows2[i] = ":drum:";
}else if (slotRows2[i] == 5) {
  slotRows2[i] = ":microphone:";
}else if (slotRows2[i] == 6) {
  slotRows2[i] = ":rosette:";
}
i++;
}
return slotRows2;
}
    function slotsLogic(slotRows,coins) {
      var mltipler = 0;
      if (message.content.toLowerCase() === 'slots'){
      if (slotRows[3] == 1 && slotRows[4] == 1 && slotRows[5] == 1) {
         mltipler = 2;
      } else if (slotRows[3] == 2 && slotRows[4] == 2 && slotRows[5] == 2) {
         mltipler = 4;
      } else if (slotRows[3] == 3 && slotRows[4] == 3 && slotRows[5] == 3) {
         mltipler = 8;
      } else if (slotRows[3] == 4 && slotRows[4] == 4 && slotRows[5] == 4) {
         mltipler = 16;
      } else if (slotRows[3] == 5 && slotRows[4] == 5 && slotRows[5] == 5) {
        mltipler = 32;
      } else if (slotRows[3] == 6 && slotRows[4] == 6 && slotRows[5] == 6) {
         mltipler = 64;
      }
    }

    if (message.content.toLowerCase() === 'multislots') {

      if (slotRows[0] == 1 && slotRows[1] == 1 && slotRows[2] == 1 || slotRows[3] == 1 && slotRows[4] == 1 && slotRows[5] == 1 ||  slotRows[6] == 1 && slotRows[7] == 1 && slotRows[8] == 1 ) {
         mltipler = 1;
      } else if (slotRows[0] == 2 && slotRows[1] == 2 && slotRows[2] == 2 || slotRows[3] == 2 && slotRows[4] == 2 && slotRows[5] == 2 ||  slotRows[6] == 2 && slotRows[7] == 2 && slotRows[8] == 2) {
         mltipler = 2;
      } else if ( slotRows[0] == 3 && slotRows[1] == 3 && slotRows[2] == 3 || slotRows[3] == 3 && slotRows[4] == 3 && slotRows[5] == 3 || slotRows[6] == 3 && slotRows[7] == 3 && slotRows[8] == 3 ) {
         mltipler = 4;
      } else if ( slotRows[0] == 4 && slotRows[1] == 4 && slotRows[2] == 4 || slotRows[3] == 4 && slotRows[4] == 4 && slotRows[5] == 4 ||  slotRows[6] == 4 && slotRows[7] == 4 && slotRows[8] == 4 ) {
         mltipler = 8
      } else if ( slotRows[0] == 5 && slotRows[1] == 5 && slotRows[2] == 5 || slotRows[3] == 5 && slotRows[4] == 5 && slotRows[5] == 5 ||  slotRows[6] == 5 && slotRows[7] == 5 && slotRows[8] == 5) {
        mltipler = 16;
      } else if (slotRows[0] == 6 && slotRows[1] == 6 && slotRows[2] == 6 || slotRows[3] == 6 && slotRows[4] == 6 && slotRows[5] == 6 ||  slotRows[6] == 6 && slotRows[7] == 6 && slotRows[8] == 6 ) {
         mltipler = 32;
      }
    }
      coins = coins * mltipler;
      return {coins, mltipler, slotRows};
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function wage() {

      var fs = require('fs');

      // setting up path
      var path =  '/tmp/' + message.author.id + ".json";

      // checks if path / file already exist
      if (fs.existsSync(path)) {

          message.channel.send("loading file");
          // read file as plain text
          var readFile = fs.readFileSync(path);
          // creates js object from plain text
          var obj = JSON.parse(readFile);
          message.channel.send("You recived 100 Coins !!!!");
          obj.coins = obj.coins + 100;
          fs.writeFile(path, JSON.stringify(obj), function(err) {
            if (err) {
              return console.log(err);
            }});
          message.channel.send("You have " + obj.coins + " coins in your account.");
          message.channel.send("The file (" + message.author.id +".json"+ ") was saved!");

      }else {
        // writes object to plain text file
        fs.writeFile(path, '{"coins": "100"}', function(err) {
          if (err) {
            return console.log(err);
          }
          message.channel.send("The file (" + message.author.id +".json"+ ") was saved!");
          message.channel.send("Mako created a bank account for you !");
          message.channel.send("You recived 100 Coins !!!!");
        });
      }
    }

  // If the message is "slots"
  if (isSlots(message.content)) {
    // Send to the same channel
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
   message.channel.send("yep just a test! this is a second test, 3test");
 }

  if (message.content === 'patch') {
   // Send to the same channel
   execFile("/root/makobot/MakoBot/discordJs/syncGitRepo.sh");
   console.log("Lasse");
   message.channel.send("patched git");
   message.channel.send("restart now");
 }
});


// Log our bot in
client.login(token);
