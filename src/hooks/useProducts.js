

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import api from "../api/axios";
// جلب جميع المنتجات
export function useProducts() {
  return useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const response = await api.get("/products");
      return response.data;
    },
  });
}

// إضافة منتج جديد
export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData) => {
      const response = await api.post(
        "/products",
        productData
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}


export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...productData }) => {
      const response = await api.patch(
        `/products/${id}`,
        productData
      );

      return response.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products", String(variables.id)],
      });
    },
  });
}