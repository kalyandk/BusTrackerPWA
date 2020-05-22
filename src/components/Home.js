import React, { useState, useEffect } from "react";
import { List, Icon } from "semantic-ui-react";
import "../componentcss/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthHelper from "./AuthHelper";

import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
function Home(props) {
  const [busList, setBusList] = useState([]);
  const [sidebarShow, setSidebarShow] = useState(false);
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

  const showSideBar = () => {
    setSidebarShow(!sidebarShow);
  };
  const hideSideBar = () => {
    setSidebarShow(false);
  };
  let sideDrawerjsx;
  let backdropjsx;
  if (sidebarShow) {
    backdropjsx = <Backdrop hideSideBar={hideSideBar} />;
  }
  return (
    <div className="mainContainerHome">
      <SideDrawer showState={sidebarShow} />
      {backdropjsx}
      <div id="headerhome">
        <Icon size="big" id="goback" name="list" onClick={showSideBar} />
        <p id="buslist">BUS LIST</p>
        {/* <Icon size="big" name="sign-out" id="btnlogout" onClick={signout} /> */}
        <p></p>
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
