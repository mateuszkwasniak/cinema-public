import React from "react";
import classes from "./hallcontainer.module.scss";

const HallContainer = ({ children }) => {
  return <div className={classes.hallContainer}>{children}</div>;
};

export default HallContainer;
