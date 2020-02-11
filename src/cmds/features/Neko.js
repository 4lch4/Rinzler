const BaseCmd = require('../_bases/BaseCmd')
const Strings = require('../../i18n/enUS/NekoLife')
const { getNekoImg, validateFuncName, validateNSFWFlag } = require('../../utils/NekoLife')

class Neko extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'neko',
      memberName: 'neko',
      group: 'features',
      description: 'Used to retrieve images from nekos.life, including NSFW content. NSFW content can only be retrieved when used in DMs or a channel marked for NSFW.',
      examples: ['+neko', '+neko baka', '+neko randomHentaiGif n'],
      args: [{
        key: 'functionName',
        prompt: 'Which image function are you looking for?',
        type: 'string',
        label: 'Image Function Name',
        validate: (val, msg, arg) => validateFuncName(val, msg, arg)
      }, {
        key: 'nsfwFlag',
        prompt: 'If you would like NSFW content, please provide the letter n.',
        default: 's',
        type: 'string',
        label: 'SFW/NSFW Flag',
        validate: (val, msg, arg) => validateNSFWFlag(val, msg, arg)
      }]
    })
  }

  async run (msg, { functionName, nsfwFlag }) {
    // Verify the user provided a NSFW flag.
    if (nsfwFlag.toLowerCase().startsWith('n') && !msg.channel.nsfw) {
      return msg.reply(Strings.Errors.NonNSFWChannel)
    } else {
      const img = await getNekoImg(functionName, nsfwFlag)
      if (img.nsfw && !msg.channel.nsfw) return msg.reply(Strings.Errors.NonNSFWChannel)
      else return msg.channel.send(img.url)
    }
  }
}

module.exports = Neko
