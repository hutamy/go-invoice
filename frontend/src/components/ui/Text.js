import React from "react";
import Input from "./Input";

const Text = React.forwardRef(
  ({ componentclassname, label, error, errormessage, ...props }, ref) => {
    return (
      <div className={componentclassname}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <Input ref={ref} type="text" error={error} {...props} />
        {error && <p className="text-xs text-red-500 pt-1">{errormessage}</p>}
      </div>
    );
  }
);

Text.displayName = "Text";

export default Text;

Text.defaultProps = {
  componentclassname: "",
  label: "",
  error: false,
  name: "",
  errormessage: "",
};
