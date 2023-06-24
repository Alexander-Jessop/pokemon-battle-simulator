import { useState, useEffect } from "react";

type FetchDataCallback = (
  page: number,
  limit: number,
  generation: number
) => Promise<void>;

export const usePagination = (
  initialPage = 1,
  initialLimit = 10,
  totalItems = 0,
  initialGeneration = 1,
  fetchDataCallback: FetchDataCallback
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentLimit, setCurrentLimit] = useState(initialLimit);
  const [currentGeneration, setCurrentGeneration] = useState(initialGeneration);
  const totalPages = Math.ceil(totalItems / currentLimit);

  useEffect(() => {
    fetchDataCallback(currentPage, currentLimit, currentGeneration);
  }, [currentPage, currentLimit, currentGeneration, fetchDataCallback]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    if (newLimit >= 1) {
      setCurrentLimit(newLimit);
    }
  };

  const handleGenerationChange = (generation: number) => {
    setCurrentGeneration(generation);
  };

  return {
    currentPage,
    currentLimit,
    totalPages,
    currentGeneration,
    handlePageChange,
    handleItemsPerPageChange,
    handleGenerationChange,
  };
};
