module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    extends: [
        'eslint-config-react-app',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/typescript',
    ],
    rules: {
        'no-unused-expressions': 'warn',
        'no-unused-vars': 'off',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'after-used',
                argsIgnorePattern: '(^_)|(^props$)',
                varsIgnorePattern: '(^_)|(^props$)',
                ignoreRestSiblings: true,
            },
        ],

        // react
        'no-param-reassign': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/display-name': 'warn',
        'react/prop-types': 'off',
        'react/no-children-prop': 'off',
        'react/jsx-no-undef': ['error', { allowGlobals: true }],

        // React hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
    },
};
