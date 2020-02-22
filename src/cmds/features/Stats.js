const BaseCmd = require('../_bases/BaseCmd')

class Stats extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'stats',
      memberName: 'stats',
      group: 'features',
      description: 'Your one stop shop for all of the stats for Tron.',
      argsType: 'multiple',
      examples: ['+stats', '+stats me', '+stats @4lch4#0042']
    })
  }

  /**
   *
   * @param {CommandMessage} msg
   * @param {String[]} args
   */
  async run (msg, args) {
    // No args provided, perform a basic server stat check.
    if (args.length === 0) return msg.channel.send(await getServerStatsPretty(msg.guild.id))
  }
}

module.exports = Stats

const getServerStatsPretty = async serverId => {
  try {
    const rawStats = await getServerStatsRaw(serverId)
  } catch (err) { return err }
}

const getServerStatsRaw = async serverId => {

}

// #region Type Data
const { CommandMessage } = require('discord.js-commando')
// #endregion Type Data
