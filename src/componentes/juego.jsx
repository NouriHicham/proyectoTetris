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
      if (hayColision()) {
         console.log("choque");
         return;
      }

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

   function hayColision() {
      const pieza = piezaActual;

      for (let i = 0; i < pieza.matriz.length; i++) {
         for (let j = 0; j < pieza.matriz[i].length; j++) {
            if (pieza.matriz[i][j] !== 0) { //si la celda de la pieza no esta vacia
               const fila = pieza.fila + i;
               const columna = pieza.columna + j;

               //verificamos si esta fuera del panel
               if (fila >= arrayCasillas.length || columna < 0 || columna >= arrayCasillas[0].length || arrayCasillas[fila][columna] !== 0) {
                  return true;
               }
            }
         }
      }
      return false;
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
      if (hayColision()) {
         piezaActual.columna -= 1;
      } else {
         sumarPuntos(10);
         pintarPieza();
      }
   }

   function moverIzq() {
      //console.log("Mover a la izquierda");
      piezaActual.columna -= 1;
      if (hayColision()) {
         piezaActual.columna += 1;
      } else {
         sumarPuntos(10);
         pintarPieza();
      }
   }

   function bajar() {
      //console.log("Bajar");
      //console.log(piezaActual);
      piezaActual.fila += 1;
      if (hayColision()) {
         piezaActual.fila -= 1;
         piezaLlegaAbajo();
      } else {
         sumarPuntos(10);
         pintarPieza();
      }
   }

   function girar() {
      //console.log("Girar");
      const anguloAnterior = piezaActual.angulo;
      piezaActual.girar();
      if (hayColision()) {
         piezaActual.angulo = anguloAnterior;
         piezaActual.matriz = modelos.piezas[piezaActual.numero].matriz[anguloAnterior];
      } else {
         sumarPuntos(20);
         pintarPieza();
      }
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
      // Verificar si la pieza no puede bajar más
      piezaActual.fila += 1;
      if (hayColision()) {
         piezaActual.fila -= 1;
         // La pieza ha llegado abajo, fijarla en su posición
         const nuevoPanel = arrayCasillas.map((fila) => [...fila]);
         piezaActual.matriz.forEach((fila, i) => {
            fila.forEach((celda, j) => {
               if (celda !== 0) {
                  nuevoPanel[piezaActual.fila + i][piezaActual.columna + j] = celda;
               }
            });
         });
         setCasillas(nuevoPanel);
         // Generar una nueva pieza
         setPiezaactual(nuevaPieza());
         // Verificar si la nueva pieza colisiona al generarse
         if (hayColision()) {
            terminarPartida();
         }
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