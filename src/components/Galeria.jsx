import ImagenGenerica from "./ImagenGenerica";
import { useEffect, useState } from "react";


function Galeria({ tipo, setMostrarModalDetalle }) {

  const [contenido, setContenido] = useState()

  async function obtenerPeliculas(tipo) {
    try {
      const res = await fetch(`http://127.0.0.1:9000/getPelis?tipo=${tipo}`);
      const data = await res.json();
      setContenido(data);
      console.log("Recibiendo", data);
    } catch (e) {
      console.log("Error:", e);
    }
  }


    useEffect(() => {
    obtenerPeliculas(tipo);
  }, [tipo]);
 
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
