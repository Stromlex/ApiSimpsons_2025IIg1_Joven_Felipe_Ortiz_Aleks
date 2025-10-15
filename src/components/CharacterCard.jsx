import { Link } from "react-router-dom";
import "../Styles/charatersCards.css";


export default function CharacterCard({ character }) {
  // 🧩 Base del CDN oficial
  const CDN = "https://cdn.thesimpsonsapi.com/500";

  // 🖼️ URL segura para la imagen
  const imageUrl =
    character.portrait_path?.startsWith("http")
      ? character.portrait_path
      : `${CDN}/${(character.portrait_path || "").replace(/^\/+/, "")}`;

  // 🧠 Traducciones
  const translateStatus = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "alive") return "Vivo";
    if (s === "dead") return "Muerto";
    if (s === "deceased") return "Fallecido";
    return "Desconocido";
  };

  const translateOccupation = (occupation) => {
    const o = (occupation || "").toLowerCase();
    const dic = {
      "safety inspector": "Inspector de seguridad",
      housewife: "Ama de casa",
      student: "Estudiante",
      teacher: "Profesor(a)",
      bartender: "Cantinero",
      "police officer": "Oficial de policía",
      retired: "Jubilado",
      doctor: "Doctor(a)",
      mayor: "Alcalde",
      unknown: "Desconocido",
    };
    return dic[o] || occupation || "Sin información";
  };

  // Datos traducidos
  const status = translateStatus(character.status);
  const occupation = translateOccupation(character.occupation);
  const age = character.age || "Desconocida";
  const name = character.name || "Desconocido";

  // 🎨 Colores del estado
  const statusColor =
    status === "Vivo"
      ? "status-alive"
      : status === "Muerto" || status === "Fallecido"
      ? "status-dead"
      : "status-unknown";

  return (
    <div className="character-card">
      <div className="card-image">
  <img
    src={imageUrl}
    alt={name}
    loading="lazy"
    onError={(e) => {
      e.currentTarget.src =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/The_Simpsons_yellow_logo.svg/500px-The_Simpsons_yellow_logo.svg.png";
    }}
  />
</div>


      <div className="card-content">
        <h3>{name}</h3>
        <p className="occupation">{occupation}</p>

        <div className="card-info">
          <span>Edad: {age}</span>
          <span className={statusColor}>{status}</span>
        </div>

        <Link to={`/personaje/${character.id}`} className="btn-detail">
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
