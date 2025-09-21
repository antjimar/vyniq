// src/app/api/transactions/[id]/permanent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DELETE /api/transactions/[id]/permanent - Borrado físico definitivo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(`API: Eliminando FÍSICAMENTE transacción con ID: ${id}`);
    
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
    
    // Verificar que la transacción existe (sin importar si está borrada o no)
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
    
    // Borrado físico: eliminar completamente de la base de datos
    await prisma.transaction.delete({
      where: { id: transactionId }
    });
    
    console.log(`API: Transacción ${id} eliminada FÍSICAMENTE (irreversible)`);
    
    return NextResponse.json({
      success: true,
      message: 'Transacción eliminada físicamente (irreversible)',
      data: {
        id: transactionId,
        deletedAt: new Date(),
        permanent: true
      }
    });
    
  } catch (error) {
    console.error('Error al eliminar físicamente transacción:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}