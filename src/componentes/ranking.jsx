import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { PartidasContext } from "./crearcontexto";

function Puntuacion(props){

   const fechaFormateada = format(props.date, 'dd/MM/yyyy');
 
   return (
     <tr>
       <td>{props.name}</td>
       <td>{props.score}</td>
       <td>{fechaFormateada}</td>
     </tr>
   );
 }
 
export function TablaRanking(){
    const { partidasArray } = useContext(PartidasContext);
    const [mejoresPartidas, setMejoresPartidas] = useState([]);
   
    useEffect(() => {
      const tresMejores = [...partidasArray].sort((partidaA, partidaB) => partidaB.score - partidaA.score).slice(0, 3);
      setMejoresPartidas(tresMejores);
    }, [partidasArray]);
   
   return (
    <>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Puntuación</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {mejoresPartidas.map((partida, index) => (
          <Puntuacion key={index} name={partida.name} score={partida.score} date={partida.date} />
        ))}
      </tbody>
    </table>
  </>
   );
 }