import Galeria from "../components/Galeria";
import { useState } from "react";

export default function Series({
  CategoriaBuscador,
  opciones,
  contenido,
  setMostrarModalDetalle,
}) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [filtrarPorTexto, setFiltrarPorTexto] = useState("");

  return (
    <div>
      <CategoriaBuscador
        opciones={opciones}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        setFiltrarPorTexto={setFiltrarPorTexto}
      />
      <Galeria
        contenido={contenido}
        setMostrarModalDetalle={setMostrarModalDetalle}
        categoriaSeleccionada={categoriaSeleccionada}
        filtrarPorTexto={filtrarPorTexto}
      />
    </div>
  );
}
