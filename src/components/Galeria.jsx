import ImagenExterna from "./ImagenExterna";
import { useEffect, useState } from "react";

function Galeria({ tipo, setMostrarModalDetalle, catSeleccionada, palabra }) {
  const servidor = import.meta.env.VITE_SERVER;
  const puerto = import.meta.env.VITE_PORT;
  const [contenido, setContenido] = useState();

  async function obtenerContenido(tipo) {
    try {
      const url = `http://${servidor}:${puerto}/getContenido?tipo=${tipo}&categoria=${catSeleccionada}&palabra=${palabra}&proximo=false`;
      const res = await fetch(url);
      const data = await res.json();
      setContenido(data);
      console.log("Recibiendo", data);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    obtenerContenido(tipo);
  }, [tipo, catSeleccionada, palabra]);

  return (
    <section className="galeria">
      {contenido?.map((p, i) => (
        <div
          key={"foto_" + tipo + "_" + i}
          className="galeria__item"
          onClick={() => setMostrarModalDetalle(p)}
        >
          <ImagenExterna nombreImagen={p.imagen} />
        </div>
      ))}
    </section>
  );
}

export default Galeria;
