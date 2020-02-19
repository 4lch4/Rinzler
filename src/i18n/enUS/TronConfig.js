module.exports = {
  Messages: {
    InitializeReply: "thank you for your interest in Tron! Let's get the initial configuration out of the way. There's only a couple settings to address and then you'll be on your way :grin:",
    InitializeZeroArgsReply: 'Which setting would you like to modify?'
  },
  Errors: {
    InitializeConfigExists: 'This server already has an initial configuration. If you would like to change individual settings, you can use `+tconfig <setting_name> <setting_value>` to modify it.',
    InvalidSettingName: 'Please provide a valid setting name. For a list of available settings, please use `+tconfig list`.',
    UnexpectedError: 'unfortunately it appears I have encountered an unexpected error. This incident has been logged and will hopefully be fixed soon. If not, please reach out to @4lch4#0042.'
  }
}