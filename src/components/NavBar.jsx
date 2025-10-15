// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/The_Simpsons_yellow_logo.svg/500px-The_Simpsons_yellow_logo.svg.png"
            alt="The Simpsons Logo"
          />
        </Link>

        {/* 🔹 Botón menú (solo móvil) */}
        <div className={`menu-toggle ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* 🔹 Links de navegación */}
      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Inicio
        </Link>
        <Link to="/personajes" onClick={closeMenu}>
          Personajes
        </Link>
        <Link to="/lugares" onClick={closeMenu}>
          Lugares
        </Link>
        <Link to="/episodios" onClick={closeMenu}>
          Episodios
        </Link>
      </div>
    </nav>
  );
}
