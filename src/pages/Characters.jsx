import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import "../Styles/characters.css";



export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://thesimpsonsapi.com/api/characters?page=${currentPage}`
        );
        const data = await response.json();
        setCharacters(data.results || data || []);
      } catch (error) {
        console.error("Error al cargar los personajes:", error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <Loader />;

  return (
    <div className="characters-bg">
      <div className="characters-container">
        <h2>Personajes de Los Simpsons</h2>
        <div className="characters-grid">
          {characters.map((char) => (
            <CharacterCard key={char.id || char._id} character={char} />
          ))}
        </div>

        <Pagination
          totalPages={61}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
