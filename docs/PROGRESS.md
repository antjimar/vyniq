# Progress Tracking - Migración UI

## Estado Actual: FASE 1 ✅ COMPLETADA

### ✅ Completado - Fase 1
- [x] Estructura básica de directorios
- [x] Configuración i18n (`useT()`)
- [x] TanStack Query setup
- [x] MSW básico para categories
- [x] Feature-sliced estructura inicial
- [x] Plan de migración documentado
- [x] **Migrar componentes UI base** a `src/ui/*`
  - [x] button.tsx - Con todas las variantes (default, destructive, outline, secondary, ghost, link)
  - [x] input.tsx - Con estilos number inputs y placeholders
  - [x] card.tsx - Sistema completo (Header, Title, Description, Content, Footer)
  - [x] badge.tsx - Variantes: default, secondary, destructive, outline
  - [x] dialog.tsx - Modal completo con Radix UI
  - [x] select.tsx - Select con Radix UI y scroll buttons
  - [x] table.tsx - Sistema completo de tabla
  - [x] form.tsx - Sistema de formularios con React Hook Form
  - [x] skeleton.tsx - Con shimmer effect
  - [x] alert.tsx - Variantes: default, destructive
  - [x] label.tsx - Label component con Radix UI
- [x] ESLint guardrails configuración
- [x] Re-exports temporales en `src/components/ui/`
- [x] UI playground básico
- [x] Verificación `npm run lint && npm run dev`

### 🚀 Lista para Commit
- Fase 1 completada exitosamente
- Todos los componentes UI migrados
- ESLint configurado con reglas restrictivas
- Build y desarrollo funcionando

---

## Próximos Pasos

1. **Completar Fase 1**: Migrar todos los componentes UI base
2. **Commit Fase 1**: "feat: migrate UI components to src/ui/* with feature-sliced design"
3. **Empezar Fase 2**: Componentes especializados (loading, empty states, toasts)

---

## Notas de Desarrollo

### Dependencias Actuales
- ✅ `clsx` + `tailwind-merge` instalados
- ✅ `@tanstack/react-query` + devtools instalados
- ✅ `zod` para schemas
- ✅ `msw` para mocking

### Dependencias Necesarias
- [ ] `class-variance-authority` (para variantes de componentes)
- [ ] `@radix-ui/*` componentes (dialog, select, etc.)
- [ ] `lucide-react` para iconos
- [ ] `react-hook-form` para formularios

### Estructura Target
```
src/
├── ui/                    # Design System puro
├── features/              # Features autocontenidas
│   └── <feature>/
│       ├── components/    # UI específica
│       ├── hooks/         # TanStack Query
│       ├── schemas/       # Zod contracts
│       ├── mocks/         # MSW handlers
│       └── services/      # Lógica de negocio
├── lib/                   # Utilidades compartidas
├── config/                # Configuración
└── messages/              # i18n
```

---

## Issues Conocidos
- [ ] Ninguno por ahora

## Decisiones Técnicas
- **UI Framework**: Tailwind CSS + Radix UI (mantener shadcn/ui approach)
- **Estado**: TanStack Query para server state, React state para UI
- **Validación**: Zod schemas por feature
- **Testing**: MSW para mocks, componentes UI con Storybook más adelante
- **i18n**: next-intl approach mantenido