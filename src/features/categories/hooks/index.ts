import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Category, CreateCategory, UpdateCategory, CategoriesResponse } from '../schemas';

const CATEGORIES_QUERY_KEY = ['categories'] as const;

interface GetCategoriesParams {
  type?: 'income' | 'expense';
  workspaceId: string;
}

async function getCategories(params: GetCategoriesParams): Promise<CategoriesResponse> {
  const searchParams = new URLSearchParams();
  if (params.type) searchParams.append('type', params.type);
  searchParams.append('workspaceId', params.workspaceId);

  const response = await fetch(`/api/categories?${searchParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

async function createCategory(data: CreateCategory): Promise<Category> {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create category');
  }
  return response.json();
}

async function updateCategory({ id, data }: { id: string; data: UpdateCategory }): Promise<Category> {
  const response = await fetch(`/api/categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update category');
  }
  return response.json();
}

async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`/api/categories/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
}

export function useCategories(params: GetCategoriesParams) {
  return useQuery({
    queryKey: [...CATEGORIES_QUERY_KEY, params],
    queryFn: () => getCategories(params),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}