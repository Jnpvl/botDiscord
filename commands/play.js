const musicQueue = require('../utils/musicQueue');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
  name: 'play',
  description: 'Reproduce una canción de YouTube en un canal de voz.',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send('Necesitas estar en un canal de voz para reproducir música.');
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send('Necesito permisos para unirme y hablar en tu canal de voz.');
    }

    const songArg = args.join(' ');
    let songInfo;

    if (ytdl.validateURL(songArg)) {
      songInfo = { url: songArg };
    } else {
      const results = await ytSearch(songArg);
      const song = results.videos.length > 0 ? results.videos[0] : null;
      if (!song) {
        return message.reply('No pude encontrar la canción que pediste.');
      }
      songInfo = song;
    }

    const serverQueue = musicQueue.getQueue(message.guild.id);

    if (serverQueue) {
      serverQueue.songs.push(songInfo);
      return message.channel.send(`**${songInfo.title || 'Canción seleccionada'}** ha sido añadida a la cola!`);
    } else {
      const queueConstruct = {
        voiceChannel: voiceChannel,
        textChannel: message.channel,
        connection: null,
        songs: [songInfo],
        audioPlayer: createAudioPlayer(),
        playing: true,
      };

      musicQueue.setQueue(message.guild.id, queueConstruct);

      try {
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator,
        });

        queueConstruct.connection = connection;

        playSong(message.guild, queueConstruct.songs[0], queueConstruct);
      } catch (error) {
        console.error(error);
        musicQueue.deleteQueue(message.guild.id);
        return message.channel.send('Hubo un error al conectar al canal de voz.');
      }
    }
  }
};

function playSong(guild, song, queueConstruct) {
  const serverQueue = musicQueue.getQueue(guild.id);
  if (!song) {
    if (serverQueue.connection) {
      serverQueue.connection.destroy(); 
    }
    musicQueue.deleteQueue(guild.id);
    return;
  }

  const stream = ytdl(song.url, { filter: 'audioonly', highWaterMark: 1 << 25 });
  const resource = createAudioResource(stream);
  serverQueue.audioPlayer.play(resource);
  serverQueue.connection.subscribe(serverQueue.audioPlayer);

  serverQueue.audioPlayer.on(AudioPlayerStatus.Idle, () => {
    serverQueue.songs.shift();
    if (serverQueue.songs.length > 0) {
      playSong(guild, serverQueue.songs[0], queueConstruct);
    } else {
      if (serverQueue.connection) {
        serverQueue.connection.destroy(); 
      }
      musicQueue.deleteQueue(guild.id);
    }
  });

  serverQueue.audioPlayer.on('error', error => console.error(`Error en el reproductor de audio: ${error.message}`));
}
