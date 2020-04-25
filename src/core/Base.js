import React from "react";
import Menu from "./Menu";

const Base = ({ className = "text-dark p-4", children }) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid bg-light">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
