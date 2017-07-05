/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'MzMxNzE3MTI1ODMwMDgyNTYw.DDznVA.CwWs-HqWVwuez-FeReIY9Y8aMYQ';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {

    function slots() {

    slotsLogic(genSlotsNumbers(), 1);
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
      message.channel.send("   S   L   O   T   S   ");
      changeNrToEmo(slotRows);
      message.channel.send(slotRows[0] + " " + slotRows[1] + " " + slotRows[2] + "\n" + slotRows[3] + " " + slotRows[4] + " " + slotRows[5] + "\n" + slotRows[6] + " " + slotRows[7] + " " + slotRows[8]);
      return slotRows;
    }

function changeNrToEmo(slotRows){
for (i = 0; i < slotRows.length ;){
if (slotRows[i] == 1){
slotRows[i] = ":saxophone:";
}else if (slotRows[i] == 2) {
  slotRows[i] = ":video_game:";
}else if (slotRows[i] == 3) {
  slotRows[i] = ":guitar:";
}else if (slotRows[i] == 4) {
  slotRows[i] = ":drum:";
}else if (slotRows[i] == 5) {
  slotRows[i] = ":microphone:";
}else if (slotRows[i] == 6) {
  slotRows[i] = ":rosette:";
}
i++;
}
return slotRows;
}
    function slotsLogic(slotRows,coins) {
      var mltipler = 0;
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

      coins = coins * mltipler;
      message.channel.send("You Won " + coins + "!\nYour coin multiplicator is " + mltipler)
      return coins
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function wage() {

      message.channel.send("DEBUG writing file to disk");
      var fs = require('fs');
      fs.writeFile("/tmp/"+ client.user.id +".json", "Hey there!", function(err) {
        if (err) {
          return console.log(err);
        }

        message.channel.send("The file (" + client.user.id +".json"+ ") was saved!");
        console.log("The file was saved!");
      });
    }

  // If the message is "slots"
  if (message.content === 'slots') {
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
});


// Log our bot in
client.login(token);
