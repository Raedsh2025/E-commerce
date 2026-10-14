import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardLayout from "./layouts/dashboard-layout";

import ProductsPage from "./pages/products/products-page";
import AddProductPage from "./pages/products/add-product-page";
import EditProductPage from "./pages/products/edit-product-page";

import CategoriesPage from "./pages/categories/categories-page";
import AddCategoryPage from "./pages/categories/add-category-page";
import EditCategoryPage from "./pages/categories/edit-category-page";
import LoginPage from "./pages/auth/login-page";

function App() {
  return (
    <Routes>
      
<Route element={<DashboardLayout />}>
      <Route path="/login" element={<LoginPage />}> 
      
      </Route>
      
        <Route
          path="/"
          element={<Navigate to="/products" replace />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/products/add"
          element={<AddProductPage />}
        />

        <Route
          path="/products/:id/edit"
          element={<EditProductPage />}
        />

        <Route
          path="/categories"
          element={<CategoriesPage />}
        />

        <Route
          path="/categories/add"
          element={<AddCategoryPage />}
        />

        <Route
          path="/categories/:id/edit"
          element={<EditCategoryPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
  