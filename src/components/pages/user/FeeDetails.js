import NavbarUser from '../../NavbarUser';
import axios from "axios";
import { Redirect } from "react-router-dom";
import React,{Component} from 'react';
import Navbar from '../../Navbar';
import SidebarUser from '../../SidebarUser';
import {Container,Row,Col,Button,Card,Nav,Table,Jumbotron} from "react-bootstrap";

export default class FeeDetails extends Component{

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
        status:'',
        username
      }

  }
  componentDidMount()
  {
    var url='http://localhost:3002/feeStatus/'+this.state.username
    axios.get(url)
    .then(response=>{
      console.log(response)
      this.setState({status:JSON.parse(response.data)})
    })
  }
      
    render(){
      if(this.state.loggedIn===false){
        return <Redirect to="/UserLogin"/>
      }
      const payFee = (e) => { 
          e.preventDefault(); 
          if(this.state.status==='Paid')
          {
            alert("Fees for the current year has already been paid!")
          }
          else{
            window.location.assign('/PayFee')
          }    
      }

     const history = (e) => { 
        e.preventDefault(); 
        if(this.state.status==='Paid')
        {
          window.location.assign('/History')        
        }
        else{
          alert("No payment history to show!")
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
                <Col  xs={10} id="fee-content-wrapper">                       
                        <Row>
                          <Col xs={3} ></Col>
                          <Col xs={3} id="fee-card-wrapper">
                          <Card border="primary"style={{ width: '18rem' }}>
                            <Card.Body>
                              <Card.Title><h4>Fee Status 2020-21</h4></Card.Title>
                              <Card.Subtitle className="mb-2 text-muted text-center"><h2>{this.state.status}</h2></Card.Subtitle>
                            </Card.Body>
                          </Card>
                          </Col>
                        </Row>
                        <Row>
                          <Col  xs={5} id="fee-content-wrapper">
                              <Jumbotron>
                              
                              <h2 className="fee-h1">Fee Payment</h2>
                              <p className="fee-p">
                                Pay fees using Debit Card (DC) or Credit Card (CC).
                                {/* Pay fees using Net Banking (NB), Debit Card (DC), Credit Card (CC) or UPI. */}
                              </p>
                              <p>
                                <Button className="rounded-pill button"variant="danger" onClick={payFee}>PAY NOW</Button>
                                </p>
                            
                              </Jumbotron>
                          </Col> 
                          <Col  xs={5} id="fee-content-wrapper">
                          
                            <Jumbotron>
                            <h2 className="fee-h2">History</h2>
                            <p className="fee-p">
                              Check your fee payment history and download transaction statements.
                            </p>
                            <p>
                              <Button className="rounded-pill button" variant="dark" onClick={history}>VIEW HISTORY</Button>
                            </p>
                          </Jumbotron>

                          </Col> 
                          </Row>
                          </Col>
            </Row>
        </Container>

        
        )
    }

}





 