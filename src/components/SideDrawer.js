import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "../componentcss/SideDrawer.css";
const SideDrawer = (props) => {
  let SideDrawerClasses = "sideDrawerContainer";
  if (props.showState) {
    SideDrawerClasses = "sideDrawerContainer open";
  }
  return (
    <div className={SideDrawerClasses}>
      <ul>
        <Link to={{ pathname: "/more" }}>
          <p id="sideBarElements">Complaints</p>
        </Link>
        <div>
          <Button id="signOutButton">
            <p onClick={props.signout} id="sideBarElements">
              Logout
            </p>
          </Button>
        </div>
      </ul>
    </div>
  );
};

export default SideDrawer;
