import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Category name is required"),
  type: z.enum(["income", "expense"]),
  workspaceId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  type: z.enum(["income", "expense"]),
  workspaceId: z.string(),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required").optional(),
});

export const CategoriesResponseSchema = z.object({
  categories: z.array(CategorySchema),
  total: z.number(),
});

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>;
