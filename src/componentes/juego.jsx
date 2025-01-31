import { useState, useEffect } from "react"
import {Panel} from "./panel"
import { Piezas } from "./pieza";
import { nuevaPieza } from "../lib/nuevaPieza";
import {modelos} from "../lib/modelo"

export function Juego(){
   const [arrayCasillas, setCasillas] = useState(modelos.matriz);
   const [piezaActual, setPiezaactual] = useState(null)

   //añade pieza arriba
   function pintarPieza(){
      const pieza = piezaActual || nuevaPieza();
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
            }
            //final de lo que tienes que quitar
 
         })
      })

      setCasillas(nuevoPanel);

   }

   //detectar teclas
   useEffect(() => {
      function Teclas(event){
         switch(event.key) {
            case "ArrowRight":
               moverDer();
               break;
            case "ArrowLeft":
               moverIzq();
               break;
            case "ArrowDown":
               bajar();
               break;
            case "ArrowUp":
               girar();
               break;
            default:
               break;
         }
      };

      window.addEventListener("keydown", Teclas);
      return () => window.removeEventListener("keydown", Teclas);
      
   }, [piezaActual]);

   function moverDer() {
      //console.log("Mover a la derecha");
      if (piezaActual) {
         piezaActual.columna += 1;
         pintarPieza();
      }
   }

   function moverIzq() {
      //console.log("Mover a la izquierda");
      if (piezaActual) {
         piezaActual.columna -= 1;
         pintarPieza();
      }
   }

   function bajar() {
      //console.log("Bajar");
      if (piezaActual) {
         piezaActual.fila += 1;
         pintarPieza();
      }
   }

   function girar() {
      //console.log("Girar");
      if (piezaActual) {
         piezaActual.girar();
         pintarPieza();
      }
   }

   return(
   <>
      <Panel arrayCasillas={arrayCasillas}/>
      <button onClick={pintarPieza}>Insertar Nueva Pieza</button>
      {/* <Piezas/> */}
   </>
   );
}