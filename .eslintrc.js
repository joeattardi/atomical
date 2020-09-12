module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended']
};
