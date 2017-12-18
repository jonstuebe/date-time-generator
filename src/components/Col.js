import React from "react";

const Col = ({ xs, sm, md, lg, children }) => {
  let theClasses = [];
  let prefix = "col-";

  if (xs) theClasses.push(`${prefix}xs-${xs}`);
  if (sm) theClasses.push(`${prefix}sm-${sm}`);
  if (md) theClasses.push(`${prefix}md-${md}`);
  if (lg) theClasses.push(`${prefix}lg-${lg}`);

  return <div className={theClasses.join(" ")}>{children}</div>;
};

export default Col;
