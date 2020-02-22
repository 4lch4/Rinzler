const BaseCmd = require('../_bases/BaseCmd')

class Mute extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'mute',
      memberName: 'mute',
      group: 'admin',
      guildOnly: true,
      aliases: ['stfu'],
      description: 'Mutes a User from talking in the server over voice _or_ text.',
      argsType: 'multiple',
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run (msg, args) {
    const mentions = msg.mentions.users

    // Validate the User mentioned the other User(s) to mute.
    if (args.length === 0 || !mentions || mentions.size < 1) return msg.reply('please tag the User(s) you wish to mute.')
    else {
      // If the length of args is more than the amount of mentions, there was likely a reason provided.
      const muteReason = (args.length > mentions.size) ? args.slice(mentions.size).join(' ') : 'N/A'

      for (const mention of mentions) {
        // Get the GuildMember version of each User.
        const member = msg.guild.member(mention[1])

        // Execute the mute function
        await member.setMute(true, muteReason)

        // Let the Channel/Guild know who was muted by whom and for what reason.
        await msg.channel.send(`\`${mention[1].username}\` has been muted by \`${msg.author.username}\` because \`${muteReason}\`.`)
      }
    }
  }
}

module.exports = Mute
