const BaseCmd = require('../_bases/BaseCmd')

class Peach extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'peach',
      memberName: 'peach',
      group: 'user',
      description: 'Returns a random Peach image/gif.',
      examples: ['+peach', '+peach 4']
    })
  }

  async run (msg, args) {
    if (msg.mentions.users.size > 0) {
      msg.mentions.users.forEach(user => {
        user.createDM().then(channel => channel.send('🍑'))
      })

      msg.channel.send('Your message(s) has been sent.')
    } else return msg.channel.send('🍑')
  }
}

module.exports = Peach
