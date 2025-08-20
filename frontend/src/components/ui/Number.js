import React from "react";
import Input from "./Input";

const Number = React.forwardRef(
  ({ componentclassname, label, error, errormessage, ...props }, ref) => {
    return (
      <div className={componentclassname}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <Input ref={ref} type="number" error={error} {...props} />
        {error && <p className="text-xs text-red-500 pt-1">{errormessage}</p>}
      </div>
    );
  }
);

Number.displayName = "Number";

export default Number;

Number.defaultProps = {
  componentclassname: "",
  label: "",
  value: "",
  onChange: () => {},
  error: false,
  name: "",
  errormessage: "",
};
