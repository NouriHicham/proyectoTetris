import {modelos} from "../lib/modelo"

export function Panel(){
   for(let i=0; i <5; i++){
      return (
         <>
            <div className="cuadrado"></div>
         </>
      );
   }
}

//export function Panel() {
//    const cuadrados = [];
//    for (let i = 0; i < 5; i++) {
//       cuadrados.push(<div key={i} className="cuadrado"></div>);
//    }
//    return <>{cuadrados}</>;
// }
