import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";


const Side = props => {
   
    return (
        <>
    
            <Nav className="col-md-12 d-none d-md-block sidebar"
            activeKey="/AdminHome">
                <div className="sidebar-sticky"></div>
                <nav className="shift">
                  <ul>
                    <li><a href="/AdminHome">Home</a></li>
                    <li><a href="/FeePayments">Fee Payments</a></li>
                    <li><a href="/AdminFee">Offline Payment</a></li>
                    <li><a href="/AdminViewAll">TC Appointments</a></li>
                  </ul>
                </nav>
            </Nav>
          
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar