import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'
import tablaPartidas from "./componentes/context";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <tablaPartidas>
            <App />
        </tablaPartidas>
    </React.StrictMode>
)
