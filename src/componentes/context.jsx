import React, { useContext } from 'react';
import crearcontexo from './crearcontexto';
import { useState } from 'react';


const tablaPartidas = ({ children }) => {

   const [partidasArray, setPartidasArray] = useState([
      {name:"Juan", score: 333, date: new Date(2014, 1, 11)},
      {name:"Jose", score: 523, date: new Date(2012, 12, 11)},
      {name:"Jorge", score: 135, date: new Date(2012, 12, 11)}
   ]);

   function addPartida(props){
   const name = props.name;
   const score = props.score;
   const date = new Date();

   setArray(arrayAntiguo =>[...arrayAntiguo, {name: name, score: score, date: date}])
   }

   return (
      <MyArrayContext.Provider value={{ setArray, addPartida }}>
        {children}
      </MyArrayContext.Provider>
    );
  
};

export default tablaPartidas;