import ImagenGenerica from "./ImagenGenerica";
import { useEffect, useState } from "react";

function Galeria({ tipo, setMostrarModalDetalle, catSeleccionada, palabra }) {
  const [contenido, setContenido] = useState();

  async function obtenerContenido(tipo) {
    try {
      const url = `http://127.0.0.1:9000/getContenido?tipo=${tipo}&categoria=${catSeleccionada}&palabra=${palabra}`;
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
              <ImagenGenerica
                imagen={p.imagen.split(".")[0]}
              />
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Galeria;
