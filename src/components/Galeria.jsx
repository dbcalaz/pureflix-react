import Contenido from "./Contenido";
import ImagenGenerica from "./ImagenGenerica";
import { useEffect, useState } from "react";

function concatenaCosas(c) {
  const todo = [];
  c?.series.forEach((x) => {
    todo.push(x);
  });
  c?.peliculas.forEach((x) => {
    todo.push(x);
  });
  return todo;
}

function Galeria({ tipo, setMostrarModalDetalle }) {

  const [contenido, setContenido] = useState()

  async function obtenerPeliculas() {
    try {
      const res = await fetch(`http://127.0.0.1:9000/getPelis`);
      const data = await res.json();
      setContenido(data);
      console.log("Recibiendo", data);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    obtenerPeliculas();
  }, []);

  let miArray;
  switch (tipo) {
    case "pelis":
      miArray = Contenido.peliculas;
      break;
    case "series":
      miArray = Contenido.series;
      break;
    case "home":
      miArray = concatenaCosas(Contenido);
      break;
    default:
      miArray = [];
  }
  return (
    <>
      <section className="galeria">
        {contenido?.map((p, i) => {
          return (
            <div
              key={"foto_" + tipo + "_" + i}
              className="foto"
              onClick={() => {
                setMostrarModalDetalle(p);
              }}
            >
              <ImagenGenerica imagen={p.imagen.split(".")[0]} />
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Galeria;
