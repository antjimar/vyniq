export interface Transaction {
    id: number;
    amount: number;
    description?: string;
    date: string; // ISO string desde la API
    type: 'income' | 'expense';
    category?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
  }
  
  export interface TransactionItemProps {
    transaction: Transaction;
  }
  
  // Tipos para estados de la UI
  export interface TransactionState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
  }
  
  // Tipo para crear nuevas transacciones (sin campos auto-generados)
  export interface CreateTransactionData {
    amount: number;
    description?: string;
    date: string;
    type: 'income' | 'expense';
    category?: string;
  }