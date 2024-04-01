import React,{Component,useState} from 'react';
import Navbar from '../../Navbar';
import SidebarUser from '../../SidebarUser';
import {Container,Row,Col,Button,Table,Modal,Form,Image} from "react-bootstrap";
import Axios from 'axios';
import img1 from './pro.png'
import { Redirect } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  
    const [newPassword, setNewPassword] = useState("");
    const [username,setUsername]=useState(localStorage.getItem('log'))
    Axios.defaults.withCredentials = true;
    const reset = () => {
      console.log("reset pass")
      Axios.post("http://localhost:3002/reset", {
        username: username,
        password: newPassword,
      }).then((response) => {
        if(response.data.goto=='/'){
          window.location='/User';
          alert("Password reset successfully!");
        }
        else{
          alert("Invalid!");
        }
      });
    };
  
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Reset
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="password" name="newPassword" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />   
      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={reset} className="btn-sm btn-primary rounded-pill btn-block">Reset</Button>
      </Modal.Footer>
    </Modal>
  );
}

class Profile extends Component
{
    constructor(props)
    {
        super(props);
        const token = localStorage.getItem('token')
        var user= localStorage.getItem('log')
        let loggedIn=true
        if(token==null){
            loggedIn=false
        }
        this.state={
          username:'',email:'',mobile:'',firstname:'',lastname:'',class:'',year:'',
          modalShow:false,
          newPassword:'',
          loggedIn,
          user
        }
    }

    componentDidMount()
    {
      var url='http://localhost:3002/userProfile/'+this.state.user
        Axios.get(url).then(res => {
            console.log(res.data)
            const a=JSON.parse(res.data)
            this.setState({username:a[0]})
            this.setState({email:a[1]})
            this.setState({mobile:a[2]})
            this.setState({firstname:a[3]})
            this.setState({lastname:a[4]})
            this.setState({year:a[5]})
            this.setState({class:a[6]})
    })
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
              <Col  xs={10} >
                    <Row >
                      <Col xs={4}></Col>
                      <Col xs={4} id="pro-pic-wrapper">
                        <Image className="profile" src={img1}  />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={10} id="pro-table-wrapper">
                      <Table striped bordered hover size="lg">
                          <thead>
                            <tr>
                              <th>Hall Ticket Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Class</th>
                              <th>Year</th>
                              <th>Email</th>
                              <th>Mobile</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{this.state.username}</td>
                              <td>{this.state.firstname}</td>
                              <td>{this.state.lastname}</td>
                              <td>{this.state.class}</td>
                              <td>{this.state.year}</td>
                              <td>{this.state.email}</td>
                              <td>{this.state.mobile}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <Row>
                    <Col xs={4}></Col>
                      <Col xs={4} id="pro-btn-wrapper">
                      <div>
                        <button onClick={() => this.setState({modalShow:true})} className="btn-primary rounded-pill pill-button">Reset Password</button>
                      </div>
                        <MyVerticallyCenteredModal
                          show={this.state.modalShow}
                          onHide={() => this.setState({modalShow:false})}
                        />
                        </Col>
                    </Row>
              </Col> 
              </Row>
        </Container>
           )
    }
}

export default Profile