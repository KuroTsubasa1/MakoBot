/*
Here are all the functions necessary for the slots command
*/
const UTIL = require('./util');

module.exports = {

  checkrequirements: function(chkobj,amount) {
    if (chkobj.coins >= 1 && chkobj.coins >= Number(amount[2]) ) {
      return true;
    } else {
      return false;
    }
  },

  genSlotsNumbers: function() {
    var slotRows = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var numbers = [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      6
    ];
    for (i = 0; i < 9;) {

      var randNum = UTIL.getRandomInt(1, numbers.length - 1);
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
  },

  changeNrToEmo: function(slotRows2) {
    for (i = 0; i < slotRows2.length;) {
      if (slotRows2[i] == 1) {
        slotRows2[i] = "<:sl_1:334463233740242954>";
      } else if (slotRows2[i] == 2) {
        slotRows2[i] = "<:sl_2:334463233706426369>";
      } else if (slotRows2[i] == 3) {
        slotRows2[i] = "<:sl_3:334463234352349185>";
      } else if (slotRows2[i] == 4) {
        slotRows2[i] = "<:sl_4:334463233513619466>";
      } else if (slotRows2[i] == 5) {
        slotRows2[i] = "<:sl_5:334463234155479043>";
      } else if (slotRows2[i] == 6) {
        slotRows2[i] = "<:sl_6:334463234298085376>";
      }
      i++;
    }
    return slotRows2;
  },

  slotsLogic: function(slotRows, coins, content) {
    var mltipler = 0;
    if (content === 'slots') {
      if (slotRows[3] == 1 && slotRows[4] == 1 && slotRows[5] == 1) {
        mltipler = 4;
      } else if (slotRows[3] == 2 && slotRows[4] == 2 && slotRows[5] == 2) {
        mltipler = 8;
      } else if (slotRows[3] == 3 && slotRows[4] == 3 && slotRows[5] == 3) {
        mltipler = 16;
      } else if (slotRows[3] == 4 && slotRows[4] == 4 && slotRows[5] == 4) {
        mltipler = 32;
      } else if (slotRows[3] == 5 && slotRows[4] == 5 && slotRows[5] == 5) {
        mltipler = 64;
      } else if (slotRows[3] == 6 && slotRows[4] == 6 && slotRows[5] == 6) {
        mltipler = 128;
      }
    }

    if (content === 'multislots') {

      if (slotRows[0] == 1 && slotRows[1] == 1 && slotRows[2] == 1 || slotRows[3] == 1 && slotRows[4] == 1 && slotRows[5] == 1 || slotRows[6] == 1 && slotRows[7] == 1 && slotRows[8] == 1) {
        mltipler = 1;
      } else if (slotRows[0] == 2 && slotRows[1] == 2 && slotRows[2] == 2 || slotRows[3] == 2 && slotRows[4] == 2 && slotRows[5] == 2 || slotRows[6] == 2 && slotRows[7] == 2 && slotRows[8] == 2) {
        mltipler = 4;
      } else if (slotRows[0] == 3 && slotRows[1] == 3 && slotRows[2] == 3 || slotRows[3] == 3 && slotRows[4] == 3 && slotRows[5] == 3 || slotRows[6] == 3 && slotRows[7] == 3 && slotRows[8] == 3) {
        mltipler = 8;
      } else if (slotRows[0] == 4 && slotRows[1] == 4 && slotRows[2] == 4 || slotRows[3] == 4 && slotRows[4] == 4 && slotRows[5] == 4 || slotRows[6] == 4 && slotRows[7] == 4 && slotRows[8] == 4) {
        mltipler = 16;
      } else if (slotRows[0] == 5 && slotRows[1] == 5 && slotRows[2] == 5 || slotRows[3] == 5 && slotRows[4] == 5 && slotRows[5] == 5 || slotRows[6] == 5 && slotRows[7] == 5 && slotRows[8] == 5) {
        mltipler = 32;
      } else if (slotRows[0] == 6 && slotRows[1] == 6 && slotRows[2] == 6 || slotRows[3] == 6 && slotRows[4] == 6 && slotRows[5] == 6 || slotRows[6] == 6 && slotRows[7] == 6 && slotRows[8] == 6) {
        mltipler = 64;
      }
    }

    if(mltipler == 0){
      coins = coins * -1;
    }else {
      coins = coins * mltipler;
    }
    console.log('coins: ' + coins);
    console.log('mltipler: ' + mltipler);
    return {
      coins,
      mltipler,
      slotRows
    };
  }

};
