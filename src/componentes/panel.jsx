import { useState } from "react";
import "./tetris.css"

export function Panel(prop){
   
   return(
      <div className="panel">
         {prop.arrayCasillas.map((fila, filaIndex) =>
            fila.map((celda, celIndex) => (
               <div key={`${filaIndex}-${celIndex}`} className={`cuadrado background${celda}`}></div>
            ))
         )}
      </div>
   );
}