import {modelos} from "../lib/modelo"
import { useState } from "react";
import "./tetris.css"

export function Piezas() {

   return (
      <div className="tetris">

         {modelos.piezas.map((pieza, piezaIndex) => (

            <div key={piezaIndex} className="pieza">
               <h3>Pieza {pieza.nombre}</h3>
               {pieza.matriz.map((rotacion, rotacionIndex) => (
                  <div key={rotacionIndex} className="rotacion">
                     {rotacion.map((row, rowIndex) => (
                        <div key={rowIndex} className="fila">
                           {row.map((cell, colIndex) => (
                              <div
                                 key={`${rowIndex}-${colIndex}`}
                                 className={`cuadrado background${cell}`}
                              ></div>
                           ))}
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         ))}
      </div>
   );
}
