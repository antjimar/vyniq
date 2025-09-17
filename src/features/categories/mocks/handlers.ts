import { http, HttpResponse } from 'msw';
import { mockCategories } from './data';
import { CreateCategorySchema, UpdateCategorySchema } from '../schemas';
import type { Category } from '../schemas';

// eslint-disable-next-line prefer-const
let categories = [...mockCategories];
let nextId = categories.length + 1;

export const categoriesHandlers = [
  // GET /api/categories
  http.get('/api/categories', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const workspaceId = url.searchParams.get('workspaceId');

    let filteredCategories = categories.filter(cat =>
      workspaceId ? cat.workspaceId === workspaceId : true
    );

    if (type) {
      filteredCategories = filteredCategories.filter(cat => cat.type === type);
    }

    return HttpResponse.json({
      categories: filteredCategories,
      total: filteredCategories.length,
    });
  }),

  // POST /api/categories
  http.post('/api/categories', async ({ request }) => {
    try {
      const body = await request.json();
      const validatedData = CreateCategorySchema.parse(body);

      const newCategory: Category = {
        id: nextId.toString(),
        ...validatedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      categories.push(newCategory);
      nextId++;

      return HttpResponse.json(newCategory, { status: 201 });
    } catch {
      return HttpResponse.json(
        { error: 'Invalid category data' },
        { status: 400 }
      );
    }
  }),

  // PATCH /api/categories/:id
  http.patch('/api/categories/:id', async ({ params, request }) => {
    try {
      const { id } = params;
      const body = await request.json();
      const validatedData = UpdateCategorySchema.parse(body);

      const categoryIndex = categories.findIndex(cat => cat.id === id);
      if (categoryIndex === -1) {
        return HttpResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }

      const updatedCategory = {
        ...categories[categoryIndex],
        ...validatedData,
        updatedAt: new Date().toISOString(),
      };

      categories[categoryIndex] = updatedCategory;

      return HttpResponse.json(updatedCategory);
    } catch {
      return HttpResponse.json(
        { error: 'Invalid category data' },
        { status: 400 }
      );
    }
  }),

  // DELETE /api/categories/:id
  http.delete('/api/categories/:id', ({ params }) => {
    const { id } = params;
    const categoryIndex = categories.findIndex(cat => cat.id === id);

    if (categoryIndex === -1) {
      return HttpResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    categories.splice(categoryIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];