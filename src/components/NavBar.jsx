import { useState,useEffect } from "react";
import ImagenGenerica from "./ImagenGenerica";

function NavBar({ tipo, setTipo }) {
  const [botones, setBotones] = useState([
    { txt: "Home", mostrar: "home", img: "home", activo: true },
    { txt: "Series", mostrar: "series", img: "peliSerie", activo: false },
    { txt: "Películas", mostrar: "pelis", img: "peliSerie", activo: false },
    { txt: "Perfil", img: "perfil", activo: false },
    { txt: "Próximos lanzamientos", img: "peliSerie", activo: false },
  ]);


  function actualizaActivo(indice) {
    const nuevosBotones = [];
    botones?.forEach((x, i) => {
      x.activo = i === indice;
      nuevosBotones.push(x);
      if (x.activo) setTipo(x.mostrar);
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
                key={"foto_navBar" + i}
                className={b?.activo ? "activo puntero" : "puntero"}
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
        <div onClick={()=>{obtenerPeliculas()}}>HOLA</div>
      </nav>
    </header>
  );
}

export default NavBar;
