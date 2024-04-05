module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "tsconfig.json",
        tsconfigRootDir: __dirname
    },
    env: {
        browser: true
    },
    globals: {
    },
    plugins: [
        "deprecation",
        "@typescript-eslint/eslint-plugin"
    ],
    extends: [
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "semi": "error",
        "no-unused-vars": "off",
        "deprecation/deprecation": "error",
        "import/extensions": ["error", "always"],
        "import/no-unresolved": "off",
        "import/no-duplicates": "off",
        "@typescript-eslint/no-unused-vars": ["error", { "args": "none", "varsIgnorePattern": "^__" }],
        "@typescript-eslint/no-explicit-any": "off"
    },
    ignorePatterns: [
        "/dev",
        "/assets",
        "/static",
        "/node_modules",
        "/deploy",
        "/cache",
        "/languages",
        "/.editor",
        "/.eslintrc.cjs"
    ],
    overrides: [
        {
            "files": ["*.ts"],
            "rules": {
                "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }]
            }
        }
    ]
};