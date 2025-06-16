import { useState } from "react";

const QuestionMark = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="ml-2 cursor-pointer relative flex items-center justify-center rounded-full bg-gray-700 w-6 h-6 text-white font-bold select-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      aria-describedby="login-tooltip"
      role="tooltip-trigger"
    >
      ?
      {showTooltip && (
        <div
          id="login-tooltip"
          className="absolute top-full right-[20px] mt-2 w-64 p-2 rounded bg-gray-900 text-white text-sm shadow-lg whitespace-normal z-50"
        >
          Logging in allows you to add and remove books from your collection.
        </div>
      )}
    </div>
  );
};

export default QuestionMark;

