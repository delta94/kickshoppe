module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    // ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    // sourceType: "module", // Allows for the use of imports
    // ecmaFeatures: {
    //   jsx: true // Allows for the parsing of JSX
    // },
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier', 'react'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-absolute-path': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  env: {
    es6: true,
    node: true,
  },
};
