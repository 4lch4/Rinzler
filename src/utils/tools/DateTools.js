const moment = require('moment-timezone')
const DISCORD_EPOCH = 1420070400000
const config = require('../config')

const DEFAULT_DATE_FORMAT = 'MM.DD.Y @ HH:mm:ss'
const PRETTY_DATE_FORMAT = 'MM/DD/Y HH:mm:ss'

module.exports = class DateTools {
  formatTime (format) {
    return moment.tz(config.defaultTimezone).format(format)
  }

  timestampFromSnowflake (snowflake) {
    return (snowflake / 4194304) + DISCORD_EPOCH
  }

  prettierUnixInput (input) {
    return moment(input).tz(config.defaultTimezone).format('MMMM Do, Y @ HH:mm:ss')
  }

  customFormatUnixInput (input, format) {
    return moment(input).tz(config.defaultTimezone).format(format)
  }

  formatUnixInput (input) {
    return moment(input).tz(config.defaultTimezone).format(PRETTY_DATE_FORMAT)
  }

  formatUTCTime (format) {
    return moment.tz(config.defaultTimezone).format(format)
  }

  get shortLogDate () {
    return moment.tz(config.defaultTimezone).format('Y-MM-DD')
  }

  get shortUTCTime () {
    return moment.tz(config.defaultTimezone).format('HH:mm:ss.SS')
  }

  get formattedTime () {
    return moment.tz(config.defaultTimezone).format(DEFAULT_DATE_FORMAT)
  }

  get utcTime () {
    return moment.tz(config.defaultTimezone).format()
  }

  get formattedUTCTime () {
    return moment.tz(config.defaultTimezone).format(DEFAULT_DATE_FORMAT)
  }

  get safeFormattedTime () {
    return moment.tz(config.defaultTimezone).format('MM.DD.Y_HH:mm:ss')
  }
}
