module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react-hooks/recommended", "plugin:react/recommended", "google", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "require-jsdoc": 0,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: ["case", "default", "export", "function", "return"]
      },
      {
        blankLine: "always",
        prev: "singleline-const",
        next: "multiline-const"
      },
      {
        blankLine: "always",
        prev: ["block-like", "multiline-const"],
        next: "*"
      }
    ],
    "new-cap": 0
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
};
