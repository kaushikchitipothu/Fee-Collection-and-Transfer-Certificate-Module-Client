import React,{Component} from 'react';
import Axios from 'axios';
import  { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup } from 'react-bootstrap';


class UserLogin extends Component{

    constructor(props){
        super(props)
        const token = localStorage.getItem("token");
        let loggedIn=true
        if(token==null){
            loggedIn=false
        }

        this.state={
          username:"", 
          password:"",
          loggedIn
        }

    }

    onChange = (e)=>{
        console.log(`${e.target.value}`)
        this.setState({
          [e.target.name]: e.target.value
        })
    }
  
    submitHandler = (e)=>{
        e.preventDefault()
        Axios.post('http://localhost:3002/auth/user',{
          username:this.state.username,
          password:this.state.password
        }).then((response) => {
            console.log(response)
            if(response.data.token){
              console.log("token resp- "+response.data.token)
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('log',response.data.result[0].username)
              this.setState({
                loggedIn: true
              })
            }

            else 
            {
                alert(response.data.message)
            }
            
            });
    }
    

    render(props){
      if(this.state.loggedIn){
        return <Redirect to="/User"/>
      }
        return(
          <div className="backdrop form">
          <Form className=" fontClass input rounded perfect-centering login-form needs-validation">
              <h1 className="logo text-center">
                  <span className="font-weight-bold">eKMIT</span>
              </h1>
              <h4 className="gap font-weight-bold text-center">
                 User Login
              </h4>
              <Form.Group className="gap">
                 
                  <Form.Control type="username" name="username" placeholder="Username" value={this.state.username} onChange={this.onChange} />
                  
              </Form.Group>
              <FormGroup className="gap">
                  
                  <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
              </FormGroup>
              <div className="gap">
              <Button  onClick={this.submitHandler} style={{padding:'8px'}}className="btn-dark btn-lg btn-block">Log in</Button>
              </div>
              <div style={{padding:'8px'}} className="text-center">
                  <a href="/">Home</a>
                  <span className="p-2">|</span>
                  <a href="/ForgotPassword">Forgot Password?</a>
              </div>
          </Form>
          </div>
        
        )
    }
}
export default UserLogin;










