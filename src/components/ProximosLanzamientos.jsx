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
      console.log("Recibiendo", data);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    obtenerContenido();
  }, []);

  return (
    <>
    <h2 className="releases-title">Estrenos de esta semana</h2>
    <section className="releases">
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
    </>
    /*<div className="releases">
      <section className="releases-section releases-section--current">
        <h2 className="releases-title">Estrenos de esta semana</h2>
        <article className="releases-grid" id="releases-current"></article>
      </section>

      <section className="releases-section">
        <h2 className="releases-title">Estrenos de la próxima semana</h2>
        <article className="releases-grid" id="releases-next-week"></article>
      </section>

      <section className="releases-section">
        <h2 className="releases-title">Estrenos del mes que viene</h2>
        <article className="releases-grid" id="releases-next-month"></article>
      </section>

      <section className="releases-section">
        <h2 className="releases-title">En grabación</h2>
        <article className="releases-grid" id="releases-filming"></article>
      </section>
    </div>*/
  );
}

export default ProximosLanzamientos;
