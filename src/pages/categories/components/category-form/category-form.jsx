
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/ui/button";
import Input from "../../../../components/ui/input";
import Textarea from "../../../../components/ui/textarea";



function CategoryForm({
  title,
  submitText,
  initialData,
  onSubmit,
  isSubmitting = false,
  error,
}) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  useEffect(() => {
    setName(initialData?.name ?? "");
    setDescription(initialData?.description ?? "");
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      name,
      description,
    });
  };
   
  const labelClass =
    "grid gap-2 text-[11px] font-extrabold text-[#4c6257]";

  return (
    <section className="max-w-3xl rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_34px_rgba(25,50,37,0.05)]">
      <div className="mb-5">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-muted">
          Category Form
        </p>

        <h3 className="mt-1 text-xl font-bold text-brand-900">
          {title}
        </h3>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className={labelClass}>
          Category Name

          <Input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Living Room"
            required
          />
        </label>

        <label className={labelClass}>
          Description

          <Textarea
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="5"
            placeholder="Sofas, chairs and living room furniture"
            required
          />
        </label>

       {error && (
  <p className="text-sm text-red-600">
    {error}
  </p>
)}

        <div>
          <Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Saving..." : submitText}
</Button>
        </div>
      </form>
    </section>
  );
}

export default CategoryForm;

