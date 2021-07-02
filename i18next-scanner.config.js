const AVAILABLE_LANGS = [
  'en',
  'id',
  'fr',
  'de',
  'es',
  'ru',
  'zh',
  'ko',
  'hr',
  'uk',
  'sr',
  'ro',
  'it',
  'pt',
  'pl',
  'sl',
  'hi',
  'tr',
  'bg',
  'sv',
  'ja',
]

module.exports = {
  input: [
    'pages/*.{js,jsx}',
    'shared/components/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
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
    ns: [
      'index',
      'contribute',
      'donate',
      'download',
      'faq',
      'flip-challenge',
      'guide',
      'gitcoin',
      'join-idena',
    ],
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    keySeparator: false,
  },
}
