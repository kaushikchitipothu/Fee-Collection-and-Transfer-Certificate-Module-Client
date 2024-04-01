import React,{Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../../../Navbar';
import SidebarUser from '../../../SidebarUser';
import { Redirect } from "react-router-dom";
import {Container,Row,Col,Button} from "react-bootstrap";


class Timeslot extends Component
{
    constructor(props)
    {
        super(props);
        const token = localStorage.getItem('token')
        var username= localStorage.getItem('log')
        const selecteddate=this.props.match.params.id
        let loggedIn=true
        if(token==null){
            loggedIn=false
        }
        var today = new Date(),
        time = today.getHours() + ':' + today.getMinutes() ;
        this.dates=["09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","14:30","15:00","15:30","16:00"];
        this.state = {
            booked:[],
            currentTime:time,
            bookDate : '',
            currentDates:[],
            loggedIn, username,selecteddate
        }
    }
    componentDidMount()
    {
        var url='http://localhost:3002/book/'+this.state.selecteddate
        axios.get(url).then(res => {
          console.log(res.data)
          const a=JSON.parse(res.data)
          this.setState({booked:a})
          this.setState({bookDate:a[0]})
          const b=this.state.bookDate.split("-")
          console.log(this.state.bookDate)
          this.setState({currentDates:this.dates.map((date)=>(  
            new Date(parseInt(b[0]), parseInt(b[1])-1, parseInt(b[2]), parseInt(date.split(":")[0]), parseInt(date.split(":")[1]))
        ))})
        console.log(this.state.currentDates)       
        })
    }

      submitHandler =(time)=>(e)=>{
            e.preventDefault()
            console.log(time)
            axios.post('http://localhost:3002/timeSlot/',{timing:time,username:this.state.username,date:this.state.selecteddate}).then((response) => {
                console.log(response);
                if(response.data==='OOPS!! slot has been booked already')
                {
                    alert("OOPS!!! Slot has been booked already. Choose an other slot.");
                    window.location='/timeslot/'+String(this.state.selecteddate);
                }
                else{
                    alert("TC slot booked successfully!");
                    window.location='/bookingHome';
                }
                });
        }
    render(props)
    {
        if(this.state.loggedIn===false){
            return <Redirect to="/UserLogin"/>
          }
       return (
        <Container fluid className="fontClass">
        <Row>
           < Navbar/>
        </Row>
    <Row>
        <Col xs={2} id="sidebar-wrapper">      
          <SidebarUser />
        </Col>
        <Col  xs={10} id="page-content-wrapper"> 
         <div class="row">
     {this.state.currentDates.map((date)=>(
         <form class="col-sm-3" onSubmit={this.submitHandler(date.toString().split(" ")[4].substring(0,5))}>
             <div id={date}  style={{ padding: '20px 0px 20px 0px' }} >
                <Button variant={(this.state.booked.includes(date.toString().split(" ")[4].substring(0,5)) ||
                 new Date().getTime()>date.getTime() )?'danger':'success'} type="submit" name={date.toString().
                 split(" ")[4].substring(0,5)} value={date.toString().split(" ")[4].substring(0,5)} 
                  disabled={this.state.booked.includes(date.toString().split(" ")[4].substring(0,5)) || 
                  new Date().getTime()>date.getTime() }>{date.toString().split(" ")[4].substring(0,5)}</Button>
                
             </div> 
        </form>
        ))}             
        </div>   
        </Col> 
    </Row>

</Container>    
       )
    }
}
export default Timeslot