import {modelos} from "../lib/modelo"
import { useState } from "react";
import "./tetris.css"
import { nuevaPieza } from "../lib/nuevaPieza";

export function Piezas() {
   const pieza = nuevaPieza();
   console.log(pieza.numero) // 1 (un numero aleatorio, en este caso corresponde a la segunda pieza de modelos.piezas)
   console.log(pieza.nombre) // "L"
   console.log(pieza.angulo) // 0
   console.log(pieza.fila, pieza.columna) // 0,1
   console.log(pieza.matriz)  // [[2,0],[2,0],[2,2]]
   console.log(pieza.girar()) // [[2,2,2],[2,0,0]]

   // return (
   //    <div className="tetris">

   //       {modelos.piezas.map((pieza, piezaIndex) => (

   //          <div key={piezaIndex} className="pieza">
   //             <h3>Pieza {pieza.nombre}</h3>
   //             {pieza.matriz.map((rotacion, rotacionIndex) => (
   //                <div key={rotacionIndex} className="rotacion">
   //                   {rotacion.map((row, rowIndex) => (
   //                      <div key={rowIndex} className="fila">
   //                         {row.map((cell, colIndex) => (
   //                            <div
   //                               key={`${rowIndex}-${colIndex}`}
   //                               className={`cuadrado background${cell}`}
   //                            ></div>
   //                         ))}
   //                      </div>
   //                   ))}
   //                </div>
   //             ))}
   //          </div>
   //       ))}
   //    </div>
   // );
}
