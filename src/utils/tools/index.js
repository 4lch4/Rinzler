const RedditTools = require('./RedditTools')
const DateTools = require('./DateTools')
const MiscTools = require('./MiscTools')
const IOTools = require('./IOTools')

module.exports = {
  DateTools: new DateTools(),
  MiscTools: new MiscTools(),
  RedditTools: new RedditTools(),
  IOTools: new IOTools()
}
