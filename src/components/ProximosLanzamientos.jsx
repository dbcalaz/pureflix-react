import ImagenExterna from "./ImagenExterna";
import { useEffect, useState } from "react";

function ProximosLanzamientos({setMostrarModalDetalle}) {
  const servidor = import.meta.env.VITE_SERVER;
  const puerto = import.meta.env.VITE_PORT;

  const [contenido, setContenido] = useState();

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

  return (
    <div className="releases">
    <h2 className="releases__title">Próximos lanzamientos</h2>
    <section className="releases__container">
      {contenido?.map((p, i) => (
        <div
          key={"foto_" + i}
          className="releases__item"
          onClick={() => setMostrarModalDetalle(p)}
        >
          <ImagenExterna nombreImagen={p.imagen} />
        </div>
      ))}
    </section>
    </div>
  );
}

export default ProximosLanzamientos;
