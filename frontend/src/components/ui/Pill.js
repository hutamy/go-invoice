export default function Pill({ label, className }) {
  return (
    <>
      <span
        className={
          `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize ` +
          className
        }
      >
        {label}
      </span>
    </>
  );
}

Pill.defaultProps = {
  label: "",
  className: "",
};
