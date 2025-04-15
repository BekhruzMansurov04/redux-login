import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/dashboard";
import Logout from "./pages/logout";
import ProtectedRoute from "./isProtected/ProtectedRoute";
import RegisterPage from "./pages/register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
