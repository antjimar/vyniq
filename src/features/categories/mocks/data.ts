import type { Category } from '../schemas';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Salary',
    type: 'income',
    workspaceId: 'workspace-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Freelance',
    type: 'income',
    workspaceId: 'workspace-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Food',
    type: 'expense',
    workspaceId: 'workspace-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Transportation',
    type: 'expense',
    workspaceId: 'workspace-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Entertainment',
    type: 'expense',
    workspaceId: 'workspace-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];