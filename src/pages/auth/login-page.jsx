import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    login.mutate(formData, {
  onSuccess: () => {
    navigate("/");
  },
});
  };

  return (
    <div className="mx-auto mt-16 max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-md border p-2"
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-md border p-2"
            required
          />
        </div>

        {login.isError && (
          <p className="text-sm text-red-600">
            {login.error?.response?.data?.message ||
              "Login failed. Please try again."}
          </p>
        )}

        <button
          type="submit"
          disabled={login.isPending}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {login.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}