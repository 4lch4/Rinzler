const tools = require('../../utils/tools').MiscTools
const BaseCmd = require('../_bases/BaseCmd')
const { RichEmbed } = require('discord.js')
const info = require('../../../package.json')
const Moment = require('moment')

class Bot extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'bot',
      memberName: 'bot',
      group: 'features',
      description: 'Displays various information about Tron and the servers it is on.',
      aliases: ['bot-info', 'botinfo', 'info'],
      examples: ['+bot', '+botinfo']
    })
  }

  async run (msg, args) {
    const botUser = this.client.user

    if (msg.member === null) var user = msg.user
    else user = msg.member

    const embed = new RichEmbed({
      title: botUser.username,
      description: info.description,
      color: 4682777,
      timestamp: new Moment().toDate(),
      footer: {
        icon_url: botUser.avatarURL,
        text: `Tron - ${info.version}`
      },
      thumbnail: {
        url: botUser.avatarURL
      },
      author: {
        name: user.username,
        icon_url: user.avatarURL
      },
      fields: generateFields(this.client)
    })

    return BaseCmd.sendMessage(msg.channel, '', this.client.user, embed)
  }
}

module.exports = Bot

const generateFields = (client) => {
  const fields = [{
    name: 'Server Count',
    value: client.guilds.size,
    inline: true
  }, {
    name: 'User Count',
    value: tools.numberWithCommas(client.users.size),
    inline: true
  }, {
    name: 'Uptime',
    value: `${tools.numberWithCommas(Math.round(client.uptime / 1000 / 60))} mins`,
    inline: true
  }, {
    name: 'Command Count',
    value: client.registry.commands.size,
    inline: true
  }]

  for (let x = 0; x < client.owners.length; x++) {
    fields.push({
      name: 'Owner',
      value: client.owners[x].tag,
      inline: true
    })
  }

  // for (let x = 0; x < config.developers.length; x++) {
  //   fields.push({
  //     name: 'Developer',
  //     value: config.developers[x],
  //     inline: true
  //   })
  // }

  return fields
}
