import { useState } from "react";
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

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.score}</td>
      <td>{props.date}</td>
    </tr>
  );
}

function TablaPartidas(){
  

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Puntuación <button className="btn btn-secondary">↑</button></th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
        {partidas.map((partida, index)=>(
          <Puntuacion key={index} name={partida.name} score={partida.score} date={partida.date}/>
          ))}
        </tbody>
      </table>
    </>
  );
}

function ordenarArray(){
  
}

const partidas = [
  {name:"Juan", score:"333", date:"25-04-2011"},
  {name:"Jose", score:"523", date:"12-02-2012"},
  {name:"Jorge", score:"135", date:"23-06-2011"}
];

function App() {

  return (
    <>
      <Header></Header>
      <TablaPartidas></TablaPartidas>
    </>
  );
}

export default App;
