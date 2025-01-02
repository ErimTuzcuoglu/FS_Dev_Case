module.exports = {
  files: ['**/*.js'],
  languageOptions: {
    ecmaVersion: 12, // ES12/ES2021
    sourceType: 'module', // for ESM 'module' option
    globals: {
      console: 'readonly',
      process: 'readonly',
      require: 'readonly',
      module: 'readonly',
      __dirname: 'readonly',
    },
  },
  rules: {
    // Project specific rules
    'no-console': 'off', // allow console usage
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Show warning for non-used variables
    'semi': ['error', 'always'], // semicolon mandatory
    'quotes': ['error', 'single'], // single quote mandatory
    'indent': ['error', 2], // 2 indent mandatory
    'comma-dangle': ['error', 'always-multiline'], // multiline comma mandatory
  },
};

