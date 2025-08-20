import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      name={props.name}
      type={props.type}
      className={
        props.error
          ? "w-full px-3 py-2 border border-red-500 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-700 placeholder-gray-200 " +
            props.inputclassname
          : "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-700 placeholder-gray-200 " +
            props.inputclassname +
            (props.disabled ? " bg-gray-100" : "")
      }
      value={props.value}
      onChange={props.onChange}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;

Input.defaultProps = {
  name: "",
  type: "text",
  value: "",
  inputclassname: "",
  onChange: () => {},
  error: false,
  disabled: false,
};
