// src/components/EpisodeCard.jsx
export default function EpisodeCard({ episode }) {
  const CDN = "https://cdn.thesimpsonsapi.com/500";

  // 🔹 Usamos backticks correctamente
  const imageUrl = episode.image_path
    ? `${CDN}${episode.image_path}`
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/The_Simpsons_yellow_logo.svg/500px-The_Simpsons_yellow_logo.svg.png";

  return (
    <div className="episode-card">
      <div className="episode-image">
        <img
          src={imageUrl}
          alt={episode.name || "Episodio de Los Simpsons"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/The_Simpsons_yellow_logo.svg/500px-The_Simpsons_yellow_logo.svg.png";
          }}
        />
      </div>

      <div className="episode-info">
        <h3>{episode.name || "Episodio sin título"}</h3>
        <p>
          <strong>Temporada:</strong> {episode.season || "N/A"}
        </p>
        <p>
          <strong>Episodio:</strong> {episode.episode_number || "N/A"}
        </p>
        <p>
          <strong>Emitido el:</strong> {episode.airdate || "Desconocido"}
        </p>
      </div>
    </div>
  );
}
