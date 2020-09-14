const utils = require('../utils')
module.exports = {
  leave: async function leave(msg){
    msg.member.voice.channel.leave();
    utils.throwEmbed(msg, "VoiceChannel verlassen", "Oke, ich hab den Voice Channel verlassen ^-^", "#c96363", null, "http://www.selphybot.xyz", null);

  }
}
