import ImagenExterna from "./ImagenExterna";
import { useEffect, useState } from "react";

function ProximosLanzamientos({ setMostrarModalDetalle, setVistaGlobal }) {
  const servidor = import.meta.env.VITE_SERVER;
  const puerto = import.meta.env.VITE_PORT;

  const [contenido, setContenido] = useState([]);

  async function obtenerContenido() {
    try {
      const url = `http://${servidor}:${puerto}/getContenido?proximo=true`;
      const res = await fetch(url);
      const data = await res.json();
      setContenido(data);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    obtenerContenido();
  }, []);

  function dividirEnGrupos(array, tamaño) {
    const grupos = [];
    for (let i = 0; i < array.length; i += tamaño) {
      grupos.push(array.slice(i, i + tamaño));
    }
    return grupos;
  }

  const grupos = dividirEnGrupos(contenido, 4);

  const titulos = [
    "Estrenos de esta semana",
    "Lanzamientos próximos",
    "Muy pronto",
    "En producción",
    "Próximamente"
  ];

  return (
    <div className="releases">

      <div className="releases__header">
        <button
          className="releases__back"
          onClick={() => setVistaGlobal("inicio")}
        >
          <ImagenExterna nombreImagen="arrowback.svg"/>
        </button>

        <h1 className="releases__main-title">
          Novedades
        </h1>
      </div>

      {grupos.map((grupo, index) => (
        <div key={index} className="releases__section">
          <h2 className="releases__title">
            {titulos[index] || "Próximamente"}
          </h2>

          <div className="releases__container">
            {grupo.map((p, i) => (
              <div
                key={"foto_" + index + "_" + i}
                className="releases__item"
                onClick={() => setMostrarModalDetalle(p)}
              >
                <ImagenExterna nombreImagen={p.imagen} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProximosLanzamientos;
