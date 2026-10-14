import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./components/category-form/category-form";
import PageHeader from "../../components/page-header/page-header";
import { useAddCategory } from "../../hooks/useCategories";

  



function AddCategoryPage() {

const navigate = useNavigate();
const addCategory = useAddCategory();

const [formData, setFormData] = useState({
  name: "",
  description: "",
});


const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData((previousData) => ({
    ...previousData,
    [name]: value,
  }));
};

const handleSubmit = (event) => {
  event.preventDefault();

addCategory.mutate(formData, {
  onSuccess: () => {
    navigate("/categories");
  },
  
});
};
  return (
    <section>
      <PageHeader
        eyebrow="Categories"
        title="Add Category"
        description="The form UI is ready. Students will connect POST with React Query."
        action={
          <Link
            className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-extrabold text-[#354a40] transition hover:bg-[#f4f8f5]"
            to="/categories"
          >
            Back
          </Link>
        }
      />

   <CategoryForm
  formData={formData}
  onChange={handleChange}
  onSubmit={handleSubmit}
  isPending={addCategory.isPending}
/>
    </section>
  );
}

export default AddCategoryPage;
