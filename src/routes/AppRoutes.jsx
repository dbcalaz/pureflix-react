import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import RegistroPage from "../pages/RegistroPage";
import RecuperarPage from "../pages/RecuperarPage";
import NewPassPage from "../pages/NewPassPage";
import ActivarCuentaPage from "../pages/ActivarCuentaPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/activar-cuenta" element={<ActivarCuentaPage />} />
    <Route path="/registro" element={<RegistroPage />} />
    <Route path="/recuperar" element={<RecuperarPage />} />
    <Route path="/newPass" element={<NewPassPage />} />
    <Route
      path="/"
      element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
