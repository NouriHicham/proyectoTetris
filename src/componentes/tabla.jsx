import { useContext } from "react";
import { PartidasContext } from "./crearcontexto";
import { format } from "date-fns";

function Puntuacion(props) {
  const fechaFormateada = format(props.date, 'dd/MM/yyyy');

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.score}</td>
      <td>{fechaFormateada}</td>
    </tr>
  );
}

export function TablaPartidas() {
  const { partidasArray, ordenarArray } = useContext(PartidasContext);

  // function ordenarArray() {
  //   const arrayOrdenada = partidasArray.sort((partidaA, partidaB) => partidaB.score - partidaA.score);
  //   setPartidasArray(arrayOrdenada);
  // }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Puntuación <button className="btn btn-secondary" onClick={ordenarArray}>↑</button></th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {partidasArray.map((partida, index) => (
            <Puntuacion key={index} name={partida.name} score={partida.score} date={partida.date} />
          ))}
        </tbody>
      </table>
    </>
  );
}