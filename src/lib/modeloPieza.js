import { modelos } from "./modelo";

class modeloPieza{
   constructor(numero){
      this.numero = numero;
      this.nombre = modelos.piezas[this.numero].nombre;
      this.angulo = 0; //será un número (0,1,2,3) correspondiente a los ángulos 0º, 90º, 180º,270º.
      this.fila = 0;
      this.columna = 1;
      this.matriz = modelos.piezas[this.numero].matriz[this.angulo];
   }

   girar(){
      if(this.angulo==3){
         this.angulo=0
      }else{
         this.angulo++;
      }
      
   }

}

export default modeloPieza;