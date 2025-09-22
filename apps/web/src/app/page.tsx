import TransactionList from '@/components/TransactionList';

// Datos de prueba
const mockTransactions = [
  {
    id: 1,
    amount: 250.50,
    description: "Supermercado semanal",
    date: "2024-01-15",
    type: "expense" as const,
    category: "Alimentación"
  },
  {
    id: 2,
    amount: 3000,
    description: "Salario enero",
    date: "2024-01-01",
    type: "income" as const,
    category: "Trabajo"
  },
  {
    id: 3,
    amount: 45.30,
    description: "Gasolina",
    date: "2024-01-20",
    type: "expense" as const,
    category: "Transporte"
  }
];

export default function Home() {
  console.log("Home ejecutándose")

  return (
    <>
      <TransactionList transactions={mockTransactions} />

      <TransactionList transactions={[]} loading={true} />
      
      <TransactionList transactions={[]} error="Error de conexión" />

      <TransactionList transactions={[]} />
    </>
  );
}
