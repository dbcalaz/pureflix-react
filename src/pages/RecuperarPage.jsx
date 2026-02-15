import { useState } from "react";
import FetchPost from "../components/FetchPost";
import { useNavigate } from "react-router-dom";

function RecuperarPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function envioEmailRecuperacion(e) {
    e.preventDefault();

    setError("");
    setOk("");

    const datos = {
      email: email,
      nombre_usuario: nombreUsuario,
    };

    try {
      const res = await FetchPost("recuperarContrasena", datos);

      if (!res.ok) {
        const err = await res.json();
        setError(err.mensaje || "Error al enviar email de recuperación");
        return;
      }

      setOk("Se envió el email de recuperación correctamente.");
      setEmail("");
      setNombreUsuario("");

    } catch (e) {
      setError("Error de conexión");
    }
  }

  return (
    <div className="recover">
      <div className="recover__container">

        <h1 className="recover__title">
          Reestablecer contraseña
        </h1>

        <form className="recover__form" onSubmit={envioEmailRecuperacion}>

          <div className="recover__field">
            <label htmlFor="email" className="recover__label">
              E-mail
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="recover__input"
              placeholder="Ingrese email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="recover__field">
            <label htmlFor="usuario" className="recover__label">
              Nombre de usuario
            </label>

            <input
              type="text"
              id="usuario"
              name="usuario"
              className="recover__input"
              placeholder="Ingrese nombre de usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </div>

          {error && <p className="recover__error">{error}</p>}
          {ok && <p className="recover__ok">{ok}</p>}

          <div className="recover__actions">

            <button
              type="submit"
              className="recover__button recover__button--submit"
              disabled={!email || !nombreUsuario}
            >
              Enviar email
            </button>

            <button
              type="button"
              className="recover__button recover__button--cancel"
              onClick={() => navigate("/login")}
            >
              Volver
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default RecuperarPage;
