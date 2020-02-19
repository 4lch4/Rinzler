const timestamps = require('mongoose-timestamp')
const { Schema } = require('mongoose')

const TronConfigSchema = Schema({
  // The servers id that these config settings are for.
  _id: String,

  // The id of the channel to use for any announcements.
  announcementChannel: String,

  // The ID of the user/admin who is the Head Bitch In Charge of this server.
  hbic: String,

  // Whether or not to reply with the alot creature.
  alotFlag: Boolean
})

TronConfigSchema.plugin(timestamps)

module.exports = connection => {
  return connection.useDb('tconfig').model('TronConfig', TronConfigSchema, 'servers')
}
