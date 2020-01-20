const BaseCmd = require('../_bases/BaseCmd')

const tools = new (require('../../utils/MiscTools'))()
const ratings = require('../../../data/ratings')

class RateWaifu extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'ratewaifu',
      group: 'features',
      memberName: 'ratewaifu',
      description: 'Rate your waifu! 0 - 10 (mostly 😜)',
      guildOnly: true,
      aliases: ['rate'],
      examples: ['+rate @4lch4#0042'],
      args: [{
        key: 'user',
        type: 'user',
        prompt: 'Who do you want to rate?',
        label: 'Waifu'
      }]
    })
  }

  async run (msg, { user }) {
    const rating = ratings[user.id]

    if (rating !== undefined) {
      if (rating.msg === false) {
        return msg.channel.send('**' + user.username + '**, I\'d rate you ' + tools.getRandom(rating.min, rating.max) + '/10 waifu.')
      } else return msg.channel.send(`**${user.username}**${rating.msg}`)
    } else {
      const random = tools.getRandom(0, 11)
      const message = '**' + user.username + "**, I'd rate you " + random + '/10 waifu.'

      return msg.channel.send(message)
    }
  }
}

module.exports = RateWaifu
