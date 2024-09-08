import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.browser
            }
        }
    },
    {
        rules: {
            "semi": "error",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["error", { "args": "none", "varsIgnorePattern": "^__", "caughtErrors": "none" }],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-object-type": "off"
        }
    },
    {
        rules: {
            "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }],
            "@typescript-eslint/explicit-member-accessibility": ["error", { "overrides": { "constructors": "no-public", "accessors": "no-public" } }]
        },
        files: [
            "**/*.ts"
        ]
    },
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "deploy/**",
            "cache/**",
            "languages/**",
            ".editor/**",
            "assets/**",
            "static/**"
        ]
    }
];