import { useEffect } from "react";
import { ChangeEvent, useState } from "react";

type PaginationProps = {
  limit: number;
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (limit: number) => void;
};

const ListPagination = ({
  limit,
  totalPages,
  currentPage,
  handlePageChange,
  handleItemsPerPageChange,
}: PaginationProps) => {
  const [currentLimit, setCurrentLimit] = useState(limit);

  useEffect(() => {
    setCurrentLimit(limit);
  }, [limit]);

  const handlePreviousPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    handlePageChange(page);
  };

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setCurrentLimit(newLimit);
    handleItemsPerPageChange(newLimit);
  };

  useEffect(() => {
    handleItemsPerPageChange(currentLimit);
  }, [currentLimit, handleItemsPerPageChange]);

  return (
    <div className="mt-5 flex items-center justify-center space-x-2">
      <span>Show:</span>
      <select
        value={currentLimit}
        onChange={handleLimitChange}
        className="rounded-md border border-primary-300 bg-white px-2 py-1"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="rounded-l-lg border border-primary-300 bg-white px-3 py-2
            leading-tight text-secondary-800 hover:bg-primary-100
            hover:text-primary-700"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          className={`border ${
            currentPage === index + 1
              ? "bg-primary-300 text-primary-800"
              : "border-primary-300 bg-white"
          } px-3 py-2 leading-tight text-secondary-800
    hover:bg-primary-200 hover:text-accent-400`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`rounded-r-lg border border-primary-300 bg-white px-3 py-2
            leading-tight text-secondary-800 hover:bg-primary-100
            hover:text-primary-700`}
      >
        Next
      </button>
    </div>
  );
};

export default ListPagination;
