import { setupWorker } from 'msw/browser';
import { categoriesHandlers } from '@/features/categories/mocks/handlers';

export const worker = setupWorker(
  ...categoriesHandlers,
);