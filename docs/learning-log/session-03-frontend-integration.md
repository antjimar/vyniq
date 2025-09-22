# Sesión 3: Frontend Integration & React Patterns

**Fecha:** [Tercera sesión]  
**Duración:** ~2 horas  
**Objetivo:** Completar integración frontend-backend con patrones React modernos

---

## 🎯 Lo que aprendimos hoy

### 1. TypeScript Types para Frontend

#### Decisión arquitectónica: Tipos duplicados vs compartidos
**Estrategia elegida:** Duplicar tipos en frontend para mantener desacoplamiento
- Frontend independiente del backend
- Facilita futura migración a FastAPI
- Tradeoff aceptable: duplicación vs flexibilidad arquitectónica

#### Tipos implementados
```typescript
// apps/web/src/types/transaction.ts
export interface Transaction {
  id: number;
  amount: number;
  description?: string;
  date: string; // ISO string desde la API
  type: 'income' | 'expense';
  category?: string;
  // ... campos de auditoría
}

export interface TransactionItemProps {
  transaction: Transaction;
}

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}
```

### 2. Evolución del TransactionItem Component

#### Props pattern - Conexión SwiftUI ↔ React
**SwiftUI:**
```swift
struct TransactionRowView: View {
    let transaction: Transaction  // Parámetro del inicializador
    var body: some View { /* */ }
}
// Uso: TransactionRowView(transaction: myTransaction)
```

**React:**
```tsx
function TransactionItem({ transaction }: TransactionItemProps) {
    return <div>{transaction.description}</div>;
}
// Uso: <TransactionItem transaction={myTransaction} />
```

#### Styling condicional implementado
```tsx
const isIncome = transaction.type === 'income';
const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
const amountPrefix = isIncome ? '+' : '';
```

#### Layout con Tailwind CSS
- Tarjeta con sombra y bordes redondeados
- Hover effects para interactividad
- Formateo de fechas y moneda
- Responsive design con flexbox

### 3. TransactionList Component con Estados

#### List rendering - Conexión con SwiftUI ForEach
**Equivalencias identificadas:**
- SwiftUI `ForEach(transactions, id: \.id)` ↔ React `transactions.map((transaction) => ...)`
- SwiftUI `id: \.id` ↔ React `key={transaction.id}`

#### Propósito de React keys
**Corrección conceptual:** Las keys no evitan duplicados, sino que optimizan el rendering:
- React identifica qué elementos cambiaron
- Reutiliza componentes que siguen presentes
- Solo crea/destruye los elementos que realmente cambiaron
- Mantiene estado interno de componentes durante reordenamientos

#### Estados de UI implementados
```tsx
// Estado de carga con skeleton placeholders
if (loading) {
  return (
    <div className="space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2"></div>
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-gray-100 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

// Estado de error con retry action
if (error) {
  return <ErrorMessage error={error} />;
}

// Lista vacía con empty state
if (transactions.length === 0) {
  return <EmptyState />;
}
```

### 4. Custom Hook useTransactions

#### Hook pattern - Equivalencia con SwiftUI ViewModel
**SwiftUI ViewModel pattern:**
```swift
class TransactionViewModel: ObservableObject {
    @Published var transactions: [Transaction] = []
    @Published var isLoading = false
    @Published var error: String?
    
    func loadTransactions() { /* API call */ }
}
```

**React Custom Hook pattern:**
```tsx
function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchTransactions = async () => { /* API call */ };
    
    useEffect(() => {
        fetchTransactions();
    }, []);
    
    return { transactions, loading, error, refetch: fetchTransactions };
}
```

#### useEffect para efectos secundarios
**Conexión con SwiftUI lifecycle:**
- `useEffect(() => {}, [])` ↔ SwiftUI `onAppear`
- Array vacío `[]` = ejecutar solo una vez al montar
- Cleanup función = `onDisappear` equivalent

#### Estado asíncrono manejado correctamente
```tsx
const fetchTransactions = async () => {
    try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/transactions');
        // ... handle response
        setTransactions(data.data);
    } catch (err) {
        setError(err.message);
        setTransactions([]); // Limpiar en caso de error
    } finally {
        setLoading(false);
    }
};
```

### 5. Integración Frontend-Backend

#### Problema CORS identificado y resuelto
**Error original:**
```
Access to fetch at 'http://localhost:3000/api/transactions' 
from origin 'http://localhost:3001' has been blocked by CORS policy
```

**Causa:** Servidores separados creando cross-origin requests
- Frontend: http://localhost:3001
- Backend: http://localhost:3000

#### Solución implementada: Headers CORS en API
```typescript
function getCorsHeaders() {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return headers;
}

export async function OPTIONS(request: NextRequest) {
    return new Response(null, { status: 200, headers: getCorsHeaders() });
}
```

#### Limitaciones identificadas para el futuro
**Problemas con la solución actual:**
- Duplicación de código CORS en cada endpoint
- URLs hardcodeadas (no funcionará en producción)
- Inconsistencia fácil de introducir

**Soluciones planificadas para Fase 4+ (proyecto real):**
- Middleware de Next.js para CORS global
- Variables de entorno para URLs dinámicas
- Configuración centralizada
- Reverse proxy en producción

---

## 🔧 Arquitectura y Patrones

### MVP vs Proyecto Real - División clara establecida

#### Bootcamp formativo (Fases 1-3):
- **Objetivo:** Aprender fundamentos con enfoque simple
- **Arquitectura:** Componente → Custom Hook → fetch directo → API
- **Duplicación aceptable** para claridad de aprendizaje

#### Proyecto real (Fase 4+):
- **Objetivo:** Escalabilidad y mantenibilidad
- **Arquitectura:** Componente → Hook → Service → Repository → API Client
- **Feature-Sliced Design** completo
- **Desarrollo asistido** con Cursor + Claude Code

### Hydration Issues en Next.js

#### Error de hidration encontrado
```
A tree hydrated but some attributes of the server rendered HTML 
didn't match the client properties
```

**Causa identificada:** Extensiones de Chrome modificando DOM
**Solución:** Navegación en modo incógnito durante desarrollo
**Impacto:** Solo desarrollo, no afecta producción

#### Diferencias Server-Side vs Client-Side rendering
- Formateo de fechas puede diferir entre servidor y cliente
- `new Date().toLocaleDateString()` problemático para hydration
- Solución: Formateo consistente o componentes client-only

---

## 🎨 UI/UX Patterns Implementados

### Estados de carga progressive
1. **Loading state:** Spinner + skeleton placeholders
2. **Error state:** Mensaje de error + botón retry
3. **Empty state:** Ilustración + mensaje motivacional
4. **Success state:** Lista de transacciones

### Conditional styling con Tailwind
```tsx
const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
const amountPrefix = isIncome ? '+' : '';
```

### Responsive design considerations
- Layout flexible con flexbox
- Hover states para desktop
- Spacing consistente con sistema de design

---

## 🐛 Debugging y Troubleshooting

### Console.log strategy para React
```tsx
console.log("TransactionItem ejecutándose", transaction);
console.log("useTransactions: Iniciando fetch de transacciones");
console.log(`useTransactions: ${data.data.length} transacciones cargadas`);
```

**Observaciones del debugging:**
- React Strict Mode ejecuta componentes 2x en desarrollo
- Custom hooks también se ejecutan múltiples veces
- Importante distinguir logs de desarrollo vs producción

### Error handling patterns
```tsx
// En el hook
catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
    setError(errorMessage);
    setTransactions([]); // Importante: limpiar estado
}

// En el componente
{error && (
    <button onClick={refetch}>Reintentar</button>
)}
```

---

## 📊 Data Flow Completo

### Flujo de datos end-to-end
```
PostgreSQL → Prisma → API Route → HTTP Response → 
useTransactions Hook → React State → TransactionList → 
TransactionItem → DOM
```

### Estado y re-renderizado
1. **Inicial:** `loading: true`, `transactions: []`
2. **Fetch exitoso:** `loading: false`, `transactions: data`
3. **Error:** `loading: false`, `error: message`, `transactions: []`
4. **Refetch:** Vuelve a estado inicial

---

## 🎯 Commits Realizados

1. `feat: add TransactionItem component with TypeScript types`
2. `feat: add TransactionList component`
3. `feat: integrate frontend with transaction API`

---

## 📝 Conceptos para Próximas Sesiones

### CRUD Operations (Fase 3):
- [ ] POST requests para crear transacciones
- [ ] PUT requests para actualizar
- [ ] DELETE requests para borrado lógico
- [ ] Optimistic updates en UI
- [ ] Form validation y manejo

### Error Boundaries y Resilience:
- [ ] React Error Boundaries
- [ ] Retry mechanisms
- [ ] Offline handling
- [ ] Network error recovery

### Performance Optimization:
- [ ] React.memo para evitar re-renders
- [ ] useMemo para computaciones costosas
- [ ] Lazy loading de componentes
- [ ] Pagination para listas grandes

---

## 💡 Lecciones Aprendidas

### Conexiones SwiftUI que ayudaron:
- Props = parámetros de inicializador
- Custom hooks = ViewModels
- useEffect = onAppear/lifecycle
- Estado reactivo = @Published properties

### Diferencias importantes React vs SwiftUI:
- React re-ejecuta función completa en cada render
- Keys necesarias para optimización de listas
- CORS requerido para servidores separados
- Hydration challenges en SSR

### Decisiones arquitectónicas clave:
- Tipos duplicados vs acoplamiento
- Servidores separados vs monolítico
- Simplicidad temporal vs arquitectura final

---

**Próxima sesión:** FASE 3.1 - Crear Transacciones (Formularios + POST)