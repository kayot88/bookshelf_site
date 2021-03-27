import React from "react";
import "./style/index.css";
import { Input, Wrapper, Span } from "./style";

const Switch = ({ on, ariaLabel, className = "", onClick, ...props }) => {
  const btnClassName = [
    className,
    "toggle-btn",
    on ? "toggle-btn-on" : "toggle-btn-off",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <label aria-label={ariaLabel || "Toggle"} style={{ display: "block" }}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={on}
        onChange={() => {}}
        onClick={onClick}
        data-testid="toggle-input"
      />
      <span className={btnClassName} {...props} />
    </label>
  );
};

export default Switch;
