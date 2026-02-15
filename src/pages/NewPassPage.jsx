import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FetchPut from "../components/FetchPut";

function NewPassPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [newPass, setNewPass] = useState(""); 
  const [newPassRep, setNewPassRep] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

   useEffect(() => {
    if (newPass && newPassRep && newPass !== newPassRep) {
      setError("Las contraseñas no coinciden");
    } else {
      setError("");
    }
  }, [newPass, newPassRep]);

  async function actualizarContrasena(e) {
    e.preventDefault();
    setError("");
    setOk("");

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

      setOk("Se cambió la contraseña correctamente.");
      navigate("/login");
    } catch (e) {
      console.error(e);
      setError("Error de conexión");
    }
  }

  return (
    <div className="recover__container">
      <h1 className="recover__title">Nueva contraseña</h1>

      <form className="recover__form" onSubmit={actualizarContrasena}>
        <div className="recover__field">
          <label htmlFor="newpass" className="recover__label">
            Nueva contraseña
          </label>
          <input
            type="password"
            id="newpass"
            placeholder="Ingrese nueva contreseña"
            value={newPass}
            className="recover__input"
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>

        <div className="recover__field">
          <label htmlFor="newpassrep" className="recover__label">
            Repetir contraseña
          </label>
          <input
            type="password"
            id="newpassrep"
            placeholder="Repita nueva contraseña"
            value={newPassRep}
            className="recover__input"
            onChange={(e) => setNewPassRep(e.target.value)}
          />
        </div>

        {error && <p className="recover__error">{error}</p>}
        {ok && <p className="recover__ok">{ok}</p>}

        <section className="recover__actions">
          <button
            className="recover__button recover__button--submit"
            type="submit"
            disabled={!newPass || !newPassRep}
          >
            Actualizar contraseña
          </button>

          <button
            className="recover__button recover__button--cancel"
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
