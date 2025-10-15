// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "../Styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* 🔸 Logo original (sin cambios) */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/The_Simpsons_yellow_logo.svg/1200px-The_Simpsons_yellow_logo.svg.png"
          alt="The Simpsons Logo"
          className="home-logo"
        />

        {/* 🟨 Encabezado */}
        <h1>¡Bienvenido a Springfield!</h1>
        <h3>El lugar donde la diversión nunca termina 🍩</h3>

        {/* 🧠 Descripción */}
        <p className="home-description">
          Explora el mundo de <strong>Los Simpsons</strong>: conoce a los
          personajes más icónicos, descubre los lugares más famosos y revive
          los episodios más divertidos de la familia más querida de la TV.
        </p>

        {/* 🔹 Botones de navegación */}
        <div className="home-buttons">
          <Link to="/personajes" className="btn">
            👨‍👩‍👧‍👦 Personajes
          </Link>
          <Link to="/lugares" className="btn">
            🏠 Lugares
          </Link>
          <Link to="/episodios" className="btn">
            📺 Episodios
          </Link>
        </div>
      </div>

      {/* 🌆 Fondo decorativo opcional */}
      <div className="home-background"></div>
    </div>
  );
}
