const { mongoUrl: MONGO_URL } = require('../config')
const mongoose = require('mongoose')
const uuid = require('uuid/v4')

class MongooseDB {
  constructor () {
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    mongoose.set('useUnifiedTopology', true)

    this.connection = mongoose.createConnection(MONGO_URL)
  }

  /**
   * Uses the UUID Node module to generate unique ids to be used for storing
   * objects in the MongoDB.
   *
   * @param {UUIDOptions} [options] Optional UUID state to apply.
   * @param {BufferSource} [buffer] Array or buffer where UUID bytes are to be written.
   * @param {number} [offset] Starting index in `buffer` at which to begin writing.
   */
  generateId (options = undefined, buffer = undefined, offset = undefined) {
    return uuid(options, buffer, offset)
  }
}

module.exports = MongooseDB

/**
 * @typedef {Object} UUIDOptions
 *
 * @prop {string[]} node Node id as Array of 6 bytes. Default: Randomly generated ID.
 * @prop {number} clockseq (Between 0 - 0x3fff) RFC clock sequence. Default: An internally maintained clockseq.
 * @prop {number} msecs Time in milliseconds since unix Epoch. Default: The current time.
 * @prop {number} nsecs (Between 0 - 9999) - Additional time, in 100-nanosecond units. Ignored if `msecs` is unspecified. Default: Internal UUID counter.
 */
