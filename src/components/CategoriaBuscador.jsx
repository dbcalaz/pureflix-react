import { useState } from "react";


/*
    <option value="vacio">Seleccionar categoría</option>
            <option value="acción">Acción</option>
            <option value="aventura">Aventura</option>
            <option value="ciencia ficción">Ciencia Ficción</option>
            <option value="comedia">Comedia</option>
            <option value="documentales">Documentales</option>
            <option value="drama">Drama</option>
            <option value="fantasia">Fantasíaaaaaa</option>
            <option value="familiar">Familiar</option>
            <option value="suspenso">Suspenso</option>
            <option value="thriller">Thriller</option>
*/
export default function CategoriaBuscador({opciones}) {

  return (
    <section className="categoria_buscador">
      <article className="categoria">
        <form action="" method="get" className="for_categoria">
          <label htmlFor="categoria">Categorías</label>
          <select name="categoria" id="categoria">
            {opciones?.map( o => {
              return  <option value={o.valor}> {o.nombreAmostrar} </option>})}
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
          />
        </form>
      </article>
    </section>
  );
}
