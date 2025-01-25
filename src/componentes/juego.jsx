import { useState } from "react"
import {Panel} from "./panel"
import { Piezas } from "./pieza";

export function Juego(){

   return(
   <>
      <Panel/>
      <Piezas/>
   </>
   );
}