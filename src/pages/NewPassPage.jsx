import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FetchPut from "../components/FetchPut";

function NewPassPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [newPass, setNewPass] = useState("");
  const [newPassRep, setNewPassRep] = useState("");
  const [error, setError] = useState("");

  async function actualizarContrasena(e) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Token inválido o expirado");
      return;
    }

    if (newPass !== newPassRep) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await FetchPut("actualizarContrasena", {
        token,
        nueva_contrasena: newPass,
        nueva_contrasena_rep: newPassRep,
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.mensaje || "Error al actualizar contraseña");
        return;
      }

      navigate("/login");
    } catch (e) {
      console.error(e);
      setError("Error de conexión");
    }
  }

  return (
    <div className="recover-container">
      <h1>Nueva contraseña</h1>

      <form className="recover-form" onSubmit={actualizarContrasena}>
        <div className="recover-field">
          <label htmlFor="newpass">Nueva contraseña</label>
          <input
            type="password"
            id="newpass"
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>

        <div className="recover-field">
          <label htmlFor="newpassrep">Repetir contraseña</label>
          <input
            type="password"
            id="newpassrep"
            onChange={(e) => setNewPassRep(e.target.value)}
          />
        </div>

        {error && <div className="recover-error">{error}</div>}

        <section className="recover-actions">
          <button
            className="recover-button recover-button--submit"
            type="submit"
            disabled={!newPass || !newPassRep}
          >
            Actualizar contraseña
          </button>

          <button
            className="recover-button recover-button--cancel"
            type="button"
            onClick={() => navigate("/login")}
          >
            Volver
          </button>
        </section>
      </form>
    </div>
  );
}

export default NewPassPage;
