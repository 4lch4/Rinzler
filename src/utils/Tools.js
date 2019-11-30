const DateTools = require('./DateTools')
const MiscTools = require('./MiscTools')

module.exports = class Tools {
  get DateTools () { return new DateTools() }
  get MiscTools () { return new MiscTools() }
}
