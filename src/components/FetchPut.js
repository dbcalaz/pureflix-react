const FetchPut = async (url, datos) => {
  const servidor = import.meta.env.VITE_SERVER;
  const puerto = import.meta.env.VITE_PORT;

  try {
    const res = await fetch(`http://${servidor}:${puerto}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(datos),
    });

    if (!res.ok) {
      console.log("Error en FetchPut:", res.status);
    }

    return res;
  } catch (error) {
    console.error("Error en FetchPut:", error, servidor, puerto);
    throw error;
  }
};

export default FetchPut;
