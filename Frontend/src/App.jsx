import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Animais from "./Animais";
import Cuidados from "./Cuidados";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="#">
            Zoo System
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Animais
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cuidados">
                  Cuidados
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Animais />} />
          <Route path="/cuidados" element={<Cuidados />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
