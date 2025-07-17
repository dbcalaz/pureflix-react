import Imagen  from "./Imagen";
import { useState } from "react";

export default function NavBar(){
    const [pestania, setPestania] = useState("home");

    console.log(pestania);
    return(
        <nav>
            <ul>
                <li className={pestania === "home"?"seleccionado":""} onClick={() => {setPestania("home")}}><Imagen nombreArchivo="home"/><div>Home</div></li>
                <li className={pestania === "serie"?"seleccionado":""} onClick={() => {setPestania("serie")}}><Imagen nombreArchivo="peliSerieLan"/><div>Series</div></li>
                <li className={pestania === "pelicula"?"seleccionado":""} onClick={() => {setPestania("pelicula")}}><Imagen nombreArchivo="peliSerieLan"/><div>Películas</div></li>
                <li className={pestania === "perfil"?"seleccionado":""} onClick={() => {setPestania("perfil")}}><Imagen nombreArchivo="perfil"/><div>Perfil</div></li>
                <li className={pestania === "prox"?"seleccionado":""} onClick={() => {setPestania("prox")}}><Imagen nombreArchivo="peliSerieLan"/><div>Próximos Lanzamientos</div></li>
            </ul>
        </nav>
    );
}