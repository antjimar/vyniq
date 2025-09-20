-- Schema inicial simplificado para vyniq
-- Solo tabla transactions sin relaciones complejas

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
  category VARCHAR(50), -- hardcodeado por ahora, sin relaciones
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para optimizar consultas comunes
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);

-- Comentarios explicativos
COMMENT ON TABLE transactions IS 'Transacciones financieras simplificadas para MVP';
COMMENT ON COLUMN transactions.amount IS 'Cantidad en decimal, positiva para income, negativa para expense';
COMMENT ON COLUMN transactions.type IS 'Tipo: income o expense';
COMMENT ON COLUMN transactions.category IS 'Categoría como string simple (sin FK por ahora)';

-- Datos de prueba
INSERT INTO transactions (amount, description, date, type, category) VALUES
-- Ingresos
(3000.00, 'Salario Enero', '2024-01-01', 'income', 'Salario'),
(500.00, 'Freelance proyecto web', '2024-01-15', 'income', 'Freelance'),
(50.00, 'Venta artículo segunda mano', '2024-01-20', 'income', 'Ventas'),

-- Gastos
(-800.00, 'Alquiler Enero', '2024-01-01', 'expense', 'Vivienda'),
(-150.00, 'Supermercado semanal', '2024-01-03', 'expense', 'Alimentación'),
(-45.00, 'Gasolina', '2024-01-05', 'expense', 'Transporte'),
(-25.00, 'Netflix', '2024-01-08', 'expense', 'Entretenimiento'),
(-200.00, 'Supermercado semanal', '2024-01-10', 'expense', 'Alimentación'),
(-80.00, 'Cena restaurante', '2024-01-12', 'expense', 'Restaurantes'),
(-120.00, 'Factura luz', '2024-01-15', 'expense', 'Servicios'),
(-35.00, 'Spotify Premium', '2024-01-16', 'expense', 'Entretenimiento'),
(-90.00, 'Ropa', '2024-01-18', 'expense', 'Compras'),
(-60.00, 'Farmacia', '2024-01-22', 'expense', 'Salud'),
(-180.00, 'Supermercado semanal', '2024-01-24', 'expense', 'Alimentación'),
(-40.00, 'Gasolina', '2024-01-28', 'expense', 'Transporte');