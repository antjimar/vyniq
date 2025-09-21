// apps/api/prisma/seed-simple.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting simple database seeding...');

  // Limpiar datos existentes
  await prisma.transaction.deleteMany({});
  console.log('🧹 Cleared existing transactions');

  // Crear transacciones de ejemplo
  const transactions = [
    // Ingresos
    { amount: 3000.00, description: 'Salario Enero', date: '2024-01-01', type: 'income', category: 'Salario' },
    { amount: 500.00, description: 'Freelance proyecto web', date: '2024-01-15', type: 'income', category: 'Freelance' },
    { amount: 50.00, description: 'Venta artículo segunda mano', date: '2024-01-20', type: 'income', category: 'Ventas' },

    // Gastos
    { amount: -800.00, description: 'Alquiler Enero', date: '2024-01-01', type: 'expense', category: 'Vivienda' },
    { amount: -150.00, description: 'Supermercado semanal', date: '2024-01-03', type: 'expense', category: 'Alimentación' },
    { amount: -45.00, description: 'Gasolina', date: '2024-01-05', type: 'expense', category: 'Transporte' },
    { amount: -25.00, description: 'Netflix', date: '2024-01-08', type: 'expense', category: 'Entretenimiento' },
    { amount: -200.00, description: 'Supermercado semanal', date: '2024-01-10', type: 'expense', category: 'Alimentación' },
    { amount: -80.00, description: 'Cena restaurante', date: '2024-01-12', type: 'expense', category: 'Restaurantes' },
    { amount: -120.00, description: 'Factura luz', date: '2024-01-15', type: 'expense', category: 'Servicios' },
    { amount: -35.00, description: 'Spotify Premium', date: '2024-01-16', type: 'expense', category: 'Entretenimiento' },
    { amount: -90.00, description: 'Ropa', date: '2024-01-18', type: 'expense', category: 'Compras' },
    { amount: -60.00, description: 'Farmacia', date: '2024-01-22', type: 'expense', category: 'Salud' },
    { amount: -180.00, description: 'Supermercado semanal', date: '2024-01-24', type: 'expense', category: 'Alimentación' },
    { amount: -40.00, description: 'Gasolina', date: '2024-01-28', type: 'expense', category: 'Transporte' }
  ];

  for (const transactionData of transactions) {
    await prisma.transaction.create({
      data: {
        ...transactionData,
        date: new Date(transactionData.date)
      }
    });
  }

  console.log(`✅ Created ${transactions.length} transactions`);
  
  const count = await prisma.transaction.count();
  console.log(`📊 Total transactions in database: ${count}`);
  
  console.log('🎉 Simple database seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });