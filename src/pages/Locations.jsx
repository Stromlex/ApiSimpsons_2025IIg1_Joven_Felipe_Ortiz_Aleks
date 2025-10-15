import { useEffect, useState } from "react";
  import LocationCard from "../components/LocationCard";
  import Pagination from "../components/Pagination";
  import Loader from "../components/Loader";
  import "../styles/locations.css";
  

  export default function Locations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      const fetchLocations = async () => {
        setLoading(true);
        try {
          const res = await fetch('https://thesimpsonsapi.com/api/locations?page=${currentPage}');
          const data = await res.json();

        
          const results = data.results || data || [];
          setLocations(results);

      
  const total = data.info?.pages || 24;
  setTotalPages(total);

        } catch (error) {
          console.error("Error al obtener las localizaciones:", error);
          setLocations([]);
        } finally {
          setLoading(false);
        }
      };
      fetchLocations();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <Loader />;

    return (
      <div className="locations-bg">
        <div className="locations-container">
          <h2>Localizaciones de Springfield</h2>

          <div className="locations-grid">
            {locations.map((loc) => (
              <LocationCard key={loc.id || loc._id} location={loc} />
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    );
  }