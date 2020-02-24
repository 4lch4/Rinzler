const { Schema } = require('mongoose')

const TronStatsSchema = Schema({
  // Since there should only ever be one of these objects, the id is going to be
  // a static value.
  _id: String,

  // The latest time of startup.
  startup: String,

  // How many times Tron has been restarted over the life of development.
  // This one may get so big I have to stop tracking it... Lol.
  restarts: Number
})

const CommandStatsSchema = Schema({
  // The ID of the command stat being tracked, generated via uuid module.
  _id: String,

  // The name of the command, duh.
  name: String,

  // How many times the command has been used.
  uses: Number,

  // A timestamp indicating when the command was last used.
  lastUsed: String
})

const ServerStatsSchema = Schema({
  // The id of the server as far as Discord is concerned.
  _id: String,

  // The display name of the server.
  name: String,

  // The amount of members last seen on the server.
  memberCount: Number,

  // An array of commands and their usage stats.
  cmdUsage: [{
    // The ID of the command stat being tracked, generated via uuid module.
    _id: String,

    // The name of the command, duh.
    name: String,

    // How many times the command has been used.
    uses: Number,

    // A timestamp indicating when the command was last used.
    lastUsed: String
  }]
})

const UserStatsSchema = Schema({
  // The id of the user as far as Discord is concerned.
  _id: String,

  // The username of the user we're tracking stats for.
  name: String,

  // An array of commands and their usage stats.
  cmdUsage: [{
    // The ID of the command stat being tracked, generated via uuid module.
    _id: String,

    // The name of the command, duh.
    name: String,

    // How many times the command has been used.
    uses: Number,

    // A timestamp indicating when the command was last used.
    lastUsed: String
  }]
})

/**
 * Returns the Mongoose Models necessary for interacting with the stats portions
 * of the Tron MongoDB instance.
 *
 * @param {*} connection The connection to the database.
 */
const Stats = connection => {
  return {
    Global: connection.useDb('stats').model('CmdStats', CommandStatsSchema, 'global'),
    Servers: connection.useDb('stats').model('ServerStats', ServerStatsSchema, 'servers'),
    Users: connection.useDb('stats').model('UserStats', UserStatsSchema, 'users'),
    Tron: connection.useDb('stats').model('TronStats', TronStatsSchema, 'global')
  }
}

module.exports = Stats
