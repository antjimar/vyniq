
import { TransactionItemProps } from '@/types/transaction';

export default function TransactionItem({ transaction }: TransactionItemProps) {
    console.log("TransactionItem ejecutándose", transaction);
    
    // Determinar si es ingreso o gasto para styling
    const isIncome = transaction.type === 'income';
    const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
    const amountPrefix = isIncome ? '+' : '';
    
    // Formatear fecha
    const formattedDate = new Date(transaction.date).toLocaleDateString('es-ES');
    
    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
            {/* Header con descripción y fecha */}
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">
                    {transaction.description || 'Sin descripción'}
                </h3>
                <span className="text-sm text-gray-500">
                    {formattedDate}
                </span>
            </div>
            
            {/* Categoría */}
            {transaction.category && (
                <p className="text-sm text-gray-600 mb-2">
                    {transaction.category}
                </p>
            )}
            
            {/* Cantidad */}
            <div className={`text-lg font-semibold ${amountColor}`}>
                {amountPrefix}{transaction.amount}€
            </div>
        </div>
    );
}