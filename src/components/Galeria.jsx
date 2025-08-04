export default function Galeria({ contenido }) {

  return (
    <section className="galeria" id="galeria">

      {contenido.map((c,i) => {
        console.log(c.imagen)
          const src = `/imagenesProductos/${c.imagen}`
          return <img  key={"imagen_"+i} src={src} alt={c.titulo} />;
      })}


    </section>
  );
}
