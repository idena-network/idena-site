const AVAILABLE_LANGS = ['en, de']

module.exports = {
  input: ['pages/*.{js,jsx}', '!**/node_modules/**', '!**/dist/**'],
  output: './',
  options: {
    debug: true,
    // trans: false,
    func: {
      list: ['t'],
      extensions: ['.js', '.jsx'],
    },
    lngs: AVAILABLE_LANGS,
    defaultNs: 'common',
    defaultValue(_lng, _ns, key, options) {
      return options.defaultValue || key
    },
    ns: ['index', 'contribute', 'donate', 'download', 'faq', 'flip-challenge', 'guide'],
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    keySeparator: false,
  },
}
