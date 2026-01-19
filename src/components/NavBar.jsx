import { useState } from "react";
import ImagenGenerica from "./ImagenGenerica";

function NavBar({ vista, setVista, setTipo }) {
  const [botones, setBotones] = useState([
    { txt: "Home", vista: "home", tipo: 0, img: "home", activo: true },
    { txt: "Series", vista: "series", tipo: 2, img: "peliSerie", activo: false },
    { txt: "Películas", vista: "peliculas", tipo: 1, img: "peliSerie", activo: false },
    { txt: "Perfil", vista: "perfil", img: "perfil", activo: false },
    { txt: "Próximos lanzamientos", vista: "proximos", tipo: 5, img: "peliSerie", activo: false }
  ]);

  function actualizaActivo(indice) {
    const nuevosBotones = botones.map((b, i) => {
      const activo = i === indice;

      if (activo) {
        setVista(b.vista);
        if (b.tipo !== undefined) {
          setTipo(b.tipo);
        }
      }

      return { ...b, activo };
    });

    setBotones(nuevosBotones);
  }

  return (
    <header>
      <nav className="nav">
        <ul className="nav_ul">
          {botones.map((b, i) => (
            <li
              key={"nav_" + i}
              className={b.activo ? "activo puntero" : "puntero"}
              onClick={() => actualizaActivo(i)}
            >
              <div className="imagen">
                <ImagenGenerica imagen={b.img} />
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
