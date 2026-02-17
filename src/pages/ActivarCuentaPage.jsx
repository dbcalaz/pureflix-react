import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function ActivarCuentaPage() {
  const [searchParams] = useSearchParams();
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("Token inválido");
      return;
    }

    fetch(`http://${servidor}:${puerto}/activar?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        setMensaje("Cuenta activada correctamente. Ya podés iniciar sesión.");
      })
      .catch(() => {
        setError("Error al activar la cuenta");
      });
  }, []);

  return <LoginPage mensajeOk={mensaje} mensajeError={error} setMensajeOk={setMensaje} setMensajeError={setError}/>;
}

export default ActivarCuentaPage;
