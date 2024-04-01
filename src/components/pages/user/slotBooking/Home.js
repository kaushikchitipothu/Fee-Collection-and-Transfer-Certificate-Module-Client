import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import bookImage from '../bookAppointment.png'
import schedule from '../schedule.png'
import cancel1 from '../cancel2.png'
import { Redirect } from "react-router-dom";
import Navbar from '../../../Navbar';
import SidebarUser from '../../../SidebarUser';
import {Container,Row,Col,Button,Card} from "react-bootstrap";

class Home extends Component{
 
  constructor(props){
    super(props)
      const token = localStorage.getItem('token')
      var username= localStorage.getItem('log')
      let loggedIn=true
      if(token==null){
          loggedIn=false
      }

      this.state={
        loggedIn,username,
        status:'Pending'
      }

  }
  componentDidMount()
    {
      var url='http://localhost:3002/tcStatus/'+this.state.username
      axios.get(url)
      .then(response=>{
        console.log(response)
        this.setState({status:JSON.parse(response.data)})
      })
    }
    render(props)
    {
      if(this.state.loggedIn===false){
        return <Redirect to="/UserLogin"/>
      }
      const book = (e) => { 
        if(this.state.status==="TC Collected"){
          alert("TC has been collected already!")
        }
        else{
        e.preventDefault(); 
        var url='http://localhost:3002/book/check/'+this.state.username
        axios.get(url)
        .then(response => {
           console.log(response.data+'aftercheck')
           if(response.data==='Cannot make an appointment')
           {
             window.location='/bookingHome'
             alert("Cannot make an appointment since an active appointment already exists!")
           }
           else{
            window.location.assign('/book')
            }
        }) 
      } 
     }

     const view = (e) => { 
      e.preventDefault(); 
      var url='http://localhost:3002/view/check/'+this.state.username
      axios.get(url)
      .then(response => {
         console.log(response.data)
         if(response.data==='ok')
         {
           window.location='/view'
         }
         else{
          window.location.assign('/bookingHome')
          alert('No appointments to view!')
        }
      })}

      const cancel = (e) => { 
        e.preventDefault(); 
        var url='http://localhost:3002/book/check/'+this.state.username
        axios.get(url)
        .then(response => {
          console.log(response.data)
          if(response.data==='ok')
          {
            window.location='/bookingHome'
            alert('No active appointment is available to cancel!')
          }
          else{
            window.location.assign('/cancel')
          }
        })
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
          <Col xs={10} id="tc-content-wrapper">
            <Row>
                <Col xs={3} ></Col>
                <Col xs={3} id="tc-card-wrapper">
                  <Card border="danger"style={{ width: '15rem' }}>
                    <Card.Body>
                      <Card.Title><h3 className="text-center">TC Status</h3></Card.Title>
                      <Card.Subtitle className="mb-2 text-muted text-center"><h4>{this.state.status}</h4></Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>       
            </Row>
          
            <Row>            
                <Col  xs={2} style={{padding: '30px 0px 0px 0px'}}>  
                  <Card   style={{ width: '20rem' }} >
                  <Card.Img variant="top" src={schedule}  height="215"/>
                        <Card.Body>
                        <Card.Title><h3>Schedule Appointment </h3>
                              <h6>Select Date and Time.</h6>
                          </Card.Title>
                          <Button className="rounded-pill" onClick={book} variant="primary">Book a Slot</Button>
                        </Card.Body>
                  </Card> 
                </Col>
         
               
                <Col  xs={2} style={{padding: '30px 200px 500px 200px'}}>
                 <Card style={{ width: '20rem' }} >
                 <Card.Img variant="top" src={bookImage}  height="231"/>
                    <Card.Body>
                      <Card.Title><h3>View Appointment </h3>
                        <h6>View all the active and inactive appointments.</h6>
                      </Card.Title>
                      <Button className="rounded-pill" onClick={view} variant="primary">View All</Button>
                    </Card.Body>
                  </Card> 
                </Col> 
            
                <Col  xs={2} style={{padding: '30px 200px 500px 200px'}}>
                  <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src={cancel1}  height="215"/>
                      <Card.Body>
                      <Card.Title><h3>Cancel Appointment </h3>
                        <h6>Cancel an active appointment.</h6>
                      </Card.Title>
                      <Button className="rounded-pill" onClick={cancel} variant="primary">Cancel</Button>
                      </Card.Body>
                  </Card>  
                </Col>
            </Row>
          </Col>
      </Row>
      
  </Container>
  )     
    }
  }
export default Home