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

   const [timerId, setTimerId] = useState(null);

   //añade pieza arriba
   function pintarPieza(){
      const nuevoPanel = arrayCasillas.map((fila) => [...fila]);

      piezaActual.matriz.forEach((fila, i) =>{
         fila.forEach((celda, j) => {
            const dibujaFila = piezaActual.fila + i;
            const dibujaCelda = piezaActual.columna + j;
            
            if (celda !== 0) {
               nuevoPanel[dibujaFila][dibujaCelda] = celda;
            }
         })
      })

      return nuevoPanel;
   }

   function hayColision(pieza = piezaActual) {
      
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
      
   }, [piezaActual, arrayCasillas]);


   function moverDer() {
      //se hace en una copia para evitar hacerlo directamente en la pieza
      const nuevaPieza = { ...piezaActual };
      nuevaPieza.columna += 1;
      if (hayColision(nuevaPieza)) {
         return;
      } else {
         sumarPuntos(10);
         setPiezaactual(nuevaPieza);
      }
   }

   function moverIzq() {
      const nuevaPieza = { ...piezaActual };
      nuevaPieza.columna -= 1;
      if (hayColision(nuevaPieza)) {
         return;
      } else {
         sumarPuntos(10);
         setPiezaactual(nuevaPieza);
      }
   }

   function bajar() {
      const nuevaPieza = { ...piezaActual };
      nuevaPieza.fila += 1;
      if (hayColision(nuevaPieza)) {
         // Si al bajar se produce colisión, la pieza ya no puede bajar más.
         piezaLlegaAbajo();
      } else {
         sumarPuntos(10);
         setPiezaactual(nuevaPieza);
      }
   }

   function girar() {
      //console.log("Girar");
      const nuevaPieza = { ...piezaActual };
      const anguloAnterior = piezaActual.angulo;
      nuevaPieza.angulo +=1;
      if (hayColision()) {
         piezaActual.angulo = anguloAnterior;
         piezaActual.matriz = modelos.piezas[piezaActual.numero].matriz[anguloAnterior];
      } else {
         sumarPuntos(20);
         pintarPieza();
      }
   }

   function iniciarMovimiento(){
      clearInterval(timerId); // Asegurar que no haya múltiples temporizadores
      //const newTimer = setInterval(bajar, 1000);
      setTimerId(newTimer);
   }

   function iniciar(){
      preguntarNombre();
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
      const nuevoTablero = arrayCasillas.map(fila => [...fila]);
      piezaActual.matriz.forEach((fila, i) => {
         fila.forEach((celda, j) => {
            if (celda !== 0) {
               nuevoTablero[piezaActual.fila + i][piezaActual.columna + j] = celda;
            }
         });
      });
      setCasillas(nuevoTablero);

      clearInterval(timerId);

      const nuevaPiezaGenerada = nuevaPieza();
      setPiezaactual(nuevaPiezaGenerada);

      if (hayColision(nuevaPiezaGenerada)) {
         terminarPartida();
      } else {
         iniciarMovimiento();
      }
   } 

   function terminarPartida(){
      console.log(nombre, format(date, 'dd/MM/yyyy'), puntuacion);
      clearInterval(timerId);
      addPartida({ name: nombre, score: puntuacion });
      navigate("/tabla");
   }

   return(
   <>
      <Panel arrayCasillas={pintarPieza()}/>
      <button onClick={iniciar} className="btn btn-secondary mt-3">Jugar</button>
      {/* <Piezas/> */}
   </>
   );
}