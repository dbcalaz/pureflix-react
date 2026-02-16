import ImagenExterna from "./ImagenExterna";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function NavbarDesktop({ setVista, setTipo, user }) {
  const [datosUsuario, setDatosUsuario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
      return;
    }

    const getDatosUsuario = async () => {
      try {
        const res = await fetch(
          `http://${servidor}:${puerto}/getDatosUsuario?token=${user.token}`
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
        <ImagenExterna nombreImagen="lupa.svg" />

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
