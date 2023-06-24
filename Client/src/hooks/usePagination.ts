import { useState, useEffect } from "react";

export const usePagination = (
  initialPage = 1,
  initialLimit = 10,
  totalItems = 0,
  fetchDataCallback
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentLimit, setCurrentLimit] = useState(initialLimit);
  const totalPages = Math.ceil(totalItems / currentLimit);

  useEffect(() => {
    fetchDataCallback(currentPage, currentLimit);
  }, [currentPage, currentLimit, fetchDataCallback]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (newLimit) => {
    if (newLimit >= 1) {
      setCurrentLimit(newLimit);
    }
  };

  return {
    currentPage,
    currentLimit,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
