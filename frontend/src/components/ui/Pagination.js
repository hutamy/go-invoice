import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  // Helper to generate page numbers with ellipsis
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        Math.abs(i - page) <= 1 ||
        (i === page - 2 && page > 4) ||
        (i === page + 2 && page < totalPages - 3)
      ) {
        pages.push(i);
      }
    }
    // Insert ellipsis
    return pages.reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("ellipsis");
      acc.push(p);
      return acc;
    }, []);
  };

  return (
    <div className="flex justify-end items-center mt-4 gap-2">
      <button
        className={`w-9 h-9 flex items-center justify-center rounded-full text-lg text-gray-600 transition-colors duration-150 ${page === 1 ? 'opacity-50 cursor-default' : 'hover:bg-gray-100'}`}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        &lt;
      </button>
      {getPages().map((item, idx) =>
        item === "ellipsis" ? (
          <span key={idx} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={item}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-150
              ${page === item ? 'bg-indigo-600 text-white ring-2 ring-indigo-200' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => onPageChange(item)}
            aria-current={page === item ? 'page' : undefined}
          >
            {item}
          </button>
        )
      )}
      <button
        className={`w-9 h-9 flex items-center justify-center rounded-full text-lg text-gray-600 transition-colors duration-150 ${page === totalPages ? 'opacity-50 cursor-default' : 'hover:bg-gray-100'}`}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
}
