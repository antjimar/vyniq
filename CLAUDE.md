# Claude Development Notes

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia desarrollo con --turbopack
npm run build            # Build producción
npm run lint             # ESLint check
npm run typecheck        # TypeScript check (cuando esté configurado)

# Testing
npm test                 # Tests (cuando estén configurados)
```

## Estructura del Proyecto

```
src/
├── ui/                  # Design System (componentes puros)
├── features/            # Features con feature-sliced design
│   └── <feature>/
│       ├── components/  # UI específica del feature
│       ├── hooks/       # TanStack Query hooks
│       ├── schemas/     # Zod contracts
│       ├── mocks/       # MSW handlers
│       └── services/    # Lógica de negocio
├── lib/                 # Utilidades compartidas
├── config/              # Configuración app
├── messages/            # i18n (en.json, es.json)
└── app/                 # Next.js App Router
    └── [locale]/
        └── (app)/       # App principal
```

## Reglas de Arquitectura

1. **src/ui/\*** - Solo componentes presentacionales, sin lógica de negocio
2. **src/features/\*** - Autocontenidos, pueden importar de ui/ y lib/
3. **components/** - NO pueden importar services/** ni repo/**
4. **ESLint rules** - Previenen imports prohibidos

## Estado de Migración

**Fase Actual**: 1 - Design System Base

**Próximo**: Migrar componentes UI base desde el análisis en `docs/VYNIQ_UI_COMPONENTS_DOCUMENTATION.md`

## Dependencias Principales

- Next.js 15 + React 19
- Tailwind CSS v4
- TanStack Query v5
- Zod v4
- MSW v2
- Radix UI (para componentes)
- Lucide React (iconos)

## Tokens de Diseño

Los design tokens están en:

- `src/app/globals.css` - CSS variables
- `tailwind.config.ts` - Configuración Tailwind

Colores principales:

- Primary: `hsl(203.8863 88.2845% 53.1373%)` (azul Vyniq)
- Destructive: `hsl(356.3033 90.5579% 54.3137%)` (rojo)
- Border radius personalizado: 6px, 8px
- Fuentes: Open Sans, Georgia, Menlo

## URLs de Testing

- `/es/(app)/ui-playground` - Playground de componentes UI
- `/es/(app)/dashboard` - Dashboard principal (cuando esté)
- `/es/(app)/income` - Gestión de ingresos
- `/es/(app)/expenses` - Gestión de gastos

## Notas para Próximas Sesiones

1. **Instalar dependencias faltantes**:
   - `class-variance-authority`
   - `@radix-ui/react-*` componentes
   - `lucide-react`
   - `react-hook-form`

2. **Migrar componentes UI**: Usar el análisis completo del documento para extraer exactamente los mismos estilos

3. **ESLint rules**: Configurar reglas restrictivas para src/ui/\*

4. **Testing**: Crear playground para verificar que todo funciona visualmente igual
