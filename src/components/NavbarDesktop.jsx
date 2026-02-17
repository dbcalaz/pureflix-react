import ImagenExterna from "./ImagenExterna";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function NavbarDesktop({
  setVista,
  setTipo,
  user,
  palabra,
  setPalabra,
  setCatSeleccionada,
  setVistaPerfil,
  vista,
  actualizarDatosUsuario,
}) {
  const [datosUsuario, setDatosUsuario] = useState({});
  const [mostrarSearch, setMostrarSearch] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const menuRef = useRef(null);
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

    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMostrarMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutsideMenu);
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
  }, [user?.token, navigate, actualizarDatosUsuario]);

  return (
    <nav className="navbar-desktop">
      <div className="navbar-desktop__left">
        <div className="navbar-desktop__left--logo">
          <ImagenExterna
            nombreImagen="pure.png"
            onClick={() => {
              setVista("home");
              setTipo(0);
              setCatSeleccionada(0);
            }}
          />
        </div>

        <span
          className={vista === "home" ? "active" : ""}
          onClick={() => {
            setVista("home");
            setTipo(0);
            setCatSeleccionada(0);
          }}
        >
          Inicio
        </span>

        <span
          className={vista === "series" ? "active" : ""}
          onClick={() => {
            setVista("series");
            setTipo(2);
            setCatSeleccionada(0);
          }}
        >
          Series
        </span>

        <span
          className={vista === "peliculas" ? "active" : ""}
          onClick={() => {
            setVista("peliculas");
            setTipo(1);
            setCatSeleccionada(0);
          }}
        >
          Películas
        </span>

        <span
          className={vista === "proximos" ? "active" : ""}
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

        <div
          className="navbar-desktop__profile"
          ref={menuRef}
          onClick={() => setMostrarMenu(!mostrarMenu)}
        >
          <ImagenExterna
            className="navbar-desktop__right--foto"
            nombreImagen={datosUsuario?.foto_perfil}
          />
          <span className="navbar-desktop__arrow">▾</span>

          {mostrarMenu && (
            <div className="navbar-desktop__dropdown">
              <button
                onClick={() => {
                  setVista("perfil");
                  setMostrarMenu(false);
                }}
              >
                Mi perfil
              </button>

              <button
                onClick={() => {
                  setVistaPerfil("administrar");
                  setMostrarMenu(false);
                }}
              >
                Administrar cuenta
              </button>

              <hr />

              <button
                onClick={() => {
                  document.cookie = "token=; Max-Age=0; path=/";
                  document.cookie = "nombre_usuario=; Max-Age=0; path=/";
                  document.cookie = "email=; Max-Age=0; path=/";
                  navigate("/login");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarDesktop;
