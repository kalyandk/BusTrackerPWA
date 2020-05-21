import React, { useState, useEffect } from "react";
import { List, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import "../componentcss/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthHelper from "./AuthHelper";

function Home(props) {
  const [busList, setBusList] = useState([]);
  const getData = () => {
    let bearerToken = "Bearer " + localStorage.getItem("access_token");

    let config = {
      headers: {
        Authorization: bearerToken,
      },
    };

    axios
      .get(
        "http://ec2-3-7-131-60.ap-south-1.compute.amazonaws.com/buses",
        config
      )
      .then((res) => {
        // console.log(res.data);
        setBusList(res.data);
      })

      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  const signout = () => {
    AuthHelper.signout();
    props.history.push("/login");
  };
  const goBack = () => {
    // props.history.goBack();
  };
  return (
    <div className="mainContainerHome">
      <div id="headerhome">
        <Icon size="big" id="goback" name="" onClick={goBack} />
        <p id="buslist">BUS LIST</p>
        <Icon size="big" name="sign-out" id="btnlogout" onClick={signout} />
      </div>

      <div className="list">
        {busList.map((item) => (
          <Link to={{ pathname: "/maps", busid: item.routeId }}>
            <div className="listitemcontainer">
              <List.Icon size="small" name="bus" id="busicon" />

              <p id="busno">{item.routeId}</p>
              <p id="vehicleno">{item.vehicleNo}</p>

              {/* <div className="ui divider"></div> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
