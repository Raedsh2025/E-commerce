
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";
import CategoryForm from "./components/category-form/category-form";
import PageHeader from "../../components/page-header/page-header";
import {
  useUpdateCategory,
} from "../../hooks/useCategories";

export const getCategory = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
}

function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategory(id),
    enabled: Boolean(id),
  });
  const updateCategory = useUpdateCategory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });


  

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name ?? "",
        description: category.description ?? "",
      });
    }
  }, [category]);
const handlerSubmit = (event) => {
  event.preventDefault();

  updateCategory.mutate(
    { id, categoryData: formData },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories", id]);
        navigate("/categories");
      },
    }
  );
}
const handlechange = (event) => {
  const { name, value } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  return (
    <section>
      <PageHeader
        eyebrow="Categories"
        title="Edit Category"
        description={`Category #${id}`}
        action={
          <Link
            className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-extrabold text-[#354a40] transition hover:bg-[#f4f8f5]"
            to="/categories"
          >
            Back
          </Link>
        }
      />

      {isLoading ? (
        <p className="py-8 text-sm text-muted">
          Loading category...
        </p>
      ) : isError ? (
        <p className="py-8 text-sm text-red-600">
          Failed to load category: {error.message}
        </p>
      ) : category ? (
        <CategoryForm
          title="Update Category"
          submitText="Update Category"
         formData={formData}
          onSubmit={handlerSubmit}
          onChange={handlechange} 
          isSubmitting={updateCategory.isPending}
        />
      ) : (
        <p className="py-8 text-sm text-muted">
          Category not found.
        </p>
      )}

      {updateCategory.isError && (
        <p className="mt-4 text-sm text-red-600">
          Failed to update category: {updateCategory.error.message}
        </p>
      )}
    </section>
  );
}

export default EditCategoryPage;

