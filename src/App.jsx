import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import {TablaPartidas} from "./componentes/tabla";
import {Vista} from "./componentes/intro"
import {TablaRanking} from "./componentes/ranking";
import {Juego} from "./componentes/juego";
import PartidasProvider from "./componentes/context";


const App = () => {
    return(
      <PartidasProvider>
        <Router>
          <div className="container">
            <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/juego">Jugar</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/tabla">Partidas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/ranking">Ranking</Link></li>
                </ul>
            </header>
          </div>
          <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Vista/>} />
            <Route path="/tabla" element={<TablaPartidas/>} />
            <Route path="/ranking" element={<TablaRanking/>} />
            <Route path="/juego" element={<Juego/>}/>
          </Routes>
        </div>
        </Router>
      </PartidasProvider>
    );
  };

export default App;
