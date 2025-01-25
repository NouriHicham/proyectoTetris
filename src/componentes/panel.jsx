import {modelos} from "../lib/modelo"
import { useState } from "react";
import "./tetris.css"

export function Panel(){
   const [arrayCasillas, setCasillas] = useState(modelos.matriz);
   
   return(
      <div className="panel">
         {arrayCasillas.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
               <div key={`${rowIndex}-${colIndex}`} className={`cuadrado background${cell}`}></div>
            ))
         )}
      </div>
   );
}