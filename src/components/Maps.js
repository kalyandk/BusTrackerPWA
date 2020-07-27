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
      coordsAvailable: 0,
    };
  }

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
        "http://ec2-13-233-193-38.ap-south-1.compute.amazonaws.com/tracking",
        config
      )
      .then((res) => {
        console.log(res.data.length);
        if (res.data.length > 0) {
          let newState = { ...this.state };
          newState.coords.lat = Number(res.data[0].latitude);
          newState.coords.lng = Number(res.data[0].longitude);
          newState.coordsAvailable = 1;
          this.setState(newState);
        } else {
          let newState = { ...this.state };
          newState.coordsAvailable = 2;
          this.setState(newState);
        }
        console.log(res.data);

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
    // console.log(this.state.coords);
    return (
      <div>
        {this.state.coordsAvailable === 2 && <p>{"Coords not available!"}</p>}
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
  apiKey: "AIzaSyArbAIIe2DNFzV8bWdqno7S-9UcZmMlkos",
})(Maps);
