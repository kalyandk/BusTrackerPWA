import React, { useState } from "react";
import { Button, Form, Card } from "semantic-ui-react";
import "../componentcss/Login.css";
import axios from "axios";
import AuthHelper from "./AuthHelper";
import { Redirect } from "react-router-dom";
function Login(props) {
  // state
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const setAuthenticated = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        // Authorization: "Bearer " + localStorage.getItem("user").access_token,
      },
    };
    let data = {
      username: "admin",
      password: "admin@123",
    };

    axios
      .post("https://5eb90ecabb17460016b32d9a.mockapi.io/login")
      .then((res) => {
        if (res.data.access_token) {
          AuthHelper.authenticate();
          localStorage.setItem("user", JSON.stringify(res.data));
          if (AuthHelper.authenticate) {
            props.history.push("/buslist");
          } else {
            console.log(res.data.message);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(props);

  return (
    <div className="mainContainer">
      <h1 className="header1">CBIT BUS TRACKER</h1>
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
  );
}
export default Login;
