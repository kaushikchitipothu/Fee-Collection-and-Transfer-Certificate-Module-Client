import React, {useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Modal from 'react-bootstrap/Modal';
import Navbar from '../../../Navbar';
import SidebarUser from '../../../SidebarUser';
import {Container,Row,Col,Button} from "react-bootstrap";
import {Link,Redirect} from "react-router-dom";

function Book()
{
    
        const [token,setToken]=useState(localStorage.getItem('token'))

        const [selectedDate,setSelectedDate]=useState(null)
        const [show, setShow] = useState(true);
        var date = new Date();

        function dateChange(event){
            console.log(event)
            setSelectedDate(event)
        }
        const handleClose= () => 
        {
              setShow(false);
              window.location='/bookingHome';
        }      
    
          if(token===null)
          {
            return  <Redirect to="/UserLogin"/>
          }
        return (
        <Container fluid  className="fontClass">
                <Row>
                   < Navbar/>
                </Row>
            <Row>
                <Col xs={2} id="sidebar-wrapper">      
                  <SidebarUser />
                </Col>
                
                <Col  xs={10} id="page-content-wrapper">
                 
                <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Appointment Date</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <div class="wrapper wrapper--w360">
         
         <div className="form-group">
             <label>Select Date: </label>
             <DatePicker selected={selectedDate}  name="date" onChange={dateChange}
                 dateFormat='yyyy/MM/dd' minDate={new Date()}  maxDate={new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000))} filterDate={date =>date.getDay()!==6 && date.getDay()!==0} 
                 isClearable
                 />
                 </div>
         </div>
         </Modal.Body>
        <Modal.Footer>
        <Button className="rounded-pill" variant="secondary"><Link style={{color: '#fff'}} to={{ pathname: "/timeslot/"+String(selectedDate), }}> Submit</Link></Button>
        </Modal.Footer>
      </Modal>  
                  </Col> 
            </Row>
        </Container>
      )
  }

export default Book