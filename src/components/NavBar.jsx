import Imagen from "./Imagen";

export default function NavBar({
  pestania,
  setPestania,
  setMostrarModalDetalle,
}) {
  function login() {
    console.log("logueando");
    fetch("http://127.0.0.1:8080/loginUser?usr=belen&pass=culo")
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  return (
    <nav
      onClick={() => {
        setMostrarModalDetalle({});
      }}
    >
      <ul>
        <li
          className={pestania === "home" ? "seleccionado" : ""}
          onClick={() => {
            setPestania("home");
          }}
        >
          <Imagen nombreArchivo="home" />
          <div>Home</div>
        </li>
        <li
          className={pestania === "series" ? "seleccionado" : ""}
          onClick={() => {
            setPestania("series");
          }}
        >
          <Imagen nombreArchivo="peliSerieLan" />
          <div>Series</div>
        </li>
        <li
          className={pestania === "peliculas" ? "seleccionado" : ""}
          onClick={() => {
            setPestania("peliculas");
          }}
        >
          <Imagen nombreArchivo="peliSerieLan" />
          <div>Películas</div>
        </li>
        <li
          className={pestania === "prox" ? "seleccionado" : ""}
          onClick={() => {
            setPestania("prox");
          }}
        >
          <Imagen nombreArchivo="peliSerieLan" />
          <div>Próximos Lanzamientos</div>
        </li>
        <li
          className={pestania === "perfil" ? "seleccionado" : ""}
          onClick={() => {
            setPestania("perfil");
          }}
        >
          <Imagen nombreArchivo="perfil" />
          <div
            onClick={() => {
              login();
            }}
          >
            Perfil
          </div>
        </li>
      </ul>
    </nav>
  );
}
