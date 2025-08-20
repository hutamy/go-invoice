const Select = ({
  label,
  className,
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder-gray-200 "
        value={value === undefined || value === null ? "" : value}
        onChange={onChange}
        placeholder={placeholder}
      >
        <option value="" disabled>{placeholder || "Select an option"}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

Select.defaultProps = {
  label: "",
  className: "",
  value: "",
  onChange: () => {},
  options: [],
};
