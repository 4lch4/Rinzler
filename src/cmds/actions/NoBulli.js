const BaseCmd = require('../_bases/BaseCmd')
const ansel = new (require('../utils/AnselAid'))()

class NoBulli extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'nobulli',
      group: 'actions',
      memberName: 'nobulli',
      guildOnly: true,
      description: 'Warns @User1 not to bully @User2.',
      examples: ['+nobulli @User1 @User2'],
      args: [{
        key: 'user1',
        type: 'user',
        prompt: 'Which user needs a warning?'
      }, {
        key: 'user2',
        type: 'user',
        prompt: 'Which user needs protecting?'
      }]
    })
  }

  async run (msg, { user1, user2 }) {
    if (msg.mentions.users.size > 1) {
      var content = `**${user1.username}**, don't you dare bulli **${user2.username}**!`
    }

    const image = await ansel.getCommandImage('nobulli')
    return BaseCmd.sendMessage(msg.channel, content, this.client.user, { files: [image] })
  }
}

module.exports = NoBulli
