// src/app/api/transactions/[id]/restore/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT /api/transactions/[id]/restore - Restaurar desde papelera
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(`API: Restaurando transacción con ID: ${id} desde papelera`);
    
    // Validar que el ID es un número
    const transactionId = parseInt(id);
    if (isNaN(transactionId)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID debe ser un número válido' 
        },
        { status: 400 }
      );
    }
    
    // Verificar que la transacción existe y está borrada (en papelera)
    const existingTransaction = await prisma.transaction.findUnique({
      where: { 
        id: transactionId,
        deletedAt: { not: null }  // Solo transacciones borradas
      }
    });
    
    if (!existingTransaction) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Transacción no encontrada en la papelera' 
        },
        { status: 404 }
      );
    }
    
    // Restaurar: quitar marca de deletedAt
    const restoredTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { 
        deletedAt: null  // Quitar marca de borrado
      }
    });
    
    console.log(`API: Transacción ${id} restaurada desde papelera`);
    
    return NextResponse.json({
      success: true,
      message: 'Transacción restaurada desde papelera',
      data: restoredTransaction
    });
    
  } catch (error) {
    console.error('Error al restaurar transacción:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}