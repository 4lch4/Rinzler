const BaseCmd = require('../_bases/BaseCmd')

class Avatar extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'avatar',
      group: 'features',
      memberName: 'avatar',
      description: 'Returns a link to the tagged users avatar.',
      details: 'Returns a high quality (if available) version of the tagged users avatar.',
      examples: ['+avatar @Alcha#0042'],
      args: [{
        key: 'user',
        label: 'User',
        prompt: 'Which user did you want the avatar of?',
        type: 'user'
      }]
    })
  }

  async run (msg, { user }) {
    return msg.channel.send(user.avatarURL)
  }
}

module.exports = Avatar
