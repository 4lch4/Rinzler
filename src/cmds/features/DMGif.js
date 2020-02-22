const BaseCmd = require('../_bases/BaseReactionCmd')

class DMGif extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dmgif',
      memberName: 'dmgif',
      group: 'features',
      description: 'Enables you to DM a gif/image instead of posting it in a channel.',
      guildOnly: true,
      aliases: ['dmg'],
      examples: ['+dmgif hug @4lch4#0042', '+dmg stab @4lch4#0042 @Robo#6666'],
      argsType: 'multiple'
    })
  }

  /**
   *
   * @param {CommandMessage} msg
   * @param {String[]} args
   */
  async run (msg, args) {
    try {
      if (msg.mentions.users.size === 0) return msg.reply('you must mention at least one User to DM a gif too.')
      if (args.length === 0) return msg.reply('you must provide _some_ arguments to this command. The minimum required is the type of gif you would like to send, and the User to send it to.')
      if (args.length === 1) return msg.reply('you must provide the type of gif to send and at least one User to send the gif to.')

      let imgIndex
      if (!isNaN(args[1])) imgIndex = args[1]

      const gifType = args[0].toLowerCase()
      const img = await this.getCommandImage(gifType, imgIndex)

      for (const mention of msg.mentions.users) {
        const dmChannel = await mention[1].createDM()
        await dmChannel.send(`From ${msg.author.username}:\n\n${img.body}`)
      }

      await msg.channel.send('Message(s) sent! 🎉')
      await msg.delete()
    } catch (err) {
      if (err.message === 'socket hang up') {
        await msg.delete()
        return msg.reply('it appears I don\'t have any images with this name saved :(')
      } else {
        this.error(err)
        return msg.channel.send('I have encountered an unexpected error. This incident has been logged and will hopefully be fixed soon. If not, feel free to reach out to @4lch4#0042.')
      }
    }
  }
}

module.exports = DMGif

// #region Type Data
const { CommandMessage } = require('discord.js-commando')
// #endregion Type Data
