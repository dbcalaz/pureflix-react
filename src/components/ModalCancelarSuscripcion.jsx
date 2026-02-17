import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ModalCancelarSuscripcion({ onConfirmar, onCancelar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="perfil-modal">
      <div
        className="perfil-modal__overlay"
        onClick={() => {
          onCancelar;
        }}
      />

      <div className="perfil-modal__contenido">
        <p>¿Estás seguro que querés cancelar la suscripción?</p>

        <div className="perfil-modal__acciones">
          <button
            onClick={() => {
              (onConfirmar, (document.cookie = "token=; Max-Age=0; path=/"));
              document.cookie = "nombre_usuario=; Max-Age=0; path=/";
              document.cookie = "email=; Max-Age=0; path=/";
              logout();
              navigate("/login");
            }}
          >
            SÍ
          </button>

          <button onClick={onCancelar}>NO</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCancelarSuscripcion;
