import {modelos} from "../lib/modelo"
import { useState } from "react";
import "./tetris.css"

export function Panel(){
   const [arrayCasillas, setCasillas] = useState(modelos.matriz);
   
   return(
      <div className="panel">
         {arrayCasillas.map((fila, filaIndex) =>
            fila.map((celda, celIndex) => (
               <div key={`${filaIndex}-${celIndex}`} className={`cuadrado background${celda}`}></div>
            ))
         )}
      </div>
   );
}