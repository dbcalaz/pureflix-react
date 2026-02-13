import { useEffect, useState } from "react";
import ImagenExterna from "./ImagenExterna";

function NavBar({ vista, setVista, setTipo }) {
  useEffect;
  const [botones, setBotones] = useState([
    { txt: "Home", vista: "home", tipo: 0, img: "home", activo: false },
    {
      txt: "Series",
      vista: "series",
      tipo: 2,
      img: "peliSerie",
      activo: false,
    },
    {
      txt: "Películas",
      vista: "peliculas",
      tipo: 1,
      img: "peliSerie",
      activo: false,
    },
    { txt: "Perfil", vista: "perfil", img: "perfil", activo: false },
    {
      txt: "Próximos lanzamientos",
      vista: "proximos",
      tipo: 5,
      img: "peliSerie",
      activo: false,
    },
  ]);

  useEffect(() => {
    const nuevosBotones = []

    botones.forEach((b) => {
    b.activo= b.vista === vista
    nuevosBotones.push(b);
    });

    setBotones(nuevosBotones);
  }, [vista]);

  function actualizaActivo(indice) {
    const nuevosBotones = botones.map((b, i) => {
      const activo = i === indice;

      if (activo) {
        setearVista(b.vista);
        if (b.tipo !== undefined) {
          setTipo(b.tipo);
        }
      }

      return { ...b, activo };
    });

    setBotones(nuevosBotones);
  }

  function setearVista(v) {
    setVista(v);
    const setCookie = (name, value, min) => {
      const date = new Date();
      date.setTime(date.getTime() + min * 60 * 1000);
      document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    };

    setCookie("vista", v, 1);
  }

  return (
    <header className="navbar">
      <nav className="navbar__nav">
        <ul className="navbar__list">
          {botones.map((b, i) => (
            <li
              key={"nav_" + i}
              className={`navbar__item ${b.activo ? "is-active" : ""}`}
              onClick={() => actualizaActivo(i)}
            >
              <div className="navbar__item-content">
                <ImagenExterna nombreImagen={b.img + ".png"} />
                {b.txt}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
