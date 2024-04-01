import React,{useEffect,useState} from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import Axios from 'axios';

const SideB = props => {

    const [status,setStatus] = useState('')
    const [username,setUsername]=useState(localStorage.getItem('log'))

    useEffect(()=>
    {
      var url='http://localhost:3002/feeStatus/'+username
      Axios.get(url)
      .then(response=>{
        console.log(response)
        setStatus(JSON.parse(response.data))
      })
    })
    const TC =(e) => {
        e.preventDefault(); 
               if(status==='Paid')
               {
                window.location.assign('/bookingHome')
               }
               else{
                alert("Appointment for collecting TC can be made after paying the fees")
               
                }  
      }
   

    return (
        <>
    
    
            <Nav className="col-md-12 d-none d-md-block sidebar"
            activeKey="/AdminHome"
            
            >
                <div className="sidebar-sticky"></div>
                <nav className="shift">
                    <ul>
                    <li><a href="/User">Home</a></li>
                    <li><a href="/FeeDetails">Fee Details</a></li>
                    <li><a href="/bookingHome" onClick={TC}>Transfer Certificate</a></li>
                    <li><a href="/Profile">Profile</a></li>
                    </ul>
                </nav>
            </Nav>
          
        </>
        );
  };
  const SidebarUser = withRouter(SideB);
  export default SidebarUser