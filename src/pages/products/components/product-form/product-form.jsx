import Button from "../../../../components/ui/button";
import Input from "../../../../components/ui/input";
import Select from "../../../../components/ui/select";
import Textarea from "../../../../components/ui/textarea";

import { useCategories } from "../../../../hooks/useCategories";

function ProductForm({
  title,
  submitText,
  formData = {
    name: "",
    price: "",
    categoryId: "",
    imageUrl: "",
    description: "",
  },
  onChange,
  onSubmit,
  isPending = false,
  error,
})  {
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
  } = useCategories();

  const labelClass = "grid gap-2 text-[11px] font-extrabold text-[#4c6257]";

  return (
    <section className="max-w-3xl rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_34px_rgba(25,50,37,0.05)]">
      {" "}
      <div className="mb-5">
        {" "}
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-muted">
          Product Form{" "}
        </p>
        <h3 className="mt-1 text-xl font-bold text-brand-900">{title}</h3>
      </div>
      <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
        <label className={labelClass}>
          Product Name
          <Input
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Stylish Soft Chair"
            required
          />
        </label>

        <label className={labelClass}>
          Price
          <Input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={onChange}
            placeholder="20"
            required
          />
        </label>

        <label className={labelClass}>
          Category
          <Select
            name="categoryId"
            value={formData.categoryId}
            onChange={onChange}
            required
          >
            <option value="" disabled>
              {isLoadingCategories
                ? "Loading categories..."
                : "Select category"}
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          {isCategoriesError && (
            <span className="text-red-600">
              Failed to load categories: {categoriesError.message}
            </span>
          )}
        </label>

        <label className={labelClass}>
          Image URL
          <Input
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={onChange}
            placeholder="https://..."
          />
        </label>

        <label className={`${labelClass} col-span-2`}>
          Description
          <Textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={onChange}
            placeholder="Product description..."
          />
        </label>

        {error && <p className="col-span-2 text-sm text-red-600">{error}</p>}

        <div className="col-span-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : submitText}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
