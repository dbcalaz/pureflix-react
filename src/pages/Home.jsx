import { useState } from "react";
import Galeria from "../components/Galeria";

export default function Home({
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
