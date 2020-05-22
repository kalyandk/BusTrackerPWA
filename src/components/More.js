import React, { useState } from "react";
import { Select, Form, TextArea, Button } from "semantic-ui-react";
import axios from "axios";
import "../componentcss/More.css";

const More = () => {
  const [body, setBody] = useState("");
  const userValue = [
    { key: "student", value: "student", text: "Student" },
    { key: "staff", value: "staff", text: "Staff" },
  ];
  const [selectedValue, setSelectedValue] = useState("student");
  const [message, setMessage] = useState("");
  const getSelectedValue = (event, { value }) => {
    setSelectedValue(event.target.textContent);
  };

  const handleSubmit = () => {
    if (body.length < 10) {
      setMessage("Complaint body is less than 10 characters long ");
    } else {
      sendData();
    }
  };
  const sendData = () => {
    let data = {
      from: selectedValue,
      body: body,
      date: new Date(Date.now()).toUTCString(),
    };
    let bearerToken = "Bearer " + localStorage.getItem("access_token");

    let config = {
      headers: {
        Authorization: bearerToken,
      },
      data,
    };

    axios
      .post(
        "http://ec2-3-7-131-60.ap-south-1.compute.amazonaws.com/complaint",
        config,
        data
      )
      .then((res) => {
        setMessage(res.data.message);
      })

      .catch((err) => console.log(err));
  };

  console.log(selectedValue);
  console.log(body);
  return (
    <div className="mainContainerMore">
      <h1>Complaint Form...</h1>
      {message.length !== "" && <p className="message">{message}</p>}
      <Form className="formContainer">
        <Form.Field>
          <label>
            <p className="labelName">Select User</p>
          </label>
          <Select
            placeholder="Select designation"
            options={userValue}
            onChange={getSelectedValue}
          />
        </Form.Field>
        <Form.Field
          id="textArea"
          control={TextArea}
          label="Complaint"
          placeholder="Enter your text here"
          onChange={(e) => setBody(e.target.value)}
          rows=""
        />
        <Button type="submit" id="btnSubmit" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </Form>
    </div>
  );
};

export default More;
