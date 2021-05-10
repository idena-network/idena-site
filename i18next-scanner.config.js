const AVAILABLE_LANGS = ['en']

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
    ns: ['error', 'index', 'faq'],
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    keySeparator: false,
  },
}
