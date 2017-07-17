const UTIL = require('./util');

module.exports = {
  checklocation: function(message,location) {
  if (location = readObjProperty(message,'location')){
    return True;
  } else {
    return False;
  }
}
};
