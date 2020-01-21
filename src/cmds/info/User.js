const info = require('../../../package.json')
const BaseCmd = require('../_bases/BaseCmd')
const { RichEmbed } = require('discord.js')

const tools = new (require('../../utils/DateTools'))()

class User extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'user',
      memberName: 'user',
      group: 'info',
      description: 'Gets information about a specific user.',
      examples: ['+user', '+user 4']
    })
  }

  async run (msg) {
    let member
    let user

    switch (msg.mentions.users.size) {
      case 0:
        member = msg.member
        user = msg.author
        break

      case 1:
        member = msg.mentions.members.array()[0]
        user = member.user
        break
    }

    return BaseCmd.sendMessage(msg.channel, '', this.client.user, new RichEmbed({
      title: member.tag,
      footer: {
        icon_url: this.client.user.avatarURL,
        text: `Tron - ${info.version}`
      },
      color: 8824426,
      thumbnail: {
        url: user.avatarURL
      },
      author: {
        name: 'Tron',
        url: info.repoUrl,
        icon_url: this.client.user.avatarURL
      },
      fields: generateFields(user, member)
    }))
  }
}

module.exports = User

const generateFields = (user, member) => {
  // const presence = null
  const fields = []

  /* if (user.presence) presence = parseUserPresence(user.presence)

  if (presence.details !== null) {
    fields.push({
      'name': 'Activity Details',
      'value': presence.details
    })
  }

  if (presence.name !== null) {
    fields.push({
      'name': 'Activity Name',
      'value': presence.name
    })
  } */

  fields.push({
    name: 'User Id',
    value: member.id,
    inline: true
  }, {
    name: 'Created On',
    value: tools.formatUnixInput(user.createdTimestamp),
    inline: false
  }, /*  {
    'name': 'Status',
    'value': user.presence.status.toUpperCase(),
    'inline': true
  }, */ {
    name: 'Joined Server On',
    value: tools.formatUnixInput(member.joinedTimestamp),
    inline: false
  })

  return fields
}
