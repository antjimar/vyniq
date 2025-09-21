# Sesión 1: React Basics & Project Setup

**Fecha:** [Primera sesión]  
**Duración:** ~2 horas  
**Objetivo:** Entender fundamentos de React y setup inicial del proyecto

---

## 🎯 Lo que aprendimos hoy

### 1. Arquitectura del Proyecto (Mono-repo)
**Estructura creada:**
```
personal-finance-app/
├── apps/
│   ├── web/          # Frontend Next.js + React
│   └── api/          # Backend Next.js API Routes
├── packages/
│   ├── shared-types/ # TypeScript types compartidos
│   ├── database/     # Schema y migraciones
│   └── ui/          # Componentes UI reutilizables
└── docs/
```

**Herramientas:** `concurrently` para ejecutar frontend y backend simultáneamente.

### 2. Conceptos React Fundamentales

#### Componentes = Funciones
**Conexión SwiftUI → React:**
```swift
// SwiftUI
struct MyView: View {
    var body: some View {
        Text("Hola")
    }
}
```

```tsx
// React
export default function MyComponent() {
    return <p>Hola</p>
}
```

#### JSX vs SwiftUI
- **JSX:** JavaScript + HTML-like syntax
- **Similitud:** Ambos son declarativos
- **Diferencia clave:** JSX requiere un elemento padre

```tsx
// ❌ Error: múltiples elementos
return (
    <p>Hola</p>
    <p>Mundo</p>
)

// ✅ Correcto: elemento padre
return (
    <div>
        <p>Hola</p>
        <p>Mundo</p>
    </div>
)

// ✅ Alternativa: Fragment
return (
    <>
        <p>Hola</p>
        <p>Mundo</p>
    </>
)
```

#### Estado: useState Hook
**Conexión SwiftUI → React:**
```swift
// SwiftUI
@State private var counter = 0
// Cambiar: counter += 1
```

```tsx
// React
const [counter, setCounter] = useState(0);
// Cambiar: setCounter(counter + 1)
```

**Diferencias clave:**
- React es **inmutable** (no modificas directamente)
- useState retorna **array** [valor, función]
- Usar **destructuring assignment** (tuplas en Swift)

#### Props = Parámetros del inicializador
```swift
// SwiftUI
TransactionRowView(transaction: transaction, onTap: { /* closure */ })
```

```tsx
// React (próxima sesión)
<TransactionItem transaction={transaction} onTap={() => { /* función */ }} />
```

### 3. Ciclo de Vida y Re-renderizado

#### Descubrimiento importante: React re-ejecuta la función completa
- **SwiftUI:** También re-ejecuta todo el `body`
- **React:** Re-ejecuta toda la función del componente
- **Cuándo:** Cada cambio de estado trigger re-render

#### Console.log y Debugging
```tsx
export default function Home() {
  console.log("Componente ejecutándose"); // Se ejecuta en cada render
  
  const [counter, setCounter] = useState(0);
  
  return (
    <div>
      <p>Contador: {counter}</p>
      <button onClick={() => {
        console.log("Click detectado!"); // Solo en clicks
        setCounter(counter + 1);
      }}>
        Incrementar
      </button>
    </div>
  );
}
```

**Observaciones del debugging:**
- Los logs aparecen **duplicados en desarrollo** (React Strict Mode)
- **Carga inicial:** Servidor (1x) + Navegador (2x)
- **Interacciones:** Solo navegador (2x)

### 4. Server-Side Rendering (SSR) vs Client-Side

#### `"use client"` Directive
**Por qué necesario:**
- Next.js intenta renderizar en servidor por defecto
- `useState` y interactividad requieren navegador
- Solución: `"use client"` en primera línea

```tsx
"use client"
import { useState } from "react";
// resto del componente...
```

#### Seguridad en Frontend vs Backend
**Regla fundamental:** Todo el código React es **visible al usuario**
- ✅ **Frontend:** UI, interacciones, validaciones UX
- ✅ **Backend:** Lógica de negocio, autenticación, datos sensibles
- ❌ **Nunca en frontend:** API keys, algoritmos críticos, validaciones de seguridad

### 5. Custom Hooks (Avanzado)

#### Encapsulación de lógica de estado
```tsx
// Custom hook
function useCalculator(initialValue = 0) {
  const [value, setValue] = useState(initialValue);
  
  const add = (amount) => setValue(value + amount);
  const multiply = (factor) => setValue(value * factor);
  const reset = () => setValue(initialValue);
  
  return { value, add, multiply, reset };
}

// Uso
function MyComponent() {
  const calculator = useCalculator(10);
  
  return (
    <div>
      <p>Valor: {calculator.value}</p>
      <button onClick={() => calculator.add(5)}>+5</button>
    </div>
  );
}
```

---

## 🔧 Setup Técnico Realizado

### Herramientas instaladas:
- **Node.js** workspace con npm workspaces
- **Next.js** para frontend y backend
- **TypeScript** configurado
- **Tailwind CSS** para styling
- **ESLint** para calidad de código
- **Concurrently** para desarrollo

### Comandos útiles:
```bash
npm run dev          # Ambos servidores
npm run dev:web      # Solo frontend
npm run dev:api      # Solo backend
```

---

## 🐛 Errores Encontrados y Soluciones

### 1. JSX múltiples elementos
**Error:** `JSX expressions must have one parent element`  
**Solución:** Envolver en `<div>` o usar Fragment `<>`

### 2. useState en componente servidor
**Error:** `You're importing a component that needs useState`  
**Solución:** Añadir `"use client"` al inicio del archivo

### 3. Console.log duplicados
**Explicación:** React Strict Mode en desarrollo ejecuta componentes 2x  
**Normal:** Solo en desarrollo, en producción se ejecuta 1x

---

## 💡 Conexiones Clave SwiftUI ↔ React

| Concepto | SwiftUI | React |
|----------|---------|-------|
| Vista/Componente | `struct View` | `function Component()` |
| Estado | `@State` | `useState` |
| Parámetros | `init(param:)` | `props` |
| Renderizado | `var body` | `return JSX` |
| Modificar estado | `variable = valor` | `setState(valor)` |
| Ciclo de vida | `onAppear` | `useEffect` (próxima sesión) |

---

## 📚 Conceptos para Próximas Sesiones

### React concepts pendientes:
- [ ] **useEffect** para efectos secundarios (API calls)
- [ ] **Props** en detalle con interfaces TypeScript
- [ ] **Error boundaries** para manejo de errores
- [ ] **Custom hooks** para lógica reutilizable
- [ ] **Context API** para estado global

### Backend concepts:
- [ ] **Docker** y PostgreSQL setup
- [ ] **Prisma ORM** para database
- [ ] **API Routes** en Next.js
- [ ] **CRUD operations** 
- [ ] **Error handling** en APIs

---

## 🎯 Commits Realizados

1. `feat: initial project structure with mono-repo setup`
2. `docs: add comprehensive bootcamp roadmap for fullstack development`

---

## 📝 Notas Personales

### Lo que más me costó entender:
- [ ] Destructuring assignment en useState
- [ ] Por qué JSX necesita elemento padre
- [ ] Diferencia entre servidor y cliente en Next.js

### Lo que conecté fácilmente con SwiftUI:
- [x] Componentes como funciones
- [x] Estado y re-renderizado
- [x] Estructura declarativa

---

**Próxima sesión:** FASE 1.1 - Setup PostgreSQL con Docker