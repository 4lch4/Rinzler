const BaseCmd = require('./BaseCmd')
const Ansel = require('../utils/AnselAid')
const ansel = new Ansel()

class BaseActionCmd extends BaseCmd {
  constructor (client, commandInfo) {
    super(client, commandInfo)

    if (commandInfo.stdReply) this.stdReply = commandInfo.stdReply
    else throw new Error('Any Command that extends BaseActionCommand requires a stdReply property to use when building a reply.')

    if (commandInfo.tronReply) this.tronReply = commandInfo.tronReply
    if (commandInfo.replyEmoji) this.replyEmoji = commandInfo.replyEmoji
  }

  async run (msg, args) {
    if (msg.mentions.users.size > 0) {
      var content = `${this.getMentionedUsernames(msg)}, ${this.stdReply} **${msg.author.username}**${` ${this.replyEmoji}` || '.'}`
      if (this.tronReply && msg.mentions.users.find(mention => mention.id === this.client.user.id)) {
        return msg.reply(this.tronReply)
      }
    }

    const image = await ansel.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, content, this.client.user, { files: [image.body] })
  }
}

module.exports = BaseActionCmd
