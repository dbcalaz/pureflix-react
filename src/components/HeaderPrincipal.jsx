import { useEffect, useState } from "react";

function HeaderPrincipal({
  vista,
  setVista,
  setTipo,
  categorias,
  catSeleccionada,
  setCatSeleccionada,
}) {
  const [scrolled, setScrolled] = useState(false);

  const categoriaActiva = categorias.find(
    (c) => c.id === catSeleccionada
  );

  const enHome = vista === "home";
  const enSeries = vista === "series";
  const enPeliculas = vista === "peliculas";
  const hayCategoria = catSeleccionada !== 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const volverAHome = () => {
    setVista("home");
    setTipo(0);
    setCatSeleccionada(0);
  };

  const irASeries = () => {
    setVista("series");
    setTipo(2);
    setCatSeleccionada(0);
  };

  const irAPeliculas = () => {
    setVista("peliculas");
    setTipo(1);
    setCatSeleccionada(0);
  };

  let titulo = "Para ti";

  if (enSeries) titulo = "Series";
  if (enPeliculas) titulo = "Películas";
  if (enHome && hayCategoria) titulo = "Categorías";
  if (vista === "perfil" || vista === "proximos") {
    return null;
  }

  return (
    <div className={`header-principal ${scrolled ? "scrolled" : ""}`}>

      <div className="header-top">
        <h2>{titulo}</h2>
      </div>

      <div className="header-bottom">

        {(!enHome || hayCategoria) && (
          <div className="header-back" onClick={volverAHome}>
            ←
          </div>
        )}

        {enHome && !hayCategoria && (
          <>
            <button
              className="header-pill"
              onClick={irASeries}
            >
              Series
            </button>

            <button
              className="header-pill"
              onClick={irAPeliculas}
            >
              Películas
            </button>

            <button className="header-pill">
              Categorías
            </button>
          </>
        )}

        {enHome && hayCategoria && (
          <button className="header-pill activo">
            {categoriaActiva?.nombre}
          </button>
        )}

        {enSeries && !hayCategoria && (
          <>
            <button className="header-pill activo">
              Series
            </button>

            <button className="header-pill">
              Categorías
            </button>
          </>
        )}

        {enSeries && hayCategoria && (
          <button className="header-pill activo">
            {categoriaActiva?.nombre}
          </button>
        )}

        {enPeliculas && !hayCategoria && (
          <>
            <button className="header-pill activo">
              Películas
            </button>

            <button className="header-pill">
              Categorías
            </button>
          </>
        )}

        {enPeliculas && hayCategoria && (
          <button className="header-pill activo">
            {categoriaActiva?.nombre}
          </button>
        )}

      </div>
    </div>
  );
}

export default HeaderPrincipal;
