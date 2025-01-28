import { useState } from "react"
import {Panel} from "./panel"
import { Piezas } from "./pieza";
import { nuevaPieza } from "../lib/nuevaPieza";
import {modelos} from "../lib/modelo"

export function Juego(){
   const [arrayCasillas, setCasillas] = useState(modelos.matriz);
   const [piezaActual, setPiezaactual] = useState(null)

   function pintarPieza(){
      const pieza = nuevaPieza();
      pieza.columna = Math.floor(Math.random() * 9) + 1;
      setPiezaactual(pieza);

      const nuevoPanel = arrayCasillas.map((fila) => [...fila]);

      pieza.matriz.forEach((fila, i) =>{
         fila.forEach((celda, j) => {
            const dibujaFila = pieza.fila + i;
            const dibujaCelda = pieza.columna + j;

            //esto quitalo mas tarde
            if(nuevoPanel[dibujaFila][dibujaCelda]==1){
               console.log('colision');
               return;
            }else{
               nuevoPanel[dibujaFila][dibujaCelda] = celda;
               setCasillas(nuevoPanel);
            }
            //final de lo que tienes que quitar
 
         })
      })

      
   }


   return(
   <>
      <Panel arrayCasillas={arrayCasillas}/>
      <button onClick={pintarPieza}>Insertar Nueva Pieza</button>
      <Piezas/>
   </>
   );
}