import React from "react";
import {Container,Row,Carousel,Col,Jumbotron} from "react-bootstrap";
import Footer from '../Footer';
import img1 from '../../images/kmit2.jpg';
import img2 from '../../images/kmit5.jpg'
import img3 from '../../images/kmit6.jpeg';
import img4 from '../../images/pic.jpg';
 

  
const Home = () => {
    return (
<Container fluid className="fontClass bg">
  <Row>
    <Col xs={1}></Col>
    <Col xs={2}>
      <h2 className="home-logo home-login-btn">Welcome to eKMIT!</h2>
      </Col>
    <Col xs={6}></Col>
    <Col xs={1} className="home-btn">
      <h2><a className="home-login-btn" href="/UserLogin">USER</a></h2>
      {/* <button style={{background:'rgb(241, 231, 231)',size:'20px'}}class="button btn-md">User</button> */}
    </Col>
    <Col xs={1} className="home-btn">
      <h2><a className="home-login-btn" href="/AdminLogin">ADMIN</a></h2>
    </Col>
  </Row>
  
  <Row>
    <Col xs={1} ></Col>
    <Col xs={10} id="home-content-wrapper">
      <Carousel >
      <Carousel.Item style={{height:'600px'}} interval={9000}>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>KMIT</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:'600px'}} interval={9000}>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Main Building</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:'600px'}}interval={3000}>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Sardar Patel Auditorium</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* <Carousel.Item style={{height:'600px'}}>
        <img
          className="d-block w-100"
          src={img4}
          alt="Fourth slide"
        />
         <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption> 
      </Carousel.Item> */}
    </Carousel>
    
   
    </Col>
    </Row>
    
    <Row>
     <Footer></Footer>
  </Row>
    </Container>
    );
  }

export default Home;
