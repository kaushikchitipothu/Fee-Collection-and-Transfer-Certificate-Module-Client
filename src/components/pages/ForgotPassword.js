import React from 'react';
import Axios from 'axios';
import { useState } from "react";
import Cookies from 'universal-cookie';
import { Button, Form, FormGroup } from 'react-bootstrap';

export default function ForgotPassword() {
 
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");

  Axios.defaults.withCredentials = true;

  const sendOTP = () => {
    Axios.post("http://localhost:3002/sms/mobile", {
      username: username,
    })
    .then(() => {
        alert("successfully sent");
    });

  };

  const checkOTP = () => {
    Axios.post("http://localhost:3002/sms/check", {
      username: username,
      code: code,
    }).then((response) => {
      if(response.data.username){
        const cookies = new Cookies();
        cookies.set('user', response.data.username);
        console.log("cookie- "+cookies.get('user')); // Pacman
        window.location='/ResetPassword';
      }
      else{
        alert("OTP did not match");
      }
    });
  };

    return (
      <div className="backdrop ">
      <Form className=" fontClass input rounded perfect-centering login-form needs-validation">
          <h1 className="logo text-center">
              <span className="font-weight-bold">eKMIT</span>
          </h1>
          <h4 className="font-weight-bold text-center">
             Password Reset
          </h4>
          <Form.Group className="gap">
             
              <Form.Control type="username" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
              
          </Form.Group>
          <div className="gap">
          <Button  onClick={sendOTP} className="rounded-pill btn-sm btn-info btn-block">Send OTP</Button>
          </div>
          <FormGroup className="x-gap">
              
              <Form.Control type="text" name="code" placeholder="OTP" onChange={(e) => setCode(e.target.value)}/>
          </FormGroup>
          <div className="gap">
          <Button  onClick ={checkOTP} className="rounded-pill btn-lg btn-dark btn-block">Submit</Button>
          </div><div className="text-center">
              <a href="/">Home</a>
          </div>
      </Form>
      </div>
    
    );
  }



