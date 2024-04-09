/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  plugins: ['only-warn'],
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['*'],
      rules: {
        'plugin:vue/vue3-recommended': 'off',
        'plugin:vue/recommended': 'off',
        'vue3/attributes-order': 'off',
        'vue/attributes-order': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-prototype-builtins': 'off',
        'array-callback-return': 'off',
        'import/no-named-as-default': 'off',
        'eol-last': 'off',
        'vue/require-default-prop': 'off',
        'vue/html-self-closing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/component-definition-name-casing': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'import/order': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-indent': ['error', 2, {}],
        indent: ['error', 2, {}],
        'vue/component-name-in-template-casing': ['error', 'kebab-case', {}],
        'vue/no-multiple-template-root': 'off',
      },
    },
  ],
};
