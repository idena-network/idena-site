const withFonts = require('nextjs-fonts')
const path = require('path')
const {i18n} = require('./next-i18next.config')

module.exports = withFonts({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n,
})
