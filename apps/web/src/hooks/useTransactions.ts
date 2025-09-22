import { useState, useEffect } from 'react';
import { Transaction } from '@/types/transaction';

interface UseTransactionsResult {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTransactions(): UseTransactionsResult {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      console.log('useTransactions: Iniciando fetch de transacciones');
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:3000/api/transactions');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('useTransactions: Datos recibidos', data);

      if (data.success && data.data) {
        setTransactions(data.data);
        console.log(`useTransactions: ${data.data.length} transacciones cargadas`);
      } else {
        throw new Error(data.error || 'Error desconocido al cargar transacciones');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('useTransactions: Error al cargar transacciones', err);
      setError(errorMessage);
      setTransactions([]); // Limpiar datos en caso de error
      
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar datos al montar el componente
  useEffect(() => {
    fetchTransactions();
  }, []); // Array vacío = solo se ejecuta una vez

  // Función para refetch manual
  const refetch = () => {
    fetchTransactions();
  };

  return {
    transactions,
    loading,
    error,
    refetch
  };
}