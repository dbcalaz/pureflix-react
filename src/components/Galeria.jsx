export default function Galeria({
  contenido,
  setMostrarModalDetalle,
  categoriaSeleccionada,
  filtrarPorTexto
}) {

function usandoFiltroTexto(){
  let devolver =  filtrarPorTexto !== undefined && filtrarPorTexto !== ""
  console.log("Texto:",devolver, filtrarPorTexto)
  return devolver
}

function usandoFiltroCategoria(){
  return categoriaSeleccionada !== "" && categoriaSeleccionada !== "vacio"
}
  return (
    <>
      {categoriaSeleccionada}
      <section className="galeria" id="galeria">
        {contenido.map((c, i) => {
          console.log(c.titulo,filtrarPorTexto, c?.titulo.includes(filtrarPorTexto))
          if (
            usandoFiltroCategoria() &&
            c?.genero.includes(categoriaSeleccionada) ||
            usandoFiltroTexto() && c?.titulo.toLowerCase().includes(filtrarPorTexto) ||
            ! usandoFiltroCategoria() && !usandoFiltroTexto()
          ) {
            const src = `/imagenesProductos/${c.imagen}`;
            return (
              <img
                key={"imagen_" + i}
                src={src}
                alt={c.titulo}
                onClick={() => {
                  setMostrarModalDetalle(c);
                }}
              />
            );
          }
        })}
      </section>
    </>
  );
}
