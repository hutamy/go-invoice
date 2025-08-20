import React from "react";
import Input from "./Input";

const Date = React.forwardRef(
  ({ componentclassname, label, error, errormessage, ...props }, ref) => {
    return (
      <div className={componentclassname}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <Input ref={ref} type="date" error={error} {...props} />
        {error && <p className="text-xs text-red-500 pt-1">{errormessage}</p>}
      </div>
    );
  }
);

Date.displayName = "Date";

export default Date;
