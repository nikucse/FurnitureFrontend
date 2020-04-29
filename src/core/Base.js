import React from "react";
import Menu from "./Menu";

const Base = ({ className = "text-dark p-4", children }) => {
  const baseStyle = { background: "rgb(175,238,238)" };
  return (
    <div>
      <Menu />
      <div className="container-fluid" style={baseStyle}>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
