import { imagenes } from "../utils/imagenes";

const ImagenGenerica = ({
  imagen,
  className = "",
  onClick,
  alt = "",
}) => {
  const src = imagenes[imagen];

  if (!src) {
    console.warn(`Imagen "${imagen}" no encontrada`);
    return null;
  }

  return (
    <img
      src={src}
      className={className}
      onClick={onClick}
      alt={alt}
    />
  );
};

export default ImagenGenerica;
