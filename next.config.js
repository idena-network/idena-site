const withFonts = require('nextjs-fonts')
const path = require('path')
const {i18n} = require('./next-i18next.config')

module.exports = withFonts({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n,
  env: {
    TWITTER_MINIMUM_SUBS_COUNT: process.env.TWITTER_MINIMUM_SUBS_COUNT,
  },
})
