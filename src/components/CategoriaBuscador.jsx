export default function CategoriaBuscador({opciones, setCategoriaSeleccionada, setFiltrarPorTexto}) {

  return (
    <section className="categoria_buscador">
      <article className="categoria">
        <form action="" method="get" className="for_categoria">
          <label htmlFor="categoria">Categorías</label>
          <select name="categoria" id="categoria" onChange={(e) => {setCategoriaSeleccionada(e.target.value)}}>
            {opciones?.map( (o,i) => {
              return  <option key={"categoria-opcion-"+i} value={o.valor}>{o.nombreAmostrar} </option>})}
          </select>
        </form>
      </article>
      <article className="buscador">
        <form action="" method="get">
          <label htmlFor="buscador"></label>
          <input
            type="search"
            className="search"
            name="buscador"
            id="buscador"
            placeholder="Buscar"
            onChange={(e) => {setFiltrarPorTexto(e.target.value.toLowerCase())}}
          />
        </form>
      </article>
    </section>
  );
}
