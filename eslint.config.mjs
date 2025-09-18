import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    // UI components guardrails - prevent business logic imports
    files: ["src/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "../features/**",
                "../../features/**",
                "../../../features/**",
              ],
              message:
                "UI components must not import from features. UI must be presentational-only.",
            },
            {
              group: ["../app/**", "../../app/**", "../../../app/**"],
              message:
                "UI components must not import from app directory. UI must be presentational-only.",
            },
            {
              group: ["../server/**", "../../server/**", "../../../server/**"],
              message:
                "UI components must not import from server code. UI must be presentational-only.",
            },
            {
              group: ["@/features/**"],
              message:
                "UI components must not import from features. UI must be presentational-only.",
            },
            {
              group: ["@/app/**"],
              message:
                "UI components must not import from app directory. UI must be presentational-only.",
            },
            {
              group: ["@/server/**"],
              message:
                "UI components must not import from server code. UI must be presentational-only.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
