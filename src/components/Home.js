import React, { useState } from "react";
import { List, Button, Icon } from "semantic-ui-react";
import "../componentcss/Home.css";
import Axios from "axios";
import { Link, Router, Redirect } from "react-router-dom";
import AuthHelper from "./AuthHelper";
import Auth from "./AuthHelper";

function Home(props) {
  const [busList, setBusList] = useState(["24", "25", "26", "27"]);
  const signout = () => {
    AuthHelper.signout();
    props.history.push("/login");
  };
  const goBack = () => {
    props.history.goBack();
  };
  return (
    <div className="mainContainer">
      <div id="headerhome">
        <Icon
          size="big"
          id="goback"
          name="chevron circle left"
          onClick={goBack}
        />
        <p id="buslist">BUS LIST</p>
        <Icon size="big" name="sign-out" id="btnlogout" onClick={signout} />
      </div>

      <div className="list">
        {busList.map((item) => (
          <Link to={{ pathname: "/maps", busid: item }}>
            <div className="listitemcontainer">
              <List.Icon size="big" name="bus" id="busicon" />

              <p id="busno">{item}</p>

              {/* <div className="ui divider"></div> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
