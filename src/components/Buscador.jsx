import { useState, useEffect } from "react";
import ImagenExterna from "./ImagenExterna";

const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function Buscador({ setVistaGlobal, setPalabra, palabra }) {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    if (!palabra.trim()) {
      setResultados([]);
      return;
    }

    const getContenido = async () => {
      try {
        const res = await fetch(
          `http://${servidor}:${puerto}/getContenido?tipo=0&categoria=0&palabra=${palabra}`
        );

        const data = await res.json();
        setResultados(data);
      } catch (e) {
        console.log(e);
      }
    };

    const delay = setTimeout(() => {
      getContenido();
    }, 300);

    return () => clearTimeout(delay);
  }, [palabra]);

  return (
    <section className="buscador">
      <div className="buscador__header">
        <button
          className="buscador__back"
          onClick={() => setVistaGlobal("inicio")}
        >
          ←
        </button>

        <input
          type="text"
          className="buscador__input"
          placeholder="Buscar películas o series..."
          value={palabra}
          onChange={(e) => setPalabra(e.target.value)}
          autoFocus
        />
      </div>

      <div className="buscador__resultados">
        {resultados.map((item) => (
          <div key={item.id} className="buscador__item">
            <ImagenExterna nombreImagen={item.imagen} />
            <span className="buscador__titulo">
              {item.nombre}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Buscador;
