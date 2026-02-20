import ImagenExterna from "./ImagenExterna";
import { useEffect, useState } from "react";

function Galeria({ tipo, setMostrarModalDetalle, catSeleccionada, palabra }) {
  const servidor = import.meta.env.VITE_SERVER;
  const puerto = import.meta.env.VITE_PORT;
  const [contenido, setContenido] = useState([]);

  async function obtenerContenido(tipo) {
    try {
      const url = `http://${servidor}:${puerto}/getContenido?tipo=${tipo}&categoria=${catSeleccionada}&palabra=${palabra}&proximo=false`;
      const res = await fetch(url);
      const data = await res.json();
      setContenido(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    obtenerContenido(tipo);
  }, [tipo, catSeleccionada, palabra]);

  function dividirEnGrupos(array, tamaño) {
    const grupos = [];
    for (let i = 0; i < array.length; i += tamaño) {
      grupos.push(array.slice(i, i + tamaño));
    }
    return grupos;
  }

   if (contenido.length === 0) {
    return <p className="galeria__sin-contenido">No hay contenido</p>;
   }

  const grupos = dividirEnGrupos(contenido, 4);

  const titulos = [
    "Recomendado para vos",
    "Tendencias",
    "Populares",
    "No te lo pierdas",
    "Descubrí más"
  ];

  return (
    <div className="galeria">
      {grupos.map((grupo, index) => (
        <div key={index} className="galeria__seccion">
          <h2 className="galeria__titulo">
            {titulos[index] || "Más contenido"}
          </h2>

          <div className="galeria__fila">
            {grupo.map((p, i) => (
              <div
                key={"foto_" + tipo + "_" + index + "_" + i}
                className="galeria__item"
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

export default Galeria;
