import { useState } from "react";
import { compareAsc, format } from "date-fns";
import "./App.css";

function Header(){
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Tetris</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Puntuacion(props){

  const fechaFormateada = format(props.date, 'dd/MM/yyyy');

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.score}</td>
      <td>{fechaFormateada}</td>
    </tr>
  );
}

function TablaPartidas(){

  const [partidas, setPartidas] = useState([
    {name:"Juan", score: 333, date: new Date(2014, 1, 11)},
    {name:"Jose", score: 523, date: new Date(2012, 12, 11)},
    {name:"Jorge", score: 135, date: new Date(2012, 12, 11)}
  ]);

  function ordenarArray(){
    const arrayOrdenada = partidas.sort((partidaA, partidaB) => partidaB.score - partidaA.score)
    setPartidas([...arrayOrdenada]);
    console.log(partidas);
  }

  function addPartida(props){
    const name = props.name;
    const score = props.score;
    const date = new Date();

    setPartidas(arrayAntiguo =>[...arrayAntiguo, {name: name, score: score, date: date}])
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Puntuación <button className="btn btn-secondary" onClick={ordenarArray}>↑</button></th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
        {partidas.map((partida, index)=>(
          <Puntuacion key={index} name={partida.name} score={partida.score} date={partida.date}/>
          ))}
        </tbody>
      </table>
      <button className="btn btn-secondary" onClick={() => addPartida({ name: "Maria", score: 450})}>Añadir partida</button>
    </>
  );
}

function App() {

  return (
    <>
      <Header></Header>
      <TablaPartidas></TablaPartidas>
    </>
  );
}

export default App;
