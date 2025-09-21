// src/app/api/transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/transactions - Obtener todas las transacciones
export async function GET(request: NextRequest) {
  try {
    console.log('API: Obteniendo todas las transacciones');
    
    const transactions = await prisma.transaction.findMany({
      where: {
        deletedAt: null  // Solo transacciones no borradas
      },
      orderBy: {
        date: 'desc' // Más recientes primero
      }
    });
    
    console.log(`API: Se encontraron ${transactions.length} transacciones`);
    
    return NextResponse.json({
      success: true,
      data: transactions,
      count: transactions.length
    });
    
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}

// POST /api/transactions - Crear nueva transacción
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('API: Creando nueva transacción:', body);
    
    // Validación básica
    const { amount, description, date, type, category } = body;
    
    if (!amount || !date || !type) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Campos obligatorios: amount, date, type' 
        },
        { status: 400 }
      );
    }
    
    if (!['income', 'expense'].includes(type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'type debe ser "income" o "expense"' 
        },
        { status: 400 }
      );
    }
    
    const newTransaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        description: description || null,
        date: new Date(date),
        type,
        category: category || null
      }
    });
    
    console.log('API: Transacción creada con ID:', newTransaction.id);
    
    return NextResponse.json({
      success: true,
      data: newTransaction
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error al crear transacción:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}