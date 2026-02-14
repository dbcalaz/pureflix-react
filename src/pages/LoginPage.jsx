import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FetchPost from "../components/FetchPost";
import ImagenExterna from "../components/ImagenExterna";

const LoginPage = ({ mensajeOk, mensajeError }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const servidor = import.meta.env.VITE_SERVER;
  const puerto = import.meta.env.VITE_PORT;

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estaCargando, setEstaCargando] = useState(false);
  const [usuario, setUsuario] = useState();

  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      setUsuario(null);
      return;
    }
    const validarToken = async () => {
      try {
        const res = await fetch(
          `http://${servidor}:${puerto}/validarToken?token=${token}`,
        );
        if (res.ok) {
          setUsuario({ token: token });
        } else {
          setUsuario(null);
        }
      } catch {
        setUsuario(null);
      }
    };

    validarToken();
  }, []);

  useEffect(() => {
    if (usuario) {
      login(usuario);
      navigate("/");
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombreUsuario || !password) {
      setMensaje("Debe completar todos los campos");
      return;
    }

    setEstaCargando(true);

    try {
      const res = await FetchPost("login", {
        nombre_usuario: nombreUsuario,
        pass: password,
      });

      if (!res.ok) {
        setMensaje("Usuario, contraseña o cuenta no activa");
        return;
      }

      const data = await res.json();

      Object.entries(data).forEach(([key, value]) => {
        setCookie(key, value, 1);
      });
      console.log("login data: ", data);
      login(data);
      navigate("/");
    } catch {
      setMensaje("Error de conexión con el servidor");
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <>
      <div className="login">
        <ImagenExterna
          nombreImagen="logo.svg"
          alt="Pureflix"
          className="login-logo"
        />
        <div>
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__field">
              <label className="login__label" htmlFor="usuario">
                Nombre de usuario
              </label>
              <input
                className="login__input"
                type="text"
                placeholder="Nombre de usuario"
                id="usuario"
                value={nombreUsuario}
                onChange={(e) => {
                  setNombreUsuario(e.target.value);
                  setMensaje("");
                }}
              />
            </div>

            <div className="login__field">
              <label className="login__label" htmlFor="contrasenia">
                Contraseña
              </label>
              <input
                className="login__input"
                type="password"
                placeholder="Contraseña"
                id="contrasenia"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMensaje("");
                }}
              />
            </div>

            {mensaje && <div className="login__error">{mensaje}</div>}

            <button
              className="login__submit"
              type="submit"
              disabled={estaCargando}
            >
              {estaCargando ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <section className="login__secondary">
            <button
              className="login__link"
              onClick={() => navigate("/recuperar")}
              type="button"
            >
              ¿Olvidaste tu contraseña?
            </button>

            <button
              className="login__link"
              onClick={() => navigate("/registro")}
              type="button"
            >
              Registrarse
            </button>
          </section>
          {mensajeOk && <p className="ok">{mensajeOk}</p>}
          {mensajeError && <p className="error">{mensajeError}</p>}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
