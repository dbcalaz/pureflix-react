
export default function Galeria({ contenido, setMostrarModalDetalle }) {
  return (
    <>
      <section className="galeria" id="galeria">
        {contenido.map((c, i) => {
          const src = `/imagenesProductos/${c.imagen}`;
          return <img  key={"imagen_" + i} src={src} alt={c.titulo} onClick={ () => {setMostrarModalDetalle(c)}} />;
        })}
      </section>
    </>
  );
}
