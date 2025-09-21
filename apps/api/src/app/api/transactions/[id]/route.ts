// src/app/api/transactions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/transactions/[id] - Obtener transacción por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(`API: Obteniendo transacción con ID: ${id}`);
    
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
    
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
        deletedAt: null  // Solo transacciones no borradas
      }
    });
    
    if (!transaction) {
      console.log(`API: Transacción con ID ${id} no encontrada`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Transacción no encontrada' 
        },
        { status: 404 }
      );
    }
    
    console.log(`API: Transacción encontrada: ${transaction.description}`);
    
    return NextResponse.json({
      success: true,
      data: transaction
    });
    
  } catch (error) {
    console.error('Error al obtener transacción por ID:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/transactions/[id] - Borrado lógico
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(`API: Borrando lógicamente transacción con ID: ${id}`);
    
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
    
    // Verificar que la transacción existe y no está ya borrada
    const existingTransaction = await prisma.transaction.findUnique({
      where: { 
        id: transactionId,
        deletedAt: null  // Solo transacciones no borradas
      }
    });
    
    if (!existingTransaction) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Transacción no encontrada o ya está eliminada' 
        },
        { status: 404 }
      );
    }
    
    // Borrado lógico: marcar deletedAt con timestamp actual
    const deletedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { 
        deletedAt: new Date() 
      }
    });
    
    console.log(`API: Transacción ${id} marcada como eliminada`);
    
    return NextResponse.json({
      success: true,
      message: 'Transacción eliminada (borrado lógico)',
      data: deletedTransaction
    });
    
  } catch (error) {
    console.error('Error al borrar transacción:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/transactions/[id] - Actualizar transacción
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    console.log(`API: Actualizando transacción con ID: ${id}`, body);
    
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
    
    // Verificar que la transacción existe
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: transactionId }
    });
    
    if (!existingTransaction) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Transacción no encontrada' 
        },
        { status: 404 }
      );
    }
    
    // Validar datos de entrada
    const { amount, description, date, type, category } = body;
    
    if (type && !['income', 'expense'].includes(type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'type debe ser "income" o "expense"' 
        },
        { status: 400 }
      );
    }
    
    // Preparar datos para actualizar (solo campos proporcionados)
    const updateData: any = {};
    
    if (amount !== undefined) updateData.amount = parseFloat(amount);
    if (description !== undefined) updateData.description = description;
    if (date !== undefined) updateData.date = new Date(date);
    if (type !== undefined) updateData.type = type;
    if (category !== undefined) updateData.category = category;
    
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: updateData
    });
    
    console.log(`API: Transacción ${id} actualizada correctamente`);
    
    return NextResponse.json({
      success: true,
      data: updatedTransaction
    });
    
  } catch (error) {
    console.error('Error al actualizar transacción:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}