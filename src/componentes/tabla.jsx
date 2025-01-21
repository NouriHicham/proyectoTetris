import { useState } from "react";
import { compareAsc, format } from "date-fns";

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


 
export function TablaPartidas(){
  const [partidas, setPartidas] = useState([
      {name:"Juan", score: 333, date: new Date(2014, 1, 11)},
      {name:"Jose", score: 523, date: new Date(2012, 12, 11)},
      {name:"Jorge", score: 135, date: new Date(2012, 12, 11)}
    ]);

   function ordenarArray(){
     const arrayOrdenada = partidas.sort((partidaA, partidaB) => partidaB.score - partidaA.score)
     setPartidas([...arrayOrdenada]);
   }

   function addPartida(props){
     const name = props.name;
     const score = props.score;
     const date = new Date();
 
     setPartidas(arrayAntiguo =>[...arrayAntiguo, {name: name, score: score, date: date}])
   }
 
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
         {partidas.map((partida, index)=>(
           <Puntuacion key={index} name={partida.name} score={partida.score} date={partida.date}/>
           ))}
         </tbody>
       </table>
       <button className="btn btn-secondary" onClick={() => addPartida({ name: "Maria", score: 450})}>Añadir partida</button>
     </>
   );
 }