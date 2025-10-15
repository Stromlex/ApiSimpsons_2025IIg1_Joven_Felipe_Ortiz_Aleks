import React from "react";
import "../Styles/locationCard.css"; // 🔹 Crea este CSS si aún no existe

export default function LocationCard({ location }) {
  // 🧩 Base del CDN
  const CDN = "https://cdn.thesimpsonsapi.com/500";

  // 🖼️ Generar URL segura
  const imageUrl = location.image_path
    ? `${CDN}/${(location.image_path || "").replace(/^\/+/, "")}`
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/The_Simpsons_yellow_logo.svg/500px-The_Simpsons_yellow_logo.svg.png";

  return (
    <div className="location-card">
      <div className="location-image">
        <img
          src={imageUrl}
          alt={location.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/The_Simpsons_yellow_logo.svg/500px-The_Simpsons_yellow_logo.svg.png";
          }}
        />
      </div>

      <div className="location-info">
        <h3>{location.name}</h3>
        <p>{location.description || "Sin descripción disponible."}</p>
      </div>
    </div>
  );
}
