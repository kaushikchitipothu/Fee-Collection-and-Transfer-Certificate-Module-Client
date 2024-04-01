import React from 'react';
import Axios from 'axios';
import { useState } from "react";
import Cookies from 'universal-cookie';
import { Button, Form } from 'react-bootstrap';

export default function ResetPassword() {

  const [password, setPassword] = useState("");

    Axios.defaults.withCredentials = true;
    const cookies = new Cookies();
    const username = cookies.get('user');
    console.log("cookie-"+username);
    // cookies.remove('user');
    // console.log("removed-"+cookies.get('user'));
    console.log(username);
    const reset = () => {
      Axios.post("http://localhost:3002/reset", {
        username: username,
        password: password,
      }).then((response) => {
        if(response.data.goto=='/'){
          alert("Your password has been reset successfully!")
          window.location='/UserLogin';
        }
        else{
          alert("Invalid");
        }
       
      });
    };
  
  

    return (
      
      <div className="backdrop fontClass">
          <Form className=" input rounded perfect-centering reset-form">
              <h1 className="logo text-center">
                  <span className="font-weight-bold">eKMIT</span>
              </h1>
              <h4 className="font-weight-bold text-center">
               Reset
              </h4>
              <Form.Group className="gap">
                 
                  <Form.Control type="password" name="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
                  
              </Form.Group>
<div className="gap">
              <Button  onClick={reset} className="btn-md rounded-pill btn-primary btn-block">Reset</Button>
              </div>
              
              <div className="gap">
              
              </div><div className="text-center">
                  <a href="/">Home</a>
              </div>
          </Form>
          </div>
        
      
    ); 
}
