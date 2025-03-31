import React from "react";
import { Link } from "react-router-dom";

const AuthenticationPage = ({ children, className = "" }) => {
  return (
    <div
      className={`max-w-[1000px] w-full bg-white mx-auto mt-14 rounded-xl ${className}`}
    >
      <div className="text-center pt-10">
        <div className="text-4xl font-bold text-tertiary">
          Chào bạn đến PINEPERFUME
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthenticationPage;
