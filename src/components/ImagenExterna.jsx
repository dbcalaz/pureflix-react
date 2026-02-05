import { useEffect, useState } from "react";

const ImagenExterna = ({
  nombreImagen,
  className = "",
  onClick,
  alt = "",
}) => {

  const [imagen, setImagen] = useState();

  useEffect(() => {
    if (!nombreImagen) return;

    let tipo="blob"
    if (nombreImagen.endsWith(".svg")) {
      tipo = "svg";
    }

     async function obtenerImagen() {
    try {
      const url = `http://127.0.0.1:9000/getImagen?imagen=${nombreImagen}&tipo=${tipo}`;
      const res = await fetch(url);
      if (tipo === "svg") {
        const data = await res.text();
        const svgBlob = new Blob([data], { type: "image/svg+xml;" });
        
        const imageObjectURL = URL.createObjectURL(svgBlob);
        setImagen(imageObjectURL);
        return;
      }
      const data = await res.blob();
      const imageObjectURL = URL.createObjectURL(data);
      setImagen(imageObjectURL);
    } catch (e) {
      console.log("Error:", e);
    }
  }
  obtenerImagen();
  }, [nombreImagen]);

  return (
    <img
      src={imagen}
      className={className}
      onClick={onClick}
      alt={alt}
    />
  );
};

export default ImagenExterna;