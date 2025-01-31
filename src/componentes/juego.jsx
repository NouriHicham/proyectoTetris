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
      const pieza = nuevaPieza();
      pieza.columna = Math.floor(Math.random() * 9) + 1;
      setPiezaactual(pieza);

      const nuevoPanel = arrayCasillas.map((fila) => [...fila]);

      pieza.matriz.forEach((fila, i) =>{
         fila.forEach((celda, j) => {
            const dibujaFila = pieza.fila + i;
            const dibujaCelda = pieza.columna + j;

            //esto quitalo mas tarde
            // if(nuevoPanel[dibujaFila][dibujaCelda]==1){
            //    console.log('colision');
            //    return;
            // }else{
            //    nuevoPanel[dibujaFila][dibujaCelda] = celda;
            //    setCasillas(nuevoPanel);
            // }
            //final de lo que tienes que quitar
 
         })
      })

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
      
   }, []);

   function moverDer() {
      console.log("Mover a la derecha");
   }

   function moverIzq() {
      console.log("Mover a la izquierda");
   }

   function bajar() {
      console.log("Bajar");
   }

   function girar() {
      console.log("Girar");
   }

   return(
   <>
      <Panel arrayCasillas={arrayCasillas}/>
      <button onClick={pintarPieza}>Insertar Nueva Pieza</button>
      <Piezas/>
   </>
   );
}