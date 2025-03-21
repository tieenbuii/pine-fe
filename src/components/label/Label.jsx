import React from "react";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label
      className="text-black font-semibold text-base cursor-pointer"
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;