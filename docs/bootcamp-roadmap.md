# Personal Finance App - Bootcamp Roadmap

## 🎯 Objetivo General
Desarrollo fullstack de aplicación de finanzas personales con React/Next.js frontend y backend API, trabajando con datos reales desde el primer momento.

## 📚 Conocimientos Base Adquiridos
- ✅ Estructura mono-repo y separación frontend/backend
- ✅ Componentes React básicos y función/return
- ✅ useState hook y manejo de estado
- ✅ Props entre componentes padre-hijo
- ✅ Console.log debugging y breakpoints
- ✅ JSX y diferencias con SwiftUI
- ✅ SSR vs CSR en Next.js

---

## 🚀 FASE 1: Backend + Database Setup

### Objetivo: API funcional con datos reales
**Estimación:** 1-2 sesiones

### 1.1 Setup PostgreSQL con Docker
- [X] Docker Compose para PostgreSQL
- [X] Verificar conexión a base de datos
- [X] **Commit:** `feat: add PostgreSQL docker setup`

### 1.2 Modelo de datos simplificado
```sql
-- Tabla transactions simplificada (sin relaciones)
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  type VARCHAR(10) CHECK (type IN ('income', 'expense')),
  category VARCHAR(50), -- hardcodeado por ahora
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```
- [X] **Commit:** `feat: add simplified transaction model`

### 1.3 API Backend con Next.js
- [X] Setup Prisma ORM
- [X] API Routes en `apps/api/src/app/api/`
- [X] Endpoints básicos:
  - [X] `GET /api/transactions` - Listar todas
  - [X] `POST /api/transactions` - Crear nueva
  - [ ] `GET /api/transactions/[id]` - Obtener por ID
  - [ ] `PUT /api/transactions/[id]` - Actualizar
  - [ ] `DELETE /api/transactions/[id]` - Eliminar
- [ ] **Commit:** `feat: add transaction API endpoints`

### 1.4 Datos de prueba
- [ ] Script de seed con transacciones de ejemplo
- [ ] Al menos 10-15 transacciones variadas (ingresos/gastos)
- [ ] **Commit:** `feat: add transaction seed data`

### 1.5 Testing de API
- [ ] Probar endpoints con Postman/Thunder Client
- [ ] Verificar CRUD completo funciona
- [ ] **Commit:** `test: verify transaction API endpoints`

---

## 🎨 FASE 2: Frontend con Datos Reales

### Objetivo: UI que consume API real
**Estimación:** 1-2 sesiones

### 2.1 Tipos TypeScript compartidos
- [ ] Interface `Transaction` en `packages/shared-types`
- [ ] Exportar tipos para frontend y backend
- [ ] **Commit:** `feat: add shared TypeScript transaction types`

### 2.2 Componente TransactionItem
- [ ] Props basadas en modelo Transaction
- [ ] Renderizado básico de datos (amount, description, date, type)
- [ ] Styling básico con Tailwind
- [ ] **Commit:** `feat: add TransactionItem component`

### 2.3 Lista de Transacciones
- [ ] Componente `TransactionList`
- [ ] Uso de `.map()` para renderizar múltiples items
- [ ] Estados de loading/error
- [ ] **Commit:** `feat: add TransactionList component`

### 2.4 Integración con API
- [ ] Hook personalizado `useTransactions`
- [ ] Fetch de datos reales desde `/api/transactions`
- [ ] Manejo de estados async (loading, success, error)
- [ ] **Commit:** `feat: integrate frontend with transaction API`

---

## 🔗 FASE 3: CRUD Completo End-to-End

### Objetivo: Funcionalidad completa create/read/update/delete
**Estimación:** 2-3 sesiones

### 3.1 Crear Transacciones
- [ ] Formulario `AddTransactionForm`
- [ ] Validación frontend
- [ ] POST a API
- [ ] Actualización de lista tras crear
- [ ] **Commit:** `feat: add create transaction functionality`

### 3.2 Editar Transacciones
- [ ] Modal/forma de edición
- [ ] PUT a API
- [ ] Actualización optimista de UI
- [ ] **Commit:** `feat: add edit transaction functionality`

### 3.3 Eliminar Transacciones
- [ ] Confirmación antes de eliminar
- [ ] DELETE a API
- [ ] Eliminación de UI inmediata
- [ ] **Commit:** `feat: add delete transaction functionality`

### 3.4 Manejo de Errores
- [ ] Error boundaries en React
- [ ] Mensajes de error user-friendly
- [ ] Retry automático en fallos de red
- [ ] **Commit:** `feat: add comprehensive error handling`

---

## 📈 FASE 4: Features Avanzadas (Futuro)

### Funcionalidades a implementar posteriormente:
- [ ] Filtros y búsqueda de transacciones
- [ ] Paginación
- [ ] Autenticación y usuarios
- [ ] Categorías como entidades relacionadas
- [ ] Dashboard con métricas
- [ ] Exportar datos
- [ ] PWA y offline support

---

## 🎯 Criterios de Éxito por Fase

**Fase 1 Completa cuando:**
- PostgreSQL corriendo en Docker
- API responde correctamente a todos los endpoints
- Base de datos tiene datos de prueba

**Fase 2 Completa cuando:**
- Frontend muestra lista de transacciones reales
- Debugging funcional en navegador
- No hay errores de TypeScript

**Fase 3 Completa cuando:**
- Puedes crear, leer, actualizar y eliminar transacciones
- UI se actualiza correctamente tras cada operación
- Manejo básico de errores implementado

---

## 📝 Notas de Aprendizaje

### Conceptos React por cubrir según surjan:
- useEffect para efectos secundarios
- Custom hooks para lógica reutilizable
- Context API para estado global
- Error boundaries
- Performance optimization (React.memo, useMemo)

### Conceptos Backend por cubrir:
- Validación de datos con Zod
- Middleware de autenticación
- Rate limiting
- Logging
- Testing de APIs

---

*Última actualización: [Fecha de sesión]*
*Próxima sesión: FASE 1.1 - Setup PostgreSQL con Docker*