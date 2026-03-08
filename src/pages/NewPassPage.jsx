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
  const [condiciones, setCondiciones] = useState({
    mayuscula: false,
    minuscula: false,
    numero: false,
    especial: false,
    largo: false,
  });

  useEffect(() => {
    if (newPass && newPassRep && newPass !== newPassRep) {
      setError("Las contraseñas no coinciden");
    } else {
      setError("");
    }
  }, [newPass, newPassRep]);

  function evaluarPassword(value) {
    setCondiciones({
      mayuscula: /[A-Z]/.test(value),
      minuscula: /[a-z]/.test(value),
      numero: /\d/.test(value),
      especial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      largo: value.length >= 8,
    });
  }

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
    <div className="recover">
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
              onFocus={() => setMostrarCondiciones(true)}
              onChange={(e) => {
                const value = e.target.value;
                setNewPass(value);
                evaluarPassword(value);
              }}
            />
            {mostrarCondiciones && (
              <div className="password-check">
                <p className={condiciones.mayuscula ? "okey" : ""}>
                  • 1 mayúscula
                </p>
                <p className={condiciones.minuscula ? "okey" : ""}>
                  • 1 minúscula
                </p>
                <p className={condiciones.numero ? "okey" : ""}>• 1 número</p>
                <p className={condiciones.especial ? "okey" : ""}>
                  • 1 carácter especial
                </p>
                <p className={condiciones.largo ? "okey" : ""}>
                  • mínimo 8 caracteres
                </p>
              </div>
            )}
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
    </div>
  );
}

export default NewPassPage;
