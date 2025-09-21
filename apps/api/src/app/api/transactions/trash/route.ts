// src/app/api/transactions/trash/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/transactions/trash - Obtener transacciones en papelera
export async function GET(request: NextRequest) {
  try {
    console.log('API: Obteniendo transacciones en papelera');
    
    const trashedTransactions = await prisma.transaction.findMany({
      where: {
        deletedAt: { not: null }  // Solo transacciones borradas
      },
      orderBy: {
        deletedAt: 'desc' // Borradas más recientemente primero
      }
    });
    
    console.log(`API: Se encontraron ${trashedTransactions.length} transacciones en papelera`);
    
    return NextResponse.json({
      success: true,
      data: trashedTransactions,
      count: trashedTransactions.length,
      message: `${trashedTransactions.length} transacciones en papelera`
    });
    
  } catch (error) {
    console.error('Error al obtener papelera:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}