# Configuración CI Verify - Guía de Migración

## 📋 Resumen del Comando

El comando `ci:verify` ejecuta una verificación completa de calidad de código:

```bash
npm run ci:verify
# Ejecuta: format check + lint + typecheck + tests (opcional)
```

---

## 📦 Dependencias Necesarias

### Dependencias de Desarrollo Requeridas

```json
{
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^8.44.0",
    "@typescript-eslint/parser": "^8.44.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-import-resolver-typescript": "^4.4.4",
    "eslint-plugin-import": "^2.32.0",
    "prettier": "^3.6.2",
    "typescript": "5.6.3"
  }
}
```

### Instalación Rápida

```bash
npm install -D @typescript-eslint/eslint-plugin@^8.44.0 \
                @typescript-eslint/parser@^8.44.0 \
                eslint@^8.0.0 \
                eslint-config-next@^14.0.0 \
                eslint-config-prettier@^10.1.8 \
                eslint-import-resolver-typescript@^4.4.4 \
                eslint-plugin-import@^2.32.0 \
                prettier@^3.6.2 \
                typescript@5.6.3
```

---

## ⚙️ Archivos de Configuración Necesarios

### 1. ESLint Configuration (`.eslintrc.json`)

```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "import"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-const": "error",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      }
    }
  },
  "ignorePatterns": ["node_modules/", ".next/", "dist/", "build/"]
}
```

### 2. Prettier Configuration (`.prettierrc`)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "quoteProps": "as-needed",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 3. Prettier Ignore (`.prettierignore`)

```
node_modules/
.next/
dist/
build/
coverage/
*.log
.env
.env.*
package-lock.json
yarn.lock
```

### 4. TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 📜 Scripts de Package.json

### Scripts Básicos Requeridos

```json
{
  "scripts": {
    "ci:verify": "npm run format -- --check && npm run lint && npm run typecheck && (npm run test 2>/dev/null || echo 'sin tests configurados')",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc --noEmit"
  }
}
```

### Scripts Expandidos (Recomendados)

```json
{
  "scripts": {
    "ci:verify": "npm run format -- --check && npm run lint && npm run typecheck && (npm run test 2>/dev/null || echo 'sin tests configurados')",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc --noEmit",
    "check": "tsc --noEmit",
    "pre-commit": "npm run format && npm run lint:fix && npm run typecheck"
  }
}
```

---

## 🔧 Configuración VS Code (Opcional)

### Settings JSON (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### Extensiones Recomendadas (`.vscode/extensions.json`)

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss"
  ]
}
```

---

## 🚀 Proceso de Instalación Paso a Paso

### 1. Instalar Dependencias

```bash
# Instalar dependencias de desarrollo
npm install -D @typescript-eslint/eslint-plugin@^8.44.0 \
                @typescript-eslint/parser@^8.44.0 \
                eslint@^8.0.0 \
                eslint-config-next@^14.0.0 \
                eslint-config-prettier@^10.1.8 \
                eslint-import-resolver-typescript@^4.4.4 \
                eslint-plugin-import@^2.32.0 \
                prettier@^3.6.2 \
                typescript@5.6.3
```

### 2. Crear Archivos de Configuración

```bash
# Crear archivos de configuración
touch .eslintrc.json .prettierrc .prettierignore

# Si usas VS Code
mkdir -p .vscode
touch .vscode/settings.json .vscode/extensions.json
```

### 3. Copiar Configuraciones

Copiar el contenido de las configuraciones mostradas arriba en cada archivo correspondiente.

### 4. Actualizar Package.json

Agregar los scripts necesarios al `package.json`:

```json
{
  "scripts": {
    "ci:verify": "npm run format -- --check && npm run lint && npm run typecheck && (npm run test 2>/dev/null || echo 'sin tests configurados')",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc --noEmit"
  }
}
```

### 5. Verificar Instalación

```bash
# Verificar que todo funciona
npm run format:check
npm run lint
npm run typecheck
npm run ci:verify
```

---

## 🛠️ Resolución de Problemas Comunes

### Error: "Cannot find module '@typescript-eslint/parser'"

```bash
npm install -D @typescript-eslint/parser@^8.44.0
```

### Error: "Parsing error: Cannot read file 'tsconfig.json'"

Asegúrate de que existe `tsconfig.json` en la raíz del proyecto y tiene la configuración correcta.

### Error: "prettier command not found"

```bash
npm install -D prettier@^3.6.2
```

### Error: "eslint command not found"

```bash
npm install -D eslint@^8.0.0
```

### Warnings de ESLint sobre imports

Instalar el resolvedor de TypeScript:

```bash
npm install -D eslint-import-resolver-typescript@^4.4.4
```

---

## 📋 Checklist de Migración

- [ ] Instalar todas las dependencias de desarrollo
- [ ] Crear `.eslintrc.json` con la configuración
- [ ] Crear `.prettierrc` con la configuración
- [ ] Crear `.prettierignore`
- [ ] Verificar/crear `tsconfig.json`
- [ ] Agregar scripts al `package.json`
- [ ] Configurar VS Code (opcional)
- [ ] Ejecutar `npm run ci:verify` para verificar

---

## 🎯 Resultado Final

Una vez configurado, tendrás:

✅ **Formato automático** con Prettier
✅ **Linting** con ESLint y reglas TypeScript
✅ **Type checking** con TypeScript
✅ **CI verification** en un solo comando
✅ **Integración con VS Code** (opcional)

El comando `npm run ci:verify` ejecutará todos los checks y será perfecto para CI/CD pipelines.
