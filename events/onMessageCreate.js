const ttsCommand = require('../commands/ttsCommand.js');
const phrases = require('../commands/phrases.js'); 
const playCommand = require('../commands/play.js');
const skipCommand = require('../commands/skip.js'); 
const stopCommand = require('../commands/stop.js'); 

module.exports = {
  name: 'messageCreate',
  execute(message) {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();

    switch (commandName) {
      case 'play':
        playCommand.execute(message, args);
        break;
      case 'skip':
        skipCommand.execute(message);
        break;
      case 'stop':
        stopCommand.execute(message);
        break;
      default:
        if (phrases.hasOwnProperty(commandName)) {
          ttsCommand.execute(message);
        } else {
          message.reply('No reconozco ese comando.');
        }
    }
  },
};
