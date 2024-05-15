import React from "react";
import "./ToolTip.css";

const ToolTip = ({ children, text }) => (
  <div className="tooltip-container">
    {children}
    <span className="tooltip-text">{text}</span>
  </div>
);

export default ToolTip;
