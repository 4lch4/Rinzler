const BaseCmd = require('../_bases/BaseCmd')

class Ban extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'ban',
      memberName: 'ban',
      group: 'admin',
      description: 'Ban the specified User(s) from the server, and if the reason is provided, logs the ban and reason to the audit log.',
      aliases: ['gtfo'],
      examples: ['+ban @4lch4#0042 Ugly AF.', '+gtfo @Robo#6666 3'],
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    const mentions = msg.mentions.users

    // Validate the User mentioned the other User(s) to ban.
    if (args.length === 0 || !mentions || mentions.size < 1) return msg.reply('please tag the User(s) you wish to ban.')
    else {
      const userArgs = parseArgs(args)
      if (userArgs.days > 7) return msg.reply('a temporary ban can only be set for 7 days at max. Please provide a smaller ban length.')

      // Iterate through each mentioned User.
      for (const mention of mentions) {
        // Get the GuildMember version of each User.
        const member = msg.guild.member(mention[1])

        // Ban the GuildMember with the provided reason/length.
        await member.ban(userArgs)

        // TODO: Find out why the member.username reference is turning up undefined.
        // Let the Channel/Guild know who was banned by whom and for what reason.
        await msg.channel.send(`\`${member.username}\` has been banned by \`${msg.author.username}\` because \`${userArgs.reason}\`.`)
      }
    }
  }
}

module.exports = Ban

/**
 * Parses the given String array for user input and returns it as an object w/
 * the data under informative keys.
 *
 * @param {String[]} input The input args to parse.
 */
const parseArgs = input => {
  // User provided at least two args. Hopefully a user and length or reason of the ban.
  if (!input || input.length === 1) return undefined
  else if (input.length === 2) {
    if (isNaN(input[1])) {
      return {
        days: 0,
        reason: input[1]
      }
    } else {
      return {
        days: input[1],
        reason: 'N/A'
      }
    }
  } else {
    // Validate the 2nd arg is a number.
    if (!isNaN(input[1])) {
      return {
        days: input[1],
        reason: input.slice(2).join(' ')
      }
    } else {
      return {
        days: 0,
        reason: input.slice(1).join(' ')
      }
    }
  }
}
