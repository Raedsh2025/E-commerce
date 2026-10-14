import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/sidebar";
import Topbar from "../components/topbar/topbar";
import { getToken } from "../utils/token-storage";
import { Navigate } from "react-router-dom";


function DashboardLayout() {
  const token =
  getToken();
if (!token) {
  return (
    <Navigate
      to="/login"
      replace
    />
  );
}

  return (
    <div className="flex h-screen w-full overflow-hidden bg-page">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </section>
    </div>
  );
}

export default DashboardLayout;
