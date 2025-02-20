import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Panel } from "./panel";
import { nuevaPieza } from "../lib/nuevaPieza";
import { modelos } from "../lib/modelo";
import { PartidasContext } from "./crearcontexto";
import { format } from "date-fns";

export function Juego(){
   const [arrayCasillas, setCasillas] = useState(modelos.matriz);
   const [piezaActual, setPiezaactual] = useState(nuevaPieza());
   const { addPartida } = useContext(PartidasContext);

   const navigate = useNavigate();

   var puntuacion = 0;
   let nombre = "";
   let date = new Date();

   var timer;

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
      piezaActual.columna += 1;
      sumarPuntos(10);
      pintarPieza();
   }

   function moverIzq() {
      //console.log("Mover a la izquierda");
      piezaActual.columna -= 1;
      sumarPuntos(10);
      pintarPieza();
   }

   function bajar() {
      //console.log("Bajar");
      console.log(piezaActual);
      piezaActual.fila += 1;
      sumarPuntos(10);
      pintarPieza(); 
      piezaLlegaAbajo();
   }

   function girar() {
      //console.log("Girar");
      piezaActual.girar();
      sumarPuntos(20);
      pintarPieza();
   }

   function iniciarMovimiento(){
      //console.log("Iniciar");
      timer = setInterval(bajar, 1000);
      pintarPieza();
   }

   function iniciar(){
      preguntarNombre();
      pintarPieza();
      iniciarMovimiento();
   }

   //sumar puntos
   function sumarPuntos(puntos){
      puntuacion += puntos;
   }

   //preguntar nombre
   function preguntarNombre(){
      while(nombre === "" || nombre === null){
      nombre = prompt("Introduce tu nombre");
      }
   }

   //detectar que la pieza ha llegado abajo
   function piezaLlegaAbajo() {
      if (piezaActual.fila === 19) {
         sumarPuntos(50);
         terminarPartida();
      }
   }

   function terminarPartida(){
      console.log(nombre, format(date, 'dd/MM/yyyy'), puntuacion);
      clearInterval(timer);
      addPartida({ name: nombre, score: puntuacion });
      navigate("/tabla");
   }

   return(
   <>
      <Panel arrayCasillas={arrayCasillas}/>
      <button onClick={iniciar}>Jugar</button>
      {/* <Piezas/> */}
   </>
   );
}