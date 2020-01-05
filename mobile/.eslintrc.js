module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    env: {
        browser: true,
        jest: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        '@typescript-eslint/camelcase': 0,
        'react/jsx-no-target-blank': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/explicit-function-return-type': 0
    },
    settings: {
        react: {
            version: '16'
        }
    }
};
