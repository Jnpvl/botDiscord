const musicQueue = require('../utils/musicQueue');

module.exports = {
  name: 'stop',
  description: 'Detiene la música y limpia la cola.',
  execute(message) {
    const serverQueue = musicQueue.getQueue(message.guild.id);
    if (!serverQueue) {
      return message.channel.send('No hay nada reproduciendo.');
    }
    serverQueue.songs = []; 
    serverQueue.audioPlayer.stop(); 
    serverQueue.connection.destroy(); 
    musicQueue.deleteQueue(message.guild.id); 
    message.channel.send('La música ha sido detenida y la cola ha sido limpiada.');
  },
};
