module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    ignorePatterns: ['package.js', 'package-lock.json', '*.spec.ts'],
    plugins: ['@typescript-eslint/eslint-plugin', 'promise', 'unused-imports'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:promise/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/no-floating-promises': 'warn',
        // 'unused-imports/no-unused-imports': 'error',
        'no-dupe-args': 'error',
        eqeqeq: 'error',
        'max-lines': [
            'error',
            {
                max: 200,
                skipBlankLines: true,
                skipComments: true,
            },
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['camelCase'],
                prefix: ['I'],
            },
            {
                selector: 'variable',
                modifiers: ['const'],
                format: ['camelCase', 'UPPER_CASE', 'CamelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: ['function', 'classMethod'],
                modifiers: ['const'],
                format: ['camelCase'],
                trailingUnderscore: 'allow',
            },
        ],
        'no-empty': 'error',
        'no-cond-assign': 'error',
        'no-unreachable-loop': 'error',
        'unused-imports/no-unused-imports': 'error',
        'no-use-before-define': [
            'error',
            {
                functions: true,
                classes: true,
                variables: true,
                allowNamedExports: false,
            },
        ],
        'require-atomic-updates': 'warn',
        'use-isnan': [
            'error',
            {
                enforceForSwitchCase: false,
            },
        ],
        camelcase: 'error',
        'max-lines': [
            'error',
            {
                max: 150,
                skipBlankLines: true,
                skipComments: true,
            },
        ],
        'max-lines': [
            'warn',
            {
                max: 120,
                skipBlankLines: true,
                skipComments: true,
            },
        ],
        'no-console': 'error',
        'no-empty': 'error',
        'no-extra-semi': 'error',
        'no-implied-eval': 'error',
        'no-inline-comments': 'warn',
        'no-lonely-if': 'warn',
        'no-undefined': 'error',
        'no-useless-catch': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'lines-between-class-members': 'error',
        'promise/no-return-wrap': 'error',
        'promise/no-nesting': 'error',
        'require-jsdoc': [
            'error',
            {
                require: {
                    FunctionDeclaration: false,
                    MethodDefinition: false,
                    ClassDeclaration: false,
                    ArrowFunctionExpression: false,
                    FunctionExpression: false,
                },
            },
        ],
    },
};
