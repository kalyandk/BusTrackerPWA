import React, { useState } from "react";

import { Button, Form } from "semantic-ui-react";
import "../componentcss/Login.css";
import axios from "axios";
import AuthHelper from "./AuthHelper";
function Login(props) {
  // state
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  const setAuthenticated = () => {
    if (username.length < 5 || password < 5) {
      setError("Credentials too short!");
    }
    let data = {
      username: username,
      password: password,
    };

    axios
      .post(
        "http://ec2-13-233-193-38.ap-south-1.compute.amazonaws.com/login",
        data
      )
      .then((res) => {
        if (res.data.access_token) {
          AuthHelper.authenticate();
          localStorage.setItem("access_token", res.data.access_token);
          if (AuthHelper.authenticate) {
            props.history.push("/buslist");
          } else {
          }
        }
      })
      .catch((err) => {
        setError("Wrong Credentials");
      });
  };

  return (
    <div className="mainContainer">
      <div className="loginContainer">
        <h1 className="header1">CBIT BUS TRACKER</h1>
        <p id="error_msg">{error}</p>
        <Form>
          <Form.Field>
            <label>
              <p className="labelName">User Name</p>
            </label>
            <input
              placeholder="Enter Username"
              className="inputText"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>
              <p className="labelName">Password</p>
            </label>
            <input
              type="password"
              placeholder="Enter password "
              className="inputText"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Field>

          <Button type="submit" id="btnSubmit" onClick={setAuthenticated}>
            LOGIN
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default Login;
