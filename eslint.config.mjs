import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Arquivos gerados pelo CLI do shadcn, regenerados a cada `npx shadcn add`
    // — corrigir à mão aqui seria desfeito na próxima geração. use-mobile.ts
    // vem junto com o bloco da sidebar. A regra é de estilo do React e não
    // afeta o comportamento, então vale como aviso nesses arquivos e continua
    // erro no código que é nosso.
    files: ["src/components/ui/**", "src/hooks/use-mobile.ts"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
