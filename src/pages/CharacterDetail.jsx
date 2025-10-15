import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styles/charactersDetail.css";


export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        // ✅ Usar backticks para interpolar el ID correctamente
        const res = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`);
        const data = await res.json();
        setCharacter(data);
      } catch (error) {
        console.error("Error al obtener el personaje:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <p className="loading">Cargando...</p>;
  if (!character) return <p className="error">No se encontró el personaje</p>;

  // ✅ Imagen desde CDN con template string
  const imageUrl = `https://cdn.thesimpsonsapi.com/1280${character.portrait_path}`;

  // Traducciones
  const translateStatus = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "alive") return "Vivo";
    if (s === "dead") return "Muerto";
    if (s === "deceased") return "Fallecido";
    return "Desconocido";
  };

  const translateGender = (gender) => {
    if (!gender) return "Desconocido";
    return gender.toLowerCase() === "male"
      ? "Masculino"
      : gender.toLowerCase() === "female"
      ? "Femenino"
      : "Desconocido";
  };

  const translateOccupation = (occupation) => {
    const o = (occupation || "").toLowerCase();
    const dic = {
      "safety inspector": "Inspector de seguridad",
      unemployed: "Desempleado(a)",
      student: "Estudiante",
      teacher: "Profesor(a)",
      bartender: "Cantinero",
      doctor: "Doctor(a)",
      mayor: "Alcalde",
      unknown: "Desconocido",
    };
    return dic[o] || occupation || "Desconocido";
  };

  const status = translateStatus(character.status);
  const gender = translateGender(character.gender);
  const occupation = translateOccupation(character.occupation);

  return (
  <div className="detail-bg">
    <div className="detail-wrapper">
      {/* Imagen + Datos básicos */}
      <div className="detail-header">
        <div className="detail-photo">
          <img src={imageUrl} alt={character.name} className="detail-image" />
        </div>

        <div className="detail-info">
          <h2>{character.name}</h2>
          <p className="occupation">{occupation}</p>
          <div className="info-tags">
            <span className={`tag ${status === "Vivo" ? "alive" : "dead"}`}>{status}</span>
            <span className="tag">{gender}</span>
            <span className="tag">{character.age ? `${character.age} años` : "Edad desconocida"}</span>
          </div>
        </div>
      </div>

      {/* Tarjetas con información */}
      <div className="detail-body">
        {character.description && (
          <div className="card-section fade-up">
            <h3>📝 Descripción</h3>
            <p>{character.description}</p>
          </div>
        )}

        {character.phrases && character.phrases.length > 0 && (
          <div className="card-section fade-up">
            <h3>💬 Frases icónicas</h3>
            <div className="phrases-grid">
              {character.phrases.map((p, i) => (
                <div className="phrase-card" key={i}>“{p}”</div>
              ))}
            </div>
          </div>
        )}

        {character.first_appearance_ep && (
          <div className="card-section fade-up">
            <h3>🎬 Primera aparición</h3>
            <ul>
              <li><strong>Episodio:</strong> {character.first_appearance_ep.name}</li>
              <li><strong>Temporada:</strong> {character.first_appearance_ep.season}</li>
              <li><strong>Emitido el:</strong> {character.first_appearance_ep.airdate}</li>
              <li><strong>Sinopsis:</strong> {character.first_appearance_ep.synopsis}</li>
            </ul>
          </div>
        )}
      </div>

      <div className="detail-footer">
        <Link to="/personajes" className="btn-back">← Volver a personajes</Link>
      </div>
    </div>
  </div>
);
}
