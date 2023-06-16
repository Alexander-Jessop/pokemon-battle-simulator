type PaginationProps = {
  limit: number;
  offset: number;
  totalPages: number;
  currentPage: number;
  handlePaginationChange: (offset: number, limit: number) => void;
};

const ListPagination = ({
  limit,
  offset,
  totalPages,
  currentPage,
  handlePaginationChange,
}: PaginationProps) => {
  return (
    <div className="mt-5 flex items-center justify-center space-x-2">
      <span>Show:</span>
      <select
        value={limit}
        onChange={(e) => handlePaginationChange(offset, +e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2 py-1"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <button
        onClick={() => handlePaginationChange(offset - limit, limit)}
        className={`rounded-l-lg border border-gray-300 bg-white px-3 py-2
            leading-tight text-secondary-800 hover:bg-gray-100
            hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800
            dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePaginationChange(index * limit, limit)}
          className={`border border-gray-300 bg-white px-3 py-2 leading-tight
            text-secondary-800 hover:bg-gray-100 hover:text-gray-700
            dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400
            dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === index + 1
                ? "bg-secondary-300 text-primary-50"
                : ""
            }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePaginationChange(offset + limit, limit)}
        className={`rounded-r-lg border border-gray-300 bg-white px-3 py-2
            leading-tight text-secondary-800 hover:bg-gray-100
            hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800
            dark:text-gray-400 dark:hover:bg-gray-700 
             dark:hover:text-white
            `}
      >
        Next
      </button>
    </div>
  );
};

export default ListPagination;
