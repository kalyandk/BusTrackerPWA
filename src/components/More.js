import React, { useState } from "react";
import { Select, Form, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import "../componentcss/More.css";
import url from "./url";

const More = (props) => {
  const [body, setBody] = useState("");
  const userValue = [
    { key: "student", value: "student", text: "student" },
    { key: "staff", value: "staff", text: "staff" },
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
    let nowDate = new Date(Date.now());
    nowDate = nowDate.toLocaleString().split(",");
    let cDate = nowDate[0].split("/");
    cDate = cDate[2] + "-" + cDate[1] + "-" + cDate[0];
    let cTime = nowDate[1].trim();
    console.log(cDate, cTime);
    let data = {
      cFrom: selectedValue,
      cBody: body,
      cDate: cDate,
      cTime: cTime,
    };
    let bearerToken = "Bearer " + localStorage.getItem("access_token");

    let config = {
      headers: {
        Authorization: bearerToken,
      },
    };

    axios
      .post(url + "complaints", data, config)
      .then((res) => {
        setMessage(res.data.message);
      })

      .catch((err) => console.log(err));
  };
  const goBack = () => {
    props.history.goBack();
  };
  // console.log(selectedValue);
  // console.log(body);
  return (
    <div className="mainContainerMore">
      <div id="headerMore">
        <Icon name="angle left" id="backButton" size="big" onClick={goBack} />
        <h1 id="complaintForm">COMPLAINT FORM</h1>
        <p></p>
      </div>
      {message.length !== "" && <p className="message">{message}</p>}
      <Form className="formContainer">
        <Form.Field>
          <Select
            placeholder="Select designation"
            options={userValue}
            onChange={getSelectedValue}
          />
        </Form.Field>
        <Form.Field
          id="textArea"
          control={TextArea}
          placeholder="Enter your text here"
          onChange={(e) => setBody(e.target.value)}
          rows=""
        />
        <Button id="submitButton" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </Form>
    </div>
  );
};

export default More;
