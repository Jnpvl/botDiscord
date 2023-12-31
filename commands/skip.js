const musicQueue = require('../utils/musicQueue');

module.exports = {
  name: 'skip',
  description: 'Salta a la siguiente canción en la cola.',
  execute(message) {
    const serverQueue = musicQueue.getQueue(message.guild.id);
    if (!serverQueue || serverQueue.songs.length === 0) {
      return message.channel.send('No hay canciones en la cola para saltar.');
    }

    try {
      if (serverQueue.audioPlayer.state.status !== 'idle') {
        serverQueue.audioPlayer.stop(); 
      }
    } catch (error) {
      console.error('Error al intentar saltar la canción:', error);
      message.channel.send('Hubo un error al intentar saltar la canción.');
    }
  },
};