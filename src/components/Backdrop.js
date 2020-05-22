import React from "react";
import "../componentcss/Backdrop.css";
const Backdrop = (props) => {
  return <div className="backDrop" onClick={props.hideSideBar} />;
};
export default Backdrop;
