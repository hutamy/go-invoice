import React from "react";
import Input from "./Input";

const Email = React.forwardRef(
  ({ componentclassname, label, error, errormessage, ...props }, ref) => {
    return (
      <div className={componentclassname}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <Input ref={ref} type="email" error={error} {...props} />
        {error && <p className="text-xs text-red-500 pt-1">{errormessage}</p>}
      </div>
    );
  }
);

Email.displayName = "Email";

export default Email;

Email.defaultProps = {
  componentclassname: "",
  label: "",
  value: "",
  onChange: () => {},
  error: false,
  name: "",
  errormessage: "",
};
