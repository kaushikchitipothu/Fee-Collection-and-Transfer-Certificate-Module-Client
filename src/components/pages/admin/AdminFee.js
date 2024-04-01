import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';
import {Container,Row,Col,Jumbotron} from "react-bootstrap";
import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import  { Redirect } from 'react-router-dom';

export default class AdminFee extends Component{


  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    const token = localStorage.getItem("token");
        let loggedIn=true
        if(token==null){
            loggedIn=false
        }
        this.state={
          loggedIn,
          rno:'',
          valid1:false,
          scholarship:'',
          fee:'',
          v1:false,
          cno:''
        }
  }
  rollNumberHandler = (event)=>{
    this.setState({rno:event.target.value})
  }

  ChalanNumberHandler = (event)=>{
    this.setState({cno:event.target.value})
    var num = /^[0-9]+$/
    if(this.state.cno.length===7)
    {
      if(this.state.cno.match(num))
      {
        this.state.v1=true
        //alert(this.state.v1)
      }
      else
      {
        this.state.v1=false
        alert("Enter Valid Challan Number!")
      }
    }
  }

  handleSubmit2(event) {
    event.preventDefault()
        axios.post('http://localhost:3002/verify',{rno:this.state.rno})
        .then((response) => {
          var t1=JSON.parse(response.data)
          this.setState({scholarship: t1[0]})
          this.setState({fee: t1[1]})
          console.log(response.data)
          if(t1[2]==="Success")
          {
            this.setState({valid1: true})
            if(this.state.scholarship==='Y')
            {
              this.setState({fee: "8000"})
            }
            else if(this.state.scholarship==='P')
            {
              var temp=parseInt(this.state.fee)
              temp=temp-50000
              this.setState({fee: temp})
            }
          }
          else if(t1[2]==="Fail")
          {
            alert("Enter Valid Roll Number!")
          }
          
        })
  }

  handleSubmit(event) {
    event.preventDefault()
        axios.post('http://localhost:3002/feeUpdate',{cno:this.state.cno,rno:this.state.rno})
        .then((response) => {
          if(response.data==="success"){
            window.location='/AdminHome';
            alert('Offline fee payment details updated successfully!');
          }
          console.log(response.data)
        })
  }

    render(){
      if(this.state.loggedIn===false){
        return <Redirect to="/AdminLogin"/>
      }
        return(
          <Container fluid className="fontClass">
          <Row>
             < Navbar/>
          </Row>
      <Row>
          <Col xs={2} id="sidebar-wrapper">      
            <Sidebar />
          </Col>
          <Col xs={2} id="sidebar-wrapper">      
            
          </Col>
          
          <Col  xs={5} id="payment-wrapper" >
          <Jumbotron>
         <h3 style={{fontWeight:'600'}}>eKMIT OFFLINE PAYMENT</h3>
        <br></br>
        <form onSubmit={this.handleSubmit}>
        
          <label>ROLL NUMBER</label>
          <input type="text" id="rno" name="rno" placeholder="XXXXXXXXXX" maxLength="10" onChange={this.rollNumberHandler}/>
          <button className="button btn-info" onClick={this.handleSubmit2}>CHECK</button>
          <br></br>
        <label for="ccnum">CHALLAN NUMBER</label>
        <input type="text" id="cno" name="cno" placeholder="XXXXXXXX" maxLength="8" disabled={!this.state.valid1} onChange={this.ChalanNumberHandler} />
        <br></br><b style={{ fontSize: "30px" }}>TOTAL FEE - ₹{this.state.fee}</b>
        <button className="button btn-success" type="submit" disabled={!this.state.v1}>UPDATE</button>
        </form> 
        </Jumbotron>
          </Col> 
          </Row>
          </Container>
        )
    }
}
