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
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        lat: 0,
        lng: 0,
      },
    };
  }
  goBack = () => {
    this.props.history.goBack();
  };
  setLocation = () => {
    axios
      .get("https://5ea476ae270de6001646056f.mockapi.io/reports/coords")
      .then((res) => {
        let newState = { ...this.state };
        newState.coords = res.data;
        this.setState(newState);
      });
  };
  componentDidMount() {
    this.setLocation();
    let intervalID = setInterval(() => {
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
            center={this.state.coords}
          >
            <Icon
              size="huge"
              style={btnstyle}
              name="chevron circle left"
              onClick={this.goBack}
            />
            <Marker position={this.state.coords} icon={busimg}></Marker>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCclG7w5m1rAyb_KxV8cp2eY4FsTtTm7Bs",
})(Maps);
