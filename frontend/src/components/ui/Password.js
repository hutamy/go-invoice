import Input from "./Input";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Password = React.forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative ${props.componentclassname}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {props.label}
      </label>
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        name={props.name}
        error={props.error}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword((show) => !show)}
        className="absolute right-3 top-9 text-gray-500 focus:outline-none"
        tabIndex={-1}
      >
        <span className="absolutecursor-pointer text-gray-500">
          {showPassword ? (
            <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          )}
        </span>
      </button>
      {props.error && (
        <p className="text-xs text-red-500">{props.errormessage}</p>
      )}
    </div>
  );
});

Password.displayName = "Password";

export default Password;

Password.defaultProps = {
  componentclassname: "",
  label: "",
  error: false,
  name: "",
  errormessage: "",
};
