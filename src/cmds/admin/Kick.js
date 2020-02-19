const BaseCmd = require('../_bases/BaseCmd')

class Kick extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'admin-kick',
      memberName: 'admin-kick',
      group: 'admin',
      description: 'Kick a user from the server with an optional reason for the kick.',
      aliases: ['akick', 'boot'],
      examples: ['+admin-kick @4lch4#0042 Being rude.', '+boot @4lch4#0042'],
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    const mentions = msg.mentions.users

    // Validate the User mentioned the other User(s) to kick.
    if (args.length === 0 || !mentions || mentions.size < 1) return msg.reply('please tag the User(s) you wish to kick.')
    else {
      // If the length of args is more than the amount of mentions, there was a reason provided.
      const kickReason = (args.length > mentions.size) ? args.slice(mentions.size).join(' ') : 'N/A'

      // Iterate through each mentioned User.
      for (const mention of mentions.size) {
        // Get the GuildMember version of each User.
        const member = msg.guild.member(mention[1])

        // Kick the GuildMember with the provided reason.
        await member.kick(kickReason)

        // Let the Channel/Guild know who was kicked by whom and for what reason.
        await msg.channel.send(`\`${member.username}\` has been kicked by \`${msg.author.username}\` because \`${kickReason}\`.`)
      }
    }
  }
}

module.exports = Kick
