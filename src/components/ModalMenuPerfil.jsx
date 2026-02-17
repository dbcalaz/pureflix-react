import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ModalMenuPerfil({ onClose, setVistaPerfil }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div className="menu-overlay" onClick={onClose}>
      <div className="menu-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="menu-modal__button"
          onClick={() => {
            setVistaPerfil("administrar");
            onClose();
          }}
        >
          Administrar cuenta
        </button>

        <button
          className="menu-modal__button"
          onClick={() => {
            document.cookie = "token=; Max-Age=0; path=/";
            document.cookie = "nombre_usuario=; Max-Age=0; path=/";
            document.cookie = "email=; Max-Age=0; path=/";
            logout();
            navigate("/login");
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default ModalMenuPerfil;
