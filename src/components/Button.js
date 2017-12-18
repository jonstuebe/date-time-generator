import React from "react";

const Button = ({ preset, onClick, children }) => {
  let classNames = ["btn"];
  if (preset) classNames.push("preset");
  return (
    <a className={classNames.join(" ")} onClick={onClick}>
      {children}
    </a>
  );
};

export default Button;
