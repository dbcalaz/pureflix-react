import { useEffect, useState } from "react";

function Filtros({categorias, setCategorias, catSeleccionda, setCatSeleccionada, setPalabra}) {
  
  useEffect(() => {
    async function obtenerCategorias() {
      try {
        const res = await fetch(`http://127.0.0.1:9000/getCategorias`);
        const data = await res.json();
        setCategorias(data);
      } catch (e) {
        console.log("Error:", e);
      }
    }

    obtenerCategorias();
  }, []);

  return (
    <section className="categoria_buscador">
      <article className="categoria">
        <form className="form_categoria" action="" method="get">
          <label htmlFor="categoria">Categorías {catSeleccionda}</label>
          <select
            name="categoria"
            id="categoria"
            value={catSeleccionda}
            onChange={(e) => {
              setCatSeleccionada(e.target.value);
            }}
          >
            <option value="vacio">Seleccionar categoría</option>
            {categorias?.map((c, i) => {
              return (
                <option key={"categoria_" + i} value={c.id}>
                  {c.descripcion}
                </option>
              );
            })}
          </select>
        </form>
      </article>
      <article className="buscador">
        <form action="" method="get">
          <label htmlFor="buscador"></label>
          <input
            className="search"
            type="search"
            name="buscador"
            id="buscador"
            placeholder="Buscar por nombre"
            onChange={(e) => {
              setPalabra(e.target.value);
            }}
          />
        </form>
      </article>
    </section>
  );
}

export default Filtros;
