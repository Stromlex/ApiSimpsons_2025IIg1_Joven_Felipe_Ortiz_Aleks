// src/pages/Episodes.jsx
import { useEffect, useState } from "react";
import EpisodeCard from "../components/EpisodeCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import "../Styles/episodes.css";

export default function Episodes() {
  const [allEpisodes, setAllEpisodes] = useState([]); // todos los episodios descargados
  const [displayEpisodes, setDisplayEpisodes] = useState([]); // episodios que se muestran (página actual)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // paginación local
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 20;

  // filtros / búsqueda controlada
  const [season, setSeason] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ---- Descarga robusta de TODAS las páginas ----
  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const collected = [];
        let page = 1;
        const maxEmptyPagesInRow = 3; // tolerancia por si hay huecos
        let emptyCount = 0;

        while (true) {
          const url = `https://thesimpsonsapi.com/api/episodes?page=${page}`;
          console.info("[Episodes] fetch page:", page, url);
          const res = await fetch(url);

          if (!res.ok) {
            const txt = await res.text().catch(() => "");
            throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
          }

          const data = await res.json();
          const items = Array.isArray(data) ? data : data.results || [];

          // si trae episodios los anadimos; si trae vacío, contamos
          if (!items || items.length === 0) {
            emptyCount += 1;
            console.info(`[Episodes] page ${page} returned 0 items (emptyCount=${emptyCount})`);
            // si hemos tenido varias páginas vacías consecutivas, rompemos
            if (emptyCount >= maxEmptyPagesInRow) break;
          } else {
            emptyCount = 0;
            collected.push(...items);
          }

          page += 1;

          // seguridad: no hacer un loop infinito
          if (page > 300) {
            console.warn("[Episodes] reached page limit 300 — stopping.");
            break;
          }
        }

        // Normalizar: season puede venir en distintos campos o ser string, null...
        const normalized = collected.map((ep) => {
          const seasonValue =
            ep.season ??
            ep.Season ??
            ep.season_number ??
            (ep.first_appearance_sh && ep.first_appearance_sh.season) ??
            null;

          // intentar extraer número si es string "Season 3" etc.
          let seasonNum = null;
          if (seasonValue != null) {
            const s = String(seasonValue).match(/\d+/);
            seasonNum = s ? Number(s[0]) : null;
          }

          return {
            ...ep,
            id: ep.id ?? ep._id ?? `${ep.name}-${Math.random()}`,
            season: seasonNum, // number o null
            name: ep.name ?? ep.title ?? ep.episode ?? "Sin título",
          };
        });

        // quitar duplicados por id
        const unique = Array.from(new Map(normalized.map((e) => [e.id, e])).values());

        if (!cancelled) {
          setAllEpisodes(unique);
          // inicial display = primeras páginas (aplicar filtros por defecto)
          setCurrentPage(1);
          setLoading(false);
          console.info("[Episodes] total downloaded episodes:", unique.length);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[Episodes] fetchAll error:", err);
          setError(err.message || "Error al descargar episodios");
          setAllEpisodes([]);
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Aplicar filtros y paginación local cuando cambian filtros o allEpisodes ----
  useEffect(() => {
    // start from full list
    let filtered = [...allEpisodes];

    // filtrar por temporada si hay valor
    if (season) {
      // permitir búsqueda por "3" y por "Season 3" etc.
      const target = String(season).trim();
      filtered = filtered.filter((ep) => {
        // si season es null en episodio, no incluir
        if (ep.season == null) return false;
        return String(ep.season) === target;
      });
    }

    // filtrar por searchQuery (solo cuando se confirma)
    if (searchQuery) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((ep) => (ep.name || "").toLowerCase().includes(q));
    }

    // sort opcional por season + episode_number si existe
    filtered.sort((a, b) => {
      const sa = a.season ?? 0;
      const sb = b.season ?? 0;
      if (sa !== sb) return sa - sb;
      const ea = Number(a.episode_number ?? a.episode_number ?? 0);
      const eb = Number(b.episode_number ?? b.episode_number ?? 0);
      return (ea || 0) - (eb || 0);
    });

    // paginación local
    const totalPages = Math.max(1, Math.ceil(filtered.length / episodesPerPage));
    if (currentPage > totalPages) setCurrentPage(1);

    const start = (currentPage - 1) * episodesPerPage;
    const pageItems = filtered.slice(start, start + episodesPerPage);

    setDisplayEpisodes(pageItems);
  }, [allEpisodes, season, searchQuery, currentPage]);

  // ---- handlers ----
  const handleSearchInputChange = (e) => setSearchInput(e.target.value);
  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (num) => {
    setCurrentPage(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- UI ----
  if (loading) return <Loader />;

  return (
    <div className="episodes-bg">
      <div className="episodes-container">
        <h2>Episodios de Los Simpsons</h2>

        {error && (
          <div style={{ padding: 12, background: "#610000", color: "#ffdede", borderRadius: 8, marginBottom: 16 }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="filters-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Escribe la búsqueda y presiona Buscar (Enter)..."
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
              className="search-input"
            />
            <button className="btn-search" onClick={handleSearchSubmit}>Buscar</button>
          </div>

          <div className="search-container">
            <select value={season} onChange={handleSeasonChange} className="search-input">
              <option value="">Todas las temporadas</option>
              {Array.from({ length: 40 }, (_, i) => (
                <option key={i+1} value={i+1}>Temporada {i+1}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="episodes-grid">
          {displayEpisodes.length > 0 ? (
            displayEpisodes.map((ep) => <EpisodeCard key={ep.id} episode={ep} />)
          ) : (
            <p style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}>
              No se encontraron episodios con esos filtros.
            </p>
          )}
        </div>

        {/* calculamos totalPages para pasar al componente de paginación */}
        <Pagination
          totalPages={Math.max(1, Math.ceil(
            ( (() => {
              // calcular longitud total filtrada para paginación
              let f = [...allEpisodes];
              if (season) f = f.filter(ep => ep.season != null && String(ep.season) === String(season));
              if (searchQuery) f = f.filter(ep => (ep.name || "").toLowerCase().includes(searchQuery.toLowerCase()));
              return f.length;
            })()
            ) / episodesPerPage
          ))}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
