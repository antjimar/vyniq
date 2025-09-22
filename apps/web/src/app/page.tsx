"use client";
import TransactionList from '@/components/TransactionList';
import { useTransactions } from '@/hooks/useTransactions';

export default function Home() {
  const { transactions, loading, error, refetch } = useTransactions();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Transacciones</h1>
      <TransactionList 
        transactions={transactions} 
        loading={loading} 
        error={error} 
      />

      {error && (
        <button 
          onClick={refetch} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      )}
    </main>
  );
}
