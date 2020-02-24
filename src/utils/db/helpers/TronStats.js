const TStats = require('../models/TronStats')
const DBBase = require('../DBBase')

class TronStats extends DBBase {
  constructor () {
    super()
    this.TStats = TStats(this.connection)

    this.Users = this.TStats.Users
    this.Global = this.TStats.Global
    this.Servers = this.TStats.Servers
  }

  async saveStartupTime (startupTime) {
    return TStats(this.connection).Tron.updateOne({ _id: 'gStats' }, {
      startup: startupTime,
      $inc: { restarts: 1 }
    })
  }

  /**
   * Increments the stats for the given command in a global/server/user scope.
   * First the global stats are updated, followed by server, and lastly the user
   * specific stats.
   *
   * @param {Command} cmd The Command that's to be incremented.
   * @param {CommandMessage} msg The CommandMessage object that's executing the Command.
   */
  async incrementCmdUsage (cmd, msg) {
    try {
      return Promise.all([
        this.incrementGlobalUsage(cmd),
        this.incrementServerUsage(cmd, msg),
        this.incrementUserUsage(cmd, msg)
      ])
    } catch (err) {
      this.error(err)
      return err
    }
  }

  /**
   *
   * @param {Command} cmd The Command that's to be incremented.
   */
  async incrementGlobalUsage (cmd) {
    try {
      const updateResponse = await this.Global.findOneAndUpdate({ name: cmd.name }, { $inc: { uses: 1 }, lastUsed: getLastUsedTimestamp() })

      // Check if the command exists in the DB already.
      if (updateResponse) return updateResponse
      else {
        // Command has not been used before and needs to be added to the database.
        return this.Global.create({
          _id: this.generateId(),
          name: cmd.name,
          uses: 1,
          lastUsed: getLastUsedTimestamp()
        })
      }
    } catch (err) { return err }
  }

  /**
   *
   * @param {Command} cmd The Command that's to be incremented.
   * @param {CommandMessage} msg The CommandMessage object that's executing the Command.
   */
  async incrementServerUsage (cmd, msg) {
    try {
      const server = await this.Servers.findById(msg.guild.id)

      // Verify the server has a config that can be updated.
      if (server) {
        this.log('Server has an existing config...')
        const cmdDoc = updateCommandUses(cmd.name, server.cmdUsage)

        if (!cmdDoc) {
          server.cmdUsage.push({
            _id: `${cmd.name.toLowerCase()}:${msg.guild.id}`,
            name: cmd.name,
            uses: 1,
            lastUsed: getLastUsedTimestamp()
          })
        }

        return this.Servers.updateOne({ _id: msg.guild.id }, server)
        // return
      } else {
        // A Server config didn't exist, we must create one.
        const newServerConfig = {
          _id: msg.guild.id,
          name: msg.guild.name,
          memberCount: msg.guild.memberCount,
          cmdUsage: [{
            _id: `${cmd.name.toLowerCase()}:${msg.guild.id}`,
            name: cmd.name,
            uses: 1,
            lastUsed: getLastUsedTimestamp()
          }]
        }

        this.log('Creating a new Server config...')
        this.log(newServerConfig)

        return this.Servers.create(newServerConfig)
      }
    } catch (err) { return err }
  }

  /**
   *
   * @param {Command} cmd The Command that's to be incremented.
   * @param {CommandMessage} msg The CommandMessage object that's executing the Command.
   */
  async incrementUserUsage (cmd, msg) {
    try {
      const user = await this.Users.findById(msg.author.id)

      // Verify the User had an existing config that can be updated.
      if (user) {
        this.log('User has an existing config...')
        const cmdDoc = updateCommandUses(cmd.name, user.cmdUsage)

        if (!cmdDoc) {
          user.cmdUsage.push({
            _id: `${cmd.name.toLowerCase()}:${msg.author.id}`,
            name: cmd.name,
            uses: 1,
            lastUsed: getLastUsedTimestamp()
          })
        }

        return this.Users.updateOne({ _id: msg.author.id }, user)
        // return
      } else {
        // User did not have an existing config, we must create one.
        const newUserConfig = {
          _id: msg.author.id,
          name: msg.author.username,
          cmdUsage: [{
            _id: `${cmd.name.toLowerCase()}:${msg.author.id}`,
            name: cmd.name,
            uses: 1,
            lastUsed: getLastUsedTimestamp()
          }]
        }

        this.log('Creating newUserConfig...')
        this.log(newUserConfig)

        return this.Users.create(newUserConfig)
      }
    } catch (err) { return err }
  }
}

module.exports = TronStats

const updateCommandUses = (cmdName, cmdUsage) => {
  for (const cmd of cmdUsage) {
    if (cmd.name === cmdName) {
      cmd.uses++
      return cmd
    }
  }

  return undefined
}

const getLastUsedTimestamp = () => {
  return new Date().toUTCString()
}

// #region Type Data
/**
 * @typedef {Object} TronStats
 *
 * @property {String} _id Since there should only ever be one of these objects, the id is going to be a static value.
 * @property {String} startup The latest time of startup.
 * @property {Number} restarts How many times Tron has been restarted over the life of development.
 */

/**
 * @typedef {Object} CommandStats
 *
 * @property {String} _id The unique identifier of the command stat being tracked, generated via the uuid module.
 * @property {String} name The name of the command, duh.
 * @property {Number} uses How many times the command has been used.
 * @property {String} lastUsed A timestamp indicating when the command was last used.
 */

/**
 * @typedef {Object} ServerStats
 *
 * @property {String} _id The unique identifier of the Server returned from Discord.
 * @property {String} name The display name of the Server.
 * @property {Number} memberCount The amount of members last seen on the Server.
 * @property {CommandStats[]} cmdUsage An array of CommandStatsSchemas that represent the command usage stats for this server.
 */

/**
 * @typedef {Object} UserStats
 *
 * @property {String} _id The unique identifier of the User returned from Discord.
 * @property {String} name The display name of the User.
 * @property {CommandStats[]} cmdUsage An array of CommandStatsSchemas that represent the command usage stats for this User.
 */

const {
  CommandMessage,
  Command
} = require('discord.js-commando')
// #endregion Type Data
