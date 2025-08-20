import React, { useState } from "react";

const Container = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-gray-200 rounded-md mb-4 overflow-hidden">
      <button
        className={
          "flex justify-between items-center w-full px-4 py-3 bg-gray-50 text-left hover:cursor-pointer"
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={"font-medium text-gray-700"}>{label}</span>
        {isOpen ? (
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        )}
      </button>
      {isOpen && children}
    </div>
  );
};

export default Container;

Container.defaultProps = {
  label: "",
};
