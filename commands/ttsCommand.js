const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const googleTTS = require('google-tts-api');
const phrases = require('./phrases'); 

module.exports = {
  name: 'tts', 
  description: 'El bot se unirá al canal de voz y hablará la frase asociada al comando.', 
  async execute(message) {
    const commandName = message.content.slice(1).split(' ')[0].toLowerCase();
    const text = phrases[commandName];

    if (!text) {
      return message.reply(`No tengo una frase para el comando ${commandName}.`);
    }

    if (!message.member.voice.channel) {
      return message.reply('Necesitas estar en un canal de voz para usar este comando.');
    }
    const voiceChannel = message.member.voice.channel;
    try {
        const url = await googleTTS.getAudioUrl(text, {
          lang: 'es',
          slow: false,
          host: 'https://translate.google.com',
        });
  
        
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator,
        });
  
        
        connection.on(VoiceConnectionStatus.Ready, () => {
          console.log('El bot está conectado y listo para hablar.');
  
          
          const player = createAudioPlayer();
          const resource = createAudioResource(url);
  
         
          player.play(resource);
          connection.subscribe(player);
  
        
          player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy(); 
          });
  
        
          player.on('error', error => {
            console.error(`Error del reproductor de audio: ${error.message}`);
            
          });
        });
  
      } catch (error) {
        console.error(error);
        message.reply('Hubo un error al procesar tu solicitud de TTS.');
      }
    },
  };