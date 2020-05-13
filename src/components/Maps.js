import React, { Component } from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const busimg = require("../assets/busnew.png");
const mapStyles = {
  width: "100%",
  height: "100%",
};
const btnstyle = {
  float: "left",
  position: "absolute",
  top: 60,
  left: 10,
  opacity: "50%",
};
export class Maps extends Component {
  intervalID = 0;
  constructor(props) {
    super(props);
    this.state = {
      intervalID: 0,
      routeId: this.props.location.busid,
      coords: {
        lat: 17.488689,
        lng: 78.488019,
      },
      toggleInfo: false,
    };
  }
  setToggleInfo = () => {
    console.log("toggled");
    this.state.toggleInfo = !this.state.toggleInfo;
  };
  goBack = () => {
    this.props.history.goBack();
  };
  setLocation = () => {
    let bearerToken = "Bearer " + localStorage.getItem("access_token");

    let config = {
      headers: {
        Authorization: bearerToken,
      },
      params: {
        routeId: this.state.routeId,
      },
    };

    axios
      .get(
        "http://ec2-3-7-131-60.ap-south-1.compute.amazonaws.com/tracking",
        config
      )
      .then((res) => {
        // console.log(res.data);
        let newState = { ...this.state };
        newState.coords.lat = Number(res.data[0].latitude);
        newState.coords.lng = Number(res.data[0].longitude);
        this.setState(newState);
        // console.log(this.state.coords);
      });
  };
  componentDidMount() {
    // console.log("busid" + this.props.location.busid);
    this.setLocation();
    this.intervalID = setInterval(() => {
      this.setLocation();
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    console.log(this.state.coords);
    return (
      <div>
        <div>
          <Map
            google={this.props.google}
            zoom={18}
            style={mapStyles}
            center={{ lat: this.state.coords.lat, lng: this.state.coords.lng }}
          >
            <Icon
              size="huge"
              style={btnstyle}
              name="chevron circle left"
              onClick={this.goBack}
            />
            <Marker
              position={{
                lat: this.state.coords.lat,
                lng: this.state.coords.lng,
              }}
              icon={busimg}
              onClick={this.setToggleInfo}
            ></Marker>
            <InfoWindow>
              <div>
                <h1>hello</h1>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCclG7w5m1rAyb_KxV8cp2eY4FsTtTm7Bs",
})(Maps);
