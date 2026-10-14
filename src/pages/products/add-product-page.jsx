import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageHeader from "../../components/page-header/page-header";
import ProductForm from "./components/product-form/product-form";
import { useAddProduct } from "../../hooks/useProducts";

function AddProductPage() {
const navigate = useNavigate();
const addProduct = useAddProduct();

const [formData, setFormData] = useState({
name: "",
price: "",
categoryId: "",
imageUrl: "",
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


const productData = {
  ...formData,
  price: Number(formData.price),
  categoryId: Number(formData.categoryId),
};

addProduct.mutate(productData, {
  onSuccess: () => {
    navigate("/products");
  },
});


};

return ( <section>
<PageHeader
eyebrow="Products"
title="Add Product"
description="Create a new product."
action={ <Link
         className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-extrabold text-[#354a40] transition hover:bg-[#f4f8f5]"
         to="/products"
       >
Back </Link>
}
/>


 <ProductForm
  title="Create Product"
  submitText="Add Product"
  formData={formData}
  onChange={handleChange}
  onSubmit={handleSubmit}
  isPending={addProduct.isPending}
  error={
    addProduct.isError
      ? `Failed to add product: ${addProduct.error.message}`
      : ""
  }

  />
</section>


);
}

export default AddProductPage;
