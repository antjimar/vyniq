# Sesión 2: Backend Setup & Complete API Development

**Fecha:** [Segunda sesión]  
**Duración:** ~2.5 horas  
**Objetivo:** Setup completo de PostgreSQL + API con sistema de papelera

---

## 🎯 Lo que aprendimos hoy

### 1. Docker & PostgreSQL Setup

#### Configuración con docker-compose.yml
**Estructura creada:**
```yaml
services:
  postgres:
    image: postgres:15
    container_name: vyniq-db
    environment:
      POSTGRES_USER: vyniq_user
      POSTGRES_PASSWORD: vyniq_password
      POSTGRES_DB: vyniq
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

**Parámetros de conexión identificados:**
- Host: localhost
- Puerto: 5432
- Usuario: vyniq_user
- Contraseña: vyniq_password
- Base de datos: vyniq

#### Estrategia de desarrollo sin migraciones
**Proceso de reseteo para desarrollo:**
```bash
# 1. Parar y eliminar contenedores + volúmenes
docker-compose down -v

# 2. Recrear PostgreSQL
docker-compose up -d

# 3. Sincronizar schema (sin migraciones)
npx prisma db push

# 4. Ejecutar seed
npx tsx prisma/seed-simple.ts
```

**Ventajas del approach:**
- No acumular migraciones innecesarias en desarrollo
- Schema siempre limpio y actualizado
- Fácil experimentación con cambios de estructura

### 2. Prisma ORM Integration

#### Ubicación estratégica
**Decisión:** Instalar en `apps/api` (no en `packages/database`)
**Razón:** Máxima independencia para futura migración a FastAPI

#### Schema final con soft delete
```prisma
model Transaction {
  id          Int       @id @default(autoincrement())
  amount      Decimal   @db.Decimal(10, 2)
  description String?
  date        DateTime  @db.Date
  type        String    @db.VarChar(10)
  category    String?   @db.VarChar(50)
  createdAt   DateTime? @default(now()) @map("created_at")
  updatedAt   DateTime? @updatedAt @map("updated_at")
  deletedAt   DateTime? @map("deleted_at") // Para borrado lógico
  
  @@map("transactions")
}
```

### 3. API Endpoints Development

#### Estructura de rutas Next.js App Router
```
apps/api/src/app/api/
├── transactions/
│   ├── route.ts              # GET /api/transactions, POST /api/transactions
│   ├── [id]/
│   │   ├── route.ts          # GET, PUT, DELETE /api/transactions/[id]
│   │   ├── restore/
│   │   │   └── route.ts      # PUT /api/transactions/[id]/restore
│   │   └── permanent/
│   │       └── route.ts      # DELETE /api/transactions/[id]/permanent
│   └── trash/
│       └── route.ts          # GET /api/transactions/trash
```

#### CRUD Básico Implementado

**GET /api/transactions**
```typescript
const transactions = await prisma.transaction.findMany({
  where: { deletedAt: null }, // Solo no borradas
  orderBy: { date: 'desc' }
});
```

**POST /api/transactions**
```typescript
const newTransaction = await prisma.transaction.create({
  data: {
    amount: parseFloat(amount),
    description,
    date: new Date(date),
    type,
    category
  }
});
```

**PUT /api/transactions/[id]**
- Actualización parcial (solo campos proporcionados)
- Validaciones de tipo y existencia
- Manejo de parámetros dinámicos con `await params`

#### Sistema de Papelera Completo

**Borrado lógico:**
```typescript
await prisma.transaction.update({
  where: { id: transactionId },
  data: { deletedAt: new Date() }
});
```

**Restaurar desde papelera:**
```typescript
await prisma.transaction.update({
  where: { id: transactionId },
  data: { deletedAt: null }
});
```

**Borrado físico definitivo:**
```typescript
await prisma.transaction.delete({
  where: { id: transactionId }
});
```

### 4. Mejores Prácticas Implementadas

#### Validación y Manejo de Errores
```typescript
// Validación de ID numérico
const transactionId = parseInt(id);
if (isNaN(transactionId)) {
  return NextResponse.json(
    { success: false, error: 'ID debe ser un número válido' },
    { status: 400 }
  );
}

// Verificación de existencia
const existingTransaction = await prisma.transaction.findUnique({
  where: { id: transactionId, deletedAt: null }
});
```

#### Logging para Debugging
```typescript
console.log(`API: Obteniendo transacción con ID: ${id}`);
console.log(`API: Se encontraron ${transactions.length} transacciones`);
```

#### Respuestas Consistentes
```typescript
return NextResponse.json({
  success: true,
  data: transactions,
  count: transactions.length
});
```

---

## 🔧 Setup Técnico Realizado

### Herramientas añadidas:
- **Docker Compose** para PostgreSQL
- **Prisma ORM** con cliente TypeScript
- **tsx** para ejecutar scripts TypeScript
- **jq** para formatear JSON en terminal

### Comandos útiles aprendidos:
```bash
# Docker
docker-compose up -d
docker-compose down -v
docker exec -it vyniq-db psql -U vyniq_user -d vyniq

# Prisma
npx prisma db push
npx prisma generate
npx prisma db pull

# Testing con curl
curl -s http://localhost:3000/api/transactions | jq
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "type": "income"}'
```

---

## 🐛 Errores Encontrados y Soluciones

### 1. Contenedor PostgreSQL en loop de restart
**Error:** `initdb: error: directory exists but is not empty`  
**Solución:** `docker-compose down -v` para limpiar volúmenes

### 2. Error con corchetes en zsh
**Error:** `zsh: no matches found: [id]`  
**Solución:** Usar comillas: `mkdir "apps/api/src/app/api/transactions/[id]"`

### 3. Next.js 15 - params sync error
**Error:** `params should be awaited before using its properties`  
**Solución:** 
```typescript
{ params }: { params: Promise<{ id: string }> }
const { id } = await params;
```

### 4. IDs autoincrement después de reseteo
**Comportamiento:** PostgreSQL mantiene secuencia después de DELETE  
**Solución:** Normal en desarrollo, ajustar IDs en pruebas curl

---

## 💡 Arquitectura y Diseño

### Separación de Responsabilidades
- **Frontend:** UI y estado local únicamente
- **Backend:** Lógica de negocio, validaciones, persistencia
- **Base de datos:** Datos estructurados con integridad

### Soft Delete vs Hard Delete
| Operación | Endpoint | Acción | Reversible |
|-----------|----------|---------|------------|
| Borrado lógico | `DELETE /api/transactions/[id]` | `deletedAt = now()` | ✅ |
| Restaurar | `PUT /api/transactions/[id]/restore` | `deletedAt = null` | N/A |
| Borrado físico | `DELETE /api/transactions/[id]/permanent` | SQL DELETE | ❌ |

### Futura Papelera Unificada
**Visión:** Pantalla única mostrando todos los objetos eliminados
**Opciones:**
1. Endpoint unificado `/api/trash` (queries múltiples)
2. Llamadas separadas + composición frontend
3. Endpoint resumen con queries internas

---

## 🧪 Testing Realizado

### Flujo completo probado:
```bash
# 1. Crear transacción
curl -X POST /api/transactions -d '{"amount": 100, "type": "income"}'

# 2. Listar todas
curl /api/transactions

# 3. Obtener por ID
curl /api/transactions/1

# 4. Actualizar
curl -X PUT /api/transactions/1 -d '{"description": "Actualizada"}'

# 5. Borrado lógico
curl -X DELETE /api/transactions/1

# 6. Ver papelera
curl /api/transactions/trash

# 7. Restaurar
curl -X PUT /api/transactions/1/restore

# 8. Borrado físico
curl -X DELETE /api/transactions/1/permanent
```

---

## 📚 Conceptos para Futuras Sesiones

### API Testing formal:
- [ ] Colecciones Postman/Thunder Client
- [ ] Tests automatizados por consola
- [ ] Casos edge y validación de errores
- [ ] Documentación de endpoints

### Frontend Integration:
- [ ] Custom hooks para API calls
- [ ] Estado de loading/error en UI
- [ ] Optimistic updates
- [ ] Manejo de papelera en interfaz

### Arquitectura avanzada:
- [ ] Migraciones de Prisma en producción
- [ ] Rate limiting y middleware
- [ ] Autenticación y autorización
- [ ] Logging estructurado

---

## 🎯 Commits Realizados

1. `feat: add PostgreSQL docker setup`
2. `feat: add simplified transaction model and seed data`
3. `feat: add complete transaction CRUD API with trash system`

---

## 📝 Notas Personales

### Lo que funcionó bien:
- [x] Estrategia de reseteo sin migraciones para desarrollo
- [x] Estructura de rutas Next.js App Router
- [x] Sistema de papelera completo desde el inicio
- [x] Validaciones y manejo de errores consistente

### Decisiones arquitectónicas importantes:
- [x] Prisma en apps/api (no packages/) para independencia
- [x] Soft delete como comportamiento por defecto
- [x] Logging extensivo para debugging
- [x] Respuestas JSON estructuradas

### Próximos pasos preparados:
- [ ] Frontend React consumiendo API real
- [ ] Formularios para CRUD operations
- [ ] UI para gestión de papelera

---

**Próxima sesión:** FASE 2 - Frontend con Datos Reales