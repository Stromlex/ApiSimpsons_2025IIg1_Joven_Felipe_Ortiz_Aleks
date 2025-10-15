import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Locations from "./pages/Locations";
import Episodes from "./pages/Episodes";

function App() {
  return (
    <Router>
      {/* Navbar siempre visible */}
      <Navbar />

      {/* Contenedor principal */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personajes" element={<Characters />} />
          <Route path="/personaje/:id" element={<CharacterDetail />} />
          <Route path="/lugares" element={<Locations />} />
          <Route path="/episodios" element={<Episodes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;