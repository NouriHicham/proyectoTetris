import React, { useContext } from 'react';
import {PartidasContext} from './crearcontexto';
import { useState } from 'react';

const PartidasProvider = ({ children }) => {

   const [partidasArray, setPartidasArray] = useState([
     { name: "Juan", score: 333, date: new Date(2014, 1, 11) },
     { name: "Jose", score: 523, date: new Date(2012, 12, 11) },
     { name: "Jorge", score: 135, date: new Date(2012, 12, 11) }
   ]);
 
   const addPartida = ({ name, score }) => {
     const date = new Date();
     setPartidasArray(prev => [...prev, { name, score, date }]);
   };

   const ordenarArray = () => {
      const arrayOrdenada = [...partidasArray].sort((partidaA, partidaB) => partidaB.score - partidaA.score);
      setPartidasArray(arrayOrdenada);
    };
 
   return (
     <PartidasContext.Provider value={{ partidasArray, addPartida, ordenarArray }}>
       {children}
     </PartidasContext.Provider>
   );

 };
 

export default PartidasProvider;