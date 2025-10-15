// src/components/Pagination.jsx
import "../Styles/pagination.css";


export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // 🔹 Mostramos solo un rango de páginas alrededor de la actual
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        ← Anterior
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={num === currentPage ? "active" : ""}
        >
          {num}
        </button>
      ))}

      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Siguiente →
      </button>
    </div>
  );
}