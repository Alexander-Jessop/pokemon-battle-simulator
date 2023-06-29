import { useState, useEffect } from "react";

type FetchDataCallback = (
  page: number,
  limit: number,
  generation: number
) => Promise<void>;

type PaginationResult = {
  currentPage: number;
  currentLimit: number;
  totalPages: number;
  currentGeneration: number;
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (newLimit: number) => void;
  handleGenerationChange: (generation: number) => void;
};

export const usePagination = (
  initialPage = 1,
  initialLimit = 10,
  totalItems = 0,
  initialGeneration = 1,
  fetchDataCallback: FetchDataCallback
): PaginationResult => {
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
    currentPage > totalPages
      ? setCurrentPage(totalPages)
      : setCurrentPage(currentPage);
    setCurrentLimit(newLimit);
  };

  const handleGenerationChange = (generation: number) => {
    setCurrentPage(1);
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
