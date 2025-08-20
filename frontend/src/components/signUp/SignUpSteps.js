export default function SignUpSteps({ step }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          1
        </div>
        <span
          className={`mx-2 text-sm font-medium ${
            step === 1 ? "text-gray-500" : "text-gray-300"
          }`}
        >
          User Info
        </span>
        <div className="w-8 h-1 bg-gray-300 mx-2 rounded"></div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          2
        </div>
        <span
          className={`mx-2 text-sm font-medium ${
            step === 2 ? "text-gray-500" : "text-gray-300"
          }`}
        >
          Bank Details
        </span>
      </div>
    </div>
  );
}
