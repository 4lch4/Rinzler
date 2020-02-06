const TStats = require('../models/TronStats')
const DBBase = require('../DBBase')
const uuid = require('uuid/v4')

class TronStats extends DBBase {
  async saveStartupTime (startupTime) {
    return TStats(this.connection).Tron.updateOne({ _id: 'gStats' }, {
      startup: startupTime,
      $inc: { restarts: 1 }
    })
  }

  async incrementCmdUsage (cmdName) {
    return new Promise((resolve, reject) => {
      const Global = TStats(this.connection).Global

      Global.findOne({ name: cmdName }, (err, res) => {
        if (err) reject(err)
        else if (res) {
          resolve(Global.updateOne({ name: cmdName }, { $inc: { uses: 1 } }))
        } else {
          resolve(Global.create({ _id: uuid(), name: cmdName, uses: 1 }))
        }
      })
    })
  }
}

module.exports = TronStats
