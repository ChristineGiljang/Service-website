import React from "react";

const Input = ({ id, label, type = "text", name, value, onChange, error }) => {
  return (
    <label
      htmlFor={id}
      className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-accent focus-within:ring-1 focus-within:accent"
    >
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="peer border-none bg-transparent placeholder-transparent text-gray-900 focus:border-transparent focus:ring-0 focus:outline-hidden"
        placeholder={label}
      />
      <span
        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
      >
        {label}
      </span>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </label>
  );
};

export default Input;
