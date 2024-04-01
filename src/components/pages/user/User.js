import React,{Component} from 'react';
import Navbar from '../../Navbar';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import SidebarUser from '../../SidebarUser';
import {Container,Row,Col,Button,Card} from "react-bootstrap";
import img1 from './payment.jpg';
import img2 from './app3.png';


export default class AdminHome extends Component{

  constructor(props){
    super(props)
      const token = localStorage.getItem('token')
      var username= localStorage.getItem('log')
      let loggedIn=true
      if(token==null){
          loggedIn=false
      }

      this.state={
        loggedIn,
        username
      }
  }

    componentDidMount()
    {
      var url='http://localhost:3002/feeStatus/'+this.state.username
      Axios.get(url)
      .then(response=>{
        console.log(response)
        this.setState({status:JSON.parse(response.data)})
      })
    }
      
    render(){
        if(this.state.loggedIn===false){
          return <Redirect to="/UserLogin"/>
        }
        const TC = (e) => { 
          e.preventDefault(); 
          if(this.state.status==='Paid')
          {
            window.location.assign('/bookingHome')
          }
          else{
            alert("Appointment for collecting TC can be made only after paying the fees!")
          }  
        }
        return(
          <Container fluid className="fontClass">
                <Row>
                   < Navbar/>
                </Row>
            <Row>
                <Col xs={2} id="sidebar-wrapper">      
                  <SidebarUser />
                </Col>
                <Col xs={2} id="sidebar-wrapper">      
                  <h2 style={{color:"#1f2635",fontSize:'25px'}}className="welcome">Welcome!</h2>
                </Col>
                <Col xs={3} id="page-content-wrapper"> 
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src={img1}  height="270"/>
                  <Card.Body>
                    <Card.Title><h4 className="user-card">Fee Payment</h4>
                        <h6>Pay your fees online and check transaction history.</h6>
                    </Card.Title>
                    <Button className="rounded-pill" href="/FeeDetails" variant="primary">Pay Fee</Button>
                  </Card.Body>
                </Card>
                </Col>
                <Col xs={1} id="sidebar-wrapper">      
                  
                </Col>
                <Col  xs={3} id="page-content-wrapper">
                <Card style={{ width: '20rem' }}>
                  
                    <Card.Img variant="top" src={img2} height="270" />
                    <Card.Body>
                      <Card.Title><h4 className="user-card">TC Appointment</h4>
                        <h6>Schedule an appointment to collect your Transfer Certificate.</h6>
                      </Card.Title>
                      
                      <Button className="rounded-pill" href="/bookingHome"variant="primary" onClick={TC}>Slot Booking</Button>
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col> 
                  </Col> 
            </Row>
        </Container>
        
        )
    }

}




