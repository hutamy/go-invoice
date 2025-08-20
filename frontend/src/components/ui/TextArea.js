import React from "react";

const TextArea = React.forwardRef(
  ({ className, label, rows, error, errormessage, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full px-3 py-2 border ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          } rounded-md focus:outline-none focus:ring-1 text-gray-700 placeholder-gray-200 ${
            props.disabled ? " bg-gray-100" : ""
          }`}
          rows={rows}
          {...props}
        />
        {error && <p className="text-xs text-red-500 pt-1">{errormessage}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
