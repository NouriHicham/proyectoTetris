import { useState, useEffect } from "react"
import {Panel} from "./panel"
import { Piezas } from "./pieza";
import { nuevaPieza } from "../lib/nuevaPieza";
import {modelos} from "../lib/modelo"

export function Juego(){
   const [arrayCasillas, setCasillas] = useState(modelos.matriz);
   const [piezaActual, setPiezaactual] = useState(nuevaPieza())

   //añade pieza arriba
   function pintarPieza(){
      const pieza = piezaActual;
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
      console.log("Bajar");
      console.log(piezaActual);
      piezaActual.fila += 1;
      pintarPieza(); 
   }

   function girar() {
      //console.log("Girar");
      piezaActual.girar();
      pintarPieza();
   }

   function iniciarMovimiento(){
      //console.log("Iniciar");
      setInterval(bajar, 1000);
      pintarPieza();
   }

   function iniciar(){
      pintarPieza();
      iniciarMovimiento();
   }

   return(
   <>
      
      <Panel arrayCasillas={arrayCasillas}/>
      <button onClick={iniciar}>Jugar</button>
      {/* <Piezas/> */}
   </>
   );
}