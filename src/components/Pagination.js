import React from "react";

function Pagination({ payload, setPayload, totalCount }) {
  const { pageNo, pageCount } = payload;
console.log(totalCount)
  // total pages
  const totalPages = Math.ceil(parseInt(totalCount)  / pageCount);

  // function to handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setPayload((prev) => ({ ...prev, pageNo: page }));
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="custom-pagination">
        {/* Prev button */}
        <li className={`page-item ${pageNo === 1 ? "disabled" : ""}`}>
          <button
            className="page-link prev"
            onClick={() => handlePageChange(pageNo - 1)}
          >
            ←
          </button>
        </li>

        {/* Pages */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <li
              key={page}
              className={`page-item ${pageNo === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next button */}
        <li className={`page-item ${pageNo === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link next"
            onClick={() => handlePageChange(pageNo + 1)}
          >
            →
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
