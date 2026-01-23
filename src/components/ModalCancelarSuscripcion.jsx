function ModalCancelarSuscripcion({
  onConfirmar,
  onCancelar
}) {
  return (
    <div className="perfil-modal">
      <div
        className="perfil-modal__overlay"
        onClick={onCancelar}
      />

      <div className="perfil-modal__contenido">
        <p>¿Estás seguro que querés cancelar la suscripción?</p>

        <div className="perfil-modal__acciones">
          <button onClick={onConfirmar}>
            SÍ
          </button>

          <button onClick={onCancelar}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCancelarSuscripcion;
