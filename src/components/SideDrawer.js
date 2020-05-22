import React from "react";
import { Link } from "react-router-dom";
import { List, Icon } from "semantic-ui-react";
import "../componentcss/SideDrawer.css";
const SideDrawer = (props) => {
  let SideDrawerClasses = "sideDrawerContainer";
  if (props.showState) {
    SideDrawerClasses = "sideDrawerContainer open";
  }
  return (
    <div className={SideDrawerClasses}>
      <ul>
        <Link to={{ pathname: "/more" }}>Complaint</Link>
        <h1>Logout</h1>
      </ul>
    </div>
  );
};

export default SideDrawer;
