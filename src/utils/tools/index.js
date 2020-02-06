const RedditTools = require('./RedditTools')
const DateTools = require('./DateTools')
const MiscTools = require('./MiscTools')

module.exports = {
  DateTools: new DateTools(),
  MiscTools: new MiscTools(),
  RedditTools: new RedditTools()
}
