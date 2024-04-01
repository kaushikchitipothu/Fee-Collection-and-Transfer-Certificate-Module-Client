import Navbar from '../../Navbar';
import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import {Container,Row,Col,Button,Card } from "react-bootstrap";
import img1 from './fees.png';
import img2 from './appointment.jpg';

export default class AdminHome extends Component{

    constructor(props){
      super(props)
        const token = localStorage.getItem("token");
        let loggedIn=true
        if(token==null){
            loggedIn=false
        }

        this.state={
          loggedIn
        }

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
                  <h2 style={{color:"#1f2635",fontSize:'25px'}}className="welcome">Welcome Admin!</h2>
                </Col>
                <Col xs={3} id="page-content-wrapper"> 
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src={img1} height="270"/>
                  <Card.Body>
                  <Card.Title><h4 className="admin-card">Fee Payments</h4>
                        <h6>View fee payment details of students. </h6>
                    </Card.Title>
                    <Button className="rounded-pill"href="/FeePayments" variant="danger">View Payments</Button>
                  </Card.Body>
                </Card>
                </Col>
                <Col xs={1} id="sidebar-wrapper">      
                  
                </Col>
                <Col  xs={3} id="page-content-wrapper">
                <Card style={{ width: '20rem' }}>
                  
                    <Card.Img variant="top" src={img2} height="270" />
                    <Card.Body>
                      <Card.Title><h4 className="admin-card">TC Appointments</h4>
                        <h6>View all the TC appointments booked by students.</h6>
                      </Card.Title>
                      
                      <Button className="rounded-pill" href="/AdminViewAll"variant="danger">View TC Appointments</Button>
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





