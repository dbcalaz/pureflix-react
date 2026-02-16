import { useEffect, useState } from "react";

const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function ModalCategorias({
  catSeleccionada,
  setCatSeleccionada,
  onClose,
}) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    async function obtenerCategorias() {
      try {
        const res = await fetch(
          `http://${servidor}:${puerto}/getCategorias`
        );
        const data = await res.json();
        setCategorias(data);
      } catch (e) {
        console.log("Error:", e);
      }
    }

    obtenerCategorias();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="modal-categorias" onClick={onClose}>
      <div
        className="modal-categorias__contenedor"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-categorias__titulo">
          Categorías
        </h2>

        <ul className="modal-categorias__lista">
          {categorias.map((c) => (
            <li
              key={c.id}
              className={`modal-categorias__item ${
                catSeleccionada === c.id
                  ? "modal-categorias__item--activa"
                  : ""
              }`}
              onClick={() => {
                setCatSeleccionada(c.id);
                onClose();
              }}
            >
              {c.descripcion}
            </li>
          ))}
        </ul>

        <button
          className="modal-categorias__cerrar"
          onClick={onClose}
        >
          Inicio
        </button>
      </div>
    </div>
  );
}

export default ModalCategorias;
