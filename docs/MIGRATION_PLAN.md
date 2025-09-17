# Plan de Migración UI → Feature-Sliced Design

## Objetivo
Migrar la aplicación Vyniq desde una arquitectura monolítica a Feature-Sliced Design manteniendo **exactamente** el mismo look&feel visual.

## Fases de Implementación

### ✅ FASE 1: Design System Base
**Estado**: 🟡 En progreso
**Objetivo**: Extraer y consolidar el design system en `src/ui/*`

#### Tareas
- [x] Mantener `tailwind.config.ts` y `src/app/globals.css`
- [x] Mantener `src/lib/utils.ts` con `cn()`
- [ ] Migrar componentes UI base a `src/ui/*`
- [ ] Configurar ESLint guardrails
- [ ] Crear re-exports temporales
- [ ] Crear UI playground

#### Componentes a migrar
- `src/ui/button.tsx` - Variantes: default, destructive, outline, secondary, ghost, link
- `src/ui/input.tsx` - Con estilos number inputs y placeholders
- `src/ui/card.tsx` - Sistema completo (Header, Title, Description, Content, Footer)
- `src/ui/badge.tsx` - Variantes: default, secondary, destructive, outline
- `src/ui/dialog.tsx` - Modal completo con Radix UI
- `src/ui/select.tsx` - Select con Radix UI y scroll buttons
- `src/ui/table.tsx` - Sistema completo de tabla
- `src/ui/form.tsx` - Sistema de formularios con React Hook Form
- `src/ui/skeleton.tsx` - Con shimmer effect
- `src/ui/alert.tsx` - Variantes: default, destructive

---

### ⏳ FASE 2: Componentes Especializados
**Estado**: 🔴 Pendiente
**Objetivo**: Migrar componentes de loading, empty states y toasts

#### Componentes
- `src/ui/loading-states.tsx`
- `src/ui/skeleton-loaders.tsx`
- `src/ui/empty-states.tsx`
- `src/ui/toast.tsx`
- `src/ui/confirmation-modal.tsx`
- `src/lib/notifications.ts`

---

### ⏳ FASE 3: Features Core
**Estado**: 🔴 Pendiente
**Objetivo**: Implementar features básicas con nueva arquitectura

#### Features
- `src/features/categories/`
- `src/features/workspaces/`
- `src/features/shell/` (navegación)

---

### ⏳ FASE 4-5: Features Principales
**Estado**: 🔴 Pendiente
**Objetivo**: Migrar features principales

#### Features
- `src/features/transactions/` (income/expenses)
- `src/features/budgets/`
- `src/features/balances/`
- `src/features/investments/`
- `src/features/finhero/`
- `src/features/finmind/`

---

### ⏳ FASE 6: Integración Final
**Estado**: 🔴 Pendiente
**Objetivo**: Integración completa y testing

#### Tareas
- Setup MSW completo
- Layout updates
- UI Playground completo
- Testing end-to-end

## Criterios de Éxito

- ✅ **Visual**: UI idéntica al proyecto original
- ✅ **Arquitectura**: Feature-sliced design implementado
- ✅ **ESLint**: Reglas que impiden imports prohibidos
- ✅ **Compilación**: `npm run lint && npm run dev` sin errores
- ✅ **Funcionalidad**: Todas las features funcionando con mocks

## Reglas de Desarrollo

1. **Zero cambios visuales** - La UI debe ser pixel-perfect
2. **Componentes puros** - `src/ui/*` sin lógica de negocio
3. **Feature-sliced** - Cada feature autocontenida
4. **Commits pequeños** - Una fase = un commit
5. **MSW first** - Desarrollar contra API fake

## Comandos de Verificación

```bash
npm run lint          # ESLint must pass
npm run typecheck     # TypeScript must pass
npm run dev           # App must start
```

Navegar a: `/es/(app)/ui-playground` para testing visual