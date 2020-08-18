const utils = require('../utils')
module.exports = {
  help: async function help(msg){
    utils.throwEmbed(msg, "Help", "Eine genau Übersicht findest du auf unserer Webseite. \nBesuche http://selphybot.xyz/ für mehr Bot Informationen!", "#c96363", "https://camo.githubusercontent.com/323e46a74461fd6c201cf91da6a8d2cbcca92297/68747470733a2f2f7669676e657474652e77696b69612e6e6f636f6f6b69652e6e65742f6e69636f646f75676173696e676572732f696d616765732f312f31382f53656c7068792e706e672f7265766973696f6e2f6c61746573743f63623d3230313830393037303531353533")
  }
}
