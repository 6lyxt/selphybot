const ytdl = require('ytdl-core');

module.exports = {
  radio: async function radio(msg){
    if(!msg.member.voice.channel) return msg.reply("you have to be in a voice channel to listen to the radio!")

    msg.member.voice.channel.join().then(connection => {
      const stream = ytdl('https://www.youtube.com/watch?v=o9Phw-cJqBQ', { filter: 'audioonly' });
      const dispatcher = connection.play(stream);
      dispatcher.on('finish', () => msg.member.voice.channel.leave());
    })
  }
}
