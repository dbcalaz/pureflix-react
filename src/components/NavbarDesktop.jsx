import ImagenExterna from "./ImagenExterna";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function NavbarDesktop({ setVista, setTipo, user, palabra, setPalabra }) {
  const [datosUsuario, setDatosUsuario] = useState({});
  const [mostrarSearch, setMostrarSearch] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        cerrarBusqueda();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        cerrarBusqueda();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const cerrarBusqueda = () => {
    setMostrarSearch(false);
    setPalabra("");
  };

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
      return;
    }

    const getDatosUsuario = async () => {
      try {
        const res = await fetch(
          `http://${servidor}:${puerto}/getDatosUsuario?token=${user.token}`,
        );

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setDatosUsuario(data);
      } catch (e) {
        console.error(e);
        navigate("/login");
      }
    };

    getDatosUsuario();
  }, [user?.token, navigate]);

  return (
    <nav className="navbar-desktop">
      <div className="navbar-desktop__left">
        <div className="navbar-desktop__left--logo">
          <ImagenExterna nombreImagen="pure.png" />
        </div>

        <span
          onClick={() => {
            setVista("home");
            setTipo(0);
          }}
        >
          Inicio
        </span>

        <span
          onClick={() => {
            setVista("series");
            setTipo(2);
          }}
        >
          Series
        </span>

        <span
          onClick={() => {
            setVista("peliculas");
            setTipo(1);
          }}
        >
          Películas
        </span>

        <span
          onClick={() => {
            setVista("proximos");
          }}
        >
          Novedades
        </span>
      </div>

      <div className="navbar-desktop__right">
        <div
          ref={searchRef}
          className={`search ${mostrarSearch ? "search--active" : ""}`}
        >
          {mostrarSearch && (
            <input
              type="text"
              value={palabra}
              onChange={(e) => setPalabra(e.target.value)}
              placeholder="Títulos..."
              autoFocus
            />
          )}

          <ImagenExterna
            nombreImagen="lupa.svg"
            onClick={() => setMostrarSearch(true)}
          />
        </div>

        <div className="profile">
          <ImagenExterna
            className="navbar-desktop__right--foto"
            nombreImagen={datosUsuario?.foto_perfil}
          />
          <span className="arrow">▾</span>
        </div>
      </div>
    </nav>
  );
}

export default NavbarDesktop;
