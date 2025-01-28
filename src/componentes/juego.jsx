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
      pieza.columna = Math.floor(Math.random() * ((modelos.matriz[0].length)-2)) + 1;

      setPiezaactual(pieza);

      const nuevoPanel = arrayCasillas.map((fila) => [...fila]);

      pieza.matriz.forEach((fila, i) =>{
         fila.forEach((celda, j) => {
            const dibujaFila = pieza.fila + i;
            const dibujaCelda = pieza.columna + j;

            nuevoPanel[dibujaFila][dibujaCelda] = celda;
         })
      })

      setCasillas(nuevoPanel);
   }


   return(
   <>
      <Panel arrayCasillas={arrayCasillas}/>
      <Piezas/>
      <button onClick={pintarPieza}>Insertar Nueva Pieza</button>
   </>
   );
}