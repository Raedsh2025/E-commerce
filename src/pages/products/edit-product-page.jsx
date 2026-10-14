import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../../api/axios";
import PageHeader from "../../components/page-header/page-header";
import ProductForm from "./components/product-form/product-form";
import { useUpdateProduct } from "../../hooks/useProducts";

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });

  const updateProduct = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name ?? "",
        price: product.price ?? "",
        categoryId: product.categoryId ?? "",
        imageUrl: product.imageUrl ?? "",
        description: product.description ?? "",
      });
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateProduct.mutate(
      {
        id,
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["products", id],
          });

          navigate("/products");
        },
      }
    );
  };

  if (isLoading) {
    return <p>Loading product...</p>;
  }

  if (isError) {
    return <p>Failed to load product.</p>;
  }

  return (
    <section>
      <PageHeader
        eyebrow="Products"
        title="Edit Product"
        description={`Edit product #${id}.`}
        action={
          <Link
            className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-extrabold text-[#354a40] transition hover:bg-[#f4f8f5]"
            to="/products"
          >
            Back
          </Link>
        }
      />

     <ProductForm
  title="Update Product"
  submitText="Update Product"
  formData={formData}
  onChange={handleChange}
  onSubmit={handleSubmit}
  isPending={updateProduct.isPending}
  error={
    updateProduct.isError
      ? `Failed to update product: ${updateProduct.error.message}`
      : ""
  }
/>

      {updateProduct.isError && (
        <p className="mt-4 text-sm text-red-600">
          Failed to update product: {updateProduct.error.message}
        </p>
      )}
    </section>
  );
}

export default EditProductPage;