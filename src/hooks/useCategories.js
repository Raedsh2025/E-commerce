import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";


// جلب جميع التصنيفات
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data;
    },
  });
}

// جلب تصنيف واحد باستخدام ID
export function useCategory(id) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    },
    enabled: Boolean(id),
  });
}

// إضافة تصنيف جديد
export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryData) => {
      const response = await api.post("/categories", categoryData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

// تعديل تصنيف
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, categoryData }) => {
      const response = await api.patch(
        `/categories/${id}`,
        categoryData
      );

      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      queryClient.invalidateQueries({
        queryKey: ["categories", String(variables.id)],
      });
    },
  });
}