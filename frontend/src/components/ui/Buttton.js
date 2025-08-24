import { classNames } from "@/lib/helper";

export default function Button({
  className = "",
  children,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={classNames(
        disabled
          ? "rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm cursor-not-allowed"
          : "rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
