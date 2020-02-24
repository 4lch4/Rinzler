const { Schema } = require('mongoose')

/**
 * @typedef {Object} TronStatsSchema
 *
 * @property {String} _id Since there should only ever be one of these objects, the id is going to be a static value.
 * @property {String} startup The latest time of startup.
 * @property {Number} restarts How many times Tron has been restarted over the life of development.
 */
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

/**
 * @typedef {Object} CommandStatsSchema
 *
 * @property {String} _id The unique identifier of the command stat being tracked, generated via the uuid module.
 * @property {String} name The name of the command, duh.
 * @property {Number} uses How many times the command has been used.
 * @property {String} lastUsed A timestamp indicating when the command was last used.
 */
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

/**
 * @typedef {Object} ServerStatsSchema
 *
 * @property {String} _id The unique identifier of the Server returned from Discord.
 * @property {String} name The display name of the Server.
 * @property {Number} memberCount The amount of members last seen on the Server.
 * @property {CommandStatsSchema[]} cmdUsage An array of CommandStatsSchemas that represent the command usage stats for this server.
 */
const ServerStatsSchema = Schema({
  // The id of the Server as far as Discord is concerned.
  _id: String,

  // The display name of the Server.
  name: String,

  // The amount of members last seen on the Server.
  memberCount: Number,

  // An array of commands and their usage stats.
  cmdUsage: [CommandStatsSchema]
})

/**
 * @typedef {Object} UserStatsSchema
 *
 * @property {String} _id The unique identifier of the User returned from Discord.
 * @property {String} name The display name of the User.
 * @property {CommandStatsSchema[]} cmdUsage An array of CommandStatsSchemas that represent the command usage stats for this User.
 */
const UserStatsSchema = Schema({
  // The id of the user as far as Discord is concerned.
  _id: String,

  // The username of the user we're tracking stats for.
  name: String,

  // An array of commands and their usage stats.
  cmdUsage: [CommandStatsSchema]
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
