import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Navbar from '../../../Navbar';
import SidebarUser from '../../../SidebarUser';
import {Container,Row,Col,Button,Card} from "react-bootstrap";

class Cancel extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            bookedDate:'',
            appointDate:'',
            appointTime:'',
            bookStatus:''
        }
        const token = localStorage.getItem("token");
        var username= localStorage.getItem('log')
        let loggedIn=true
        if(token==null){
            loggedIn=false
        }

        this.state={
          loggedIn,username
        }
    }
    componentDidMount()
    {
        var url='http://localhost:3002/view/'+this.state.username
        axios.get(url).then(res => {
            console.log(res.data)
        const a=JSON.parse(res.data)
         this.setState({bookedDate:a[0]})
         this.setState({appointDate:a[1]})
         this.setState({appointTime:a[2]})
         this.setState({bookStatus:a[3]})
         this.setState({timestamp:a[4]})
        })
    }
    submitHandler=(e)=>{
        e.preventDefault()
        console.log('inside cancel submit')
        axios.post('http://localhost:3002/cancel',{date:this.state.timestamp, username:this.state.username}).then((response) => {
            console.log(response)
            if(response.data==='deleted')
            {
                alert("Appointment cancelled successfully!");
                window.location='/bookingHome';
            }
            });
    }

    render(props)
    {
        if(this.state.loggedIn===false){
            return <Redirect to="/UserLogin"/>
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
        <Col xs={3} id="sidebar-wrapper">      
          
        </Col>
        
        <Col  xs={3} id="page-content-wrapper">
        <form onSubmit={this.submitHandler}>
        <div class="wrapper wrapper--w360">
        <Card border="danger" style={{ width: '20rem' }}>
            <Card.Header style={{ fontWeight: '600',fontSize:'20px' }}className="text-center">
               TC Appointment
            </Card.Header>
            <Card.Body>
                <label >Booked on : {this.state.bookedDate}</label>
                <label>Appointment Date : {this.state.appointDate}</label>
                <label>Appointment Time : {this.state.appointTime}</label>
                <label>Booking Status : {this.state.bookStatus}</label>
                <Button className="rounded-pill"type="submit" variant="danger">Cancel</Button>
                </Card.Body>
                </Card>
                </div>
               
                </form>
         
                
            
          </Col> 
    </Row>

</Container>





          
      )
    }
}
export default Cancel