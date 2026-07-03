import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import './App.css';
import CriarEnquete from './pages/CriarEnquete';
import Dashboard from './pages/Dashboard';
import Enquetes from './pages/Enquetes';
import ResultadoEnquetePage from './pages/ResultadoEnquete';
import Usuarios from './pages/Usuarios';
import VotarEnquete from './pages/VotarEnquete';

function App() {
    return (
        <BrowserRouter>
            <nav className="top-nav">
                <div className="nav-brand">
                    VoteLive
                </div>

                <div className="nav-links">
                    <NavLink to="/">
                        Dashboard
                    </NavLink>

                    <NavLink to="/enquetes">
                        Enquetes
                    </NavLink>

                    <NavLink to="/enquetes/nova">
                        Criar Enquete
                    </NavLink>

                    <NavLink to="/usuarios">
                        Usuários
                    </NavLink>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/enquetes" element={<Enquetes />} />
                <Route path="/enquetes/nova" element={<CriarEnquete />} />
                <Route path="/enquetes/:id/votar" element={<VotarEnquete />} />
                <Route path="/enquetes/:id/resultado" element={<ResultadoEnquetePage />} />
                <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;