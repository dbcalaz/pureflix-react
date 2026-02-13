function ModalCancelarSuscripcion({ onConfirmar, onCancelar, user }) {
  /*async function cancelarSuscripcion(token) {
    const token = user.token;

    try {
      const url = `http://${servidor}:${puerto}/cancelarSuscripcion?token=${token}`;

      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        console.log(err);
        return;
      }

      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }*/

  return (
    <div className="perfil-modal">
      <div
        className="perfil-modal__overlay"
        onClick={() => {
          (onCancelar, cancelarSuscripcion());
        }}
      />

      <div className="perfil-modal__contenido">
        <p>¿Estás seguro que querés cancelar la suscripción?</p>

        <div className="perfil-modal__acciones">
          <button onClick={onConfirmar}>SÍ</button>

          <button onClick={onCancelar}>NO</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCancelarSuscripcion;
