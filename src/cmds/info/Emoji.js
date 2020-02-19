const BaseCmd = require('../_bases/BaseCmd')

class Emoji extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'emoji',
      group: 'info',
      memberName: 'emoji',
      description: 'Displays all of the emoji available on the server.',
      examples: ['+emoji', '+emoji animated', '+emoji still'],
      guildOnly: true,
      args: [{
        key: 'type',
        default: 'all',
        prompt: 'What type of emoji would you like to display?',
        validate: val => {
          if (val === 'all' || val === 'animated' || val === 'still') return true
          else return 'Please provide a valid emoji type (`animated`, `still`, or `all`).'
        },
        parse: val => val.toLowerCase()
      }]
    })
  }

  async run (msg, { type }) {
    if (msg.guild.available) {
      const emoji = getEmoji(msg.guild)

      console.log('guildEmoji...')
      console.log(emoji)
      const output = []

      switch (type) {
        case 'still':
          output.push('**Standard Emoji:**')
          output.push(`${emoji.still.join(' ')}\n`)
          break

        case 'animated':
          output.push('**Animated Emoji (Requires Discord Nitro):**')
          output.push(`${emoji.animated.join(' ')}\n`)
          break

        case 'all':
          output.push('**Standard Emoji:**')
          output.push(`${emoji.still.join(' ')}\n`)
          output.push('**Animated Emoji (Requires Discord Nitro):**')
          output.push(`${emoji.animated.join(' ')}\n`)
          break
      }

      if (output.join('\n').length < 2000) return msg.channel.send(output.join('\n'))
      else {
        msg.channel.send(`${output[0]}\n${output[1]}`)
        return msg.channel.send(`${output[2]}\n${output[3]}`)
      }
    } else return msg.reply('unfortunately the Discord server is unable to be searched for emoji at this time. Please try again later.')
  }
}

module.exports = Emoji

/**
 * Gets all still/non-animated emoji from the given guild and returns it as an
 * array of GuildEmoji objects.
 *
 * @param {Guild} guild The guild you wish to get the emoji from.
 *
 * @returns {Emoji} An array of GuildEmoji objects.
 */
const getEmoji = guild => {
  const emoji = {
    still: [],
    animated: []
  }

  for (const guildEmoji of guild.emojis) {
    if (guildEmoji[1].animated) emoji.animated.push(guildEmoji[1])
    else emoji.still.push(guildEmoji[1])
  }

  return emoji
}
