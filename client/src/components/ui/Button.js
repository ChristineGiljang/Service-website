import React from "react";

const Button = ({ label, onClick, type = "button", variant = "primary", className = "" }) => {
  // Define different styles based on the variant
  const baseStyles = "inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium transition-all focus:ring-3 focus:outline-none";
  const variants = {
    primary: "bg-accent text-white hover:scale-110 hover:shadow-xl",
    secondary: "bg-primary text-white hover:bg-gray-600",
    outline: "border border-accent text-accent hover:bg-accent hover:text-white",
    special: "relative overflow-hidden bg-accent text-white group hover:bg-accent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {/* Special variant includes the animated arrow */}
      {variant === "special" && (
        <span className="absolute -left-8 transition-all group-hover:left-4">
          <svg
            className="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      )}

      <span className="text-sm font-medium transition-all group-hover:ms-4">{label}</span>
    </button>
  );
};

export default Button;
