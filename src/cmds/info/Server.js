const BaseCmd = require('../_bases/BaseCmd')
const { RichEmbed } = require('discord.js')
const Moment = require('moment')

class Server extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'server',
      memberName: 'server',
      group: 'features',
      description: 'Lists some basic information of the current server.',
      aliases: ['serverinfo'],
      examples: ['+server', '+serverinfo'],
      guildOnly: true
    })
  }

  async run (msg) {
    if (msg.guild.available) {
      const embed = new RichEmbed({
        title: msg.guild.name,
        description: `Server Id: ${msg.guild.id}\nServer Region: ${msg.guild.region.toUpperCase()}`,
        timestamp: new Moment().toDate(),
        thumbnail: msg.guild.iconURL,
        color: 4682777,
        author: {
          name: msg.author.username,
          icon_url: msg.author.avatarURL
        },
        footer: {
          text: 'Server Info',
          icon_url: this.client.user.avatarURL
        },
        fields: [{
          name: 'Explicit Content Filter',
          value: convertContentFilter(msg.guild),
          inline: true
        }, {
          name: 'Members',
          value: msg.guild.memberCount,
          inline: true
        }, {
          name: 'Emojis',
          value: msg.guild.emojis.size,
          inline: true
        }, {
          name: 'Roles',
          value: msg.guild.roles.size,
          inline: true
        }, {
          name: 'Icon URL',
          value: msg.guild.iconURL,
          inline: true
        }, {
          name: 'Server Owned By',
          value: msg.guild.owner.user.username
        }, {
          name: 'Tron Joined On',
          value: new Moment(msg.guild.joinedAt).format('MMMM Do YYYY @ HH:mm:ss')
        }, {
          name: 'Server Created On',
          value: new Moment(msg.guild.createdAt).format('MMMM Do YYYY @ HH:mm:ss')
        }]
      })

      return BaseCmd.sendMessage(msg.channel, 'Server Information/Stats:', this.client.user, embed)
    } else {
      return BaseCmd.sendMessage(msg.channel, 'The server is unavailable at the moment, please try again later.')
    }
  }
}

module.exports = Server

const convertContentFilter = guild => {
  switch (guild.explicitContentFilter) {
    case 0:
      return 'OFF'

    case 1:
      return 'On for people without roles'

    case 2:
      return 'On for all'

    default:
      break
  }
}
