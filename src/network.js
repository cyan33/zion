const socket = require('socket.io');

function createIO(http) {
  const io = socket(http);

  return {
    // the callback functions passed into options should be provided
    // with paramenters using `bind`
    listen(options = {}) {
      for (let key in options) {
        io.on(key, options[key]);
      }
    }
  };
}

module.exports = createIO;
