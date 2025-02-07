import { createContext, useState } from "react";
import { compareAsc, format } from "date-fns";
import tablaPartidas from "./context";
import { useContext } from "react";

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
  
   function ordenarArray(){
     const arrayOrdenada = partidas.sort((partidaA, partidaB) => partidaB.score - partidaA.score)
     setPartidas([...arrayOrdenada]);
   }
 
   const { array, setArray } = useContext(tablaPartidas);

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
         {array.map((partida, index)=>(
           <Puntuacion key={index} name={partida.name} score={partida.score} date={partida.date}/>
           ))}
         </tbody>
       </table>
     </>
   );
 }