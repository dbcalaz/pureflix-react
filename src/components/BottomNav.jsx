import { useState, useEffect } from "react";
import ImagenExterna from "./ImagenExterna";
const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function BottomNav({ vistaGlobal, setVistaGlobal, user }) {

  const [datosUsuario, setDatosUsuario] = useState([]);
  const botones = [
    { key: "inicio", label: "Inicio", icon: "home" },
    { key: "buscar", label: "Buscar", icon: "peliSerie" },
    { key: "proximos", label: "Nuevos", icon: "peliSerie" },
    {
      key: "perfil",
      label: datosUsuario?.nombre_usuario || "Perfil",
      icon: datosUsuario?.foto_perfil,
    },
  ];

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
  }, [user?.token]);

  return (
    <nav className="bottomnav">
      {botones.map((b) => (
        <div
          key={b.key}
          className={`bottomnav__item ${vistaGlobal === b.key ? "active" : ""}`}
          onClick={() => setVistaGlobal(b.key)}
        >
          <ImagenExterna nombreImagen={b.icon + ".png"} />
          <span>{b.label}</span>
        </div>
      ))}
    </nav>
  );
}

export default BottomNav;
