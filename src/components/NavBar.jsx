import { useState } from "react";
import ImagenGenerica from "./ImagenGenerica";

function NavBar() {
  const [botones, setBotones] = useState([
    { txt: "Home", img: "home", activo: true },
    { txt: "Series", img: "peliSerie", activo: false },
    { txt: "Películas", img: "peliSerie", activo: false },
    { txt: "Perfil", img: "perfil", activo: false },
    { txt: "Próximos lanzamientos", img: "peliSerie", activo: false },
  ]);
  function actualizaActivo(indice) {
    const nuevosBotones = [];
    botones?.forEach((x, i) => {
      x.activo = i === indice;
      nuevosBotones.push(x);
    });
    setBotones(nuevosBotones);
  }

  return (
    <header>
      <nav className="nav">
        <ul className="nav_ul">
          {botones?.map((b, i) => {
            return (
              <li
                className={b?.activo ? "activo home" : "home"}
                onClick={() => actualizaActivo(i)}
              >
                <div>
                  <ImagenGenerica imagen={b.img} />
                  {b.txt}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
