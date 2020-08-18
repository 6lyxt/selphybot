const utils = require('../utils')
const needle = require('needle')

module.exports = {
  twitch: async function twitch(msg){
    needle.get("https://decapi.me/twitch/uptime?channel=selphy", function(err, res) {
      if(res.body.toString().includes("offline")){
        utils.throwEmbed(msg, "Twitch", "Selphius ist momentan offline. \nSchau doch ein wenig später nochmal vorbei!", "#c96363", "https://camo.githubusercontent.com/323e46a74461fd6c201cf91da6a8d2cbcca92297/68747470733a2f2f7669676e657474652e77696b69612e6e6f636f6f6b69652e6e65742f6e69636f646f75676173696e676572732f696d616765732f312f31382f53656c7068792e706e672f7265766973696f6e2f6c61746573743f63623d3230313830393037303531353533", "https://twitch.tv/selphy")
      } else {
        utils.throwEmbed(msg, "Twitch", "Selphius ist momentan live! \nhttps://twitch.tv/selphy", "#c96363", "https://camo.githubusercontent.com/323e46a74461fd6c201cf91da6a8d2cbcca92297/68747470733a2f2f7669676e657474652e77696b69612e6e6f636f6f6b69652e6e65742f6e69636f646f75676173696e676572732f696d616765732f312f31382f53656c7068792e706e672f7265766973696f6e2f6c61746573743f63623d3230313830393037303531353533", "https://twitch.tv/selphy");
      }
    })
  }
}
