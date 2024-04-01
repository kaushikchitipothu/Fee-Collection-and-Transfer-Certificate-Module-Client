import React,{Component} from 'react';
import axios from 'axios';
import {Container,Row,Col,Card,Jumbotron} from "react-bootstrap";
import { Redirect } from "react-router-dom";

class payFee extends Component {
  
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token')
    let username=localStorage.getItem('log')
    let loggedIn=true
    if(token==null){
        loggedIn=false
    }
    this.state = {
      cno: '',
      name: '',
      cvv:'',
      valid:false,
      v1:false,
      v2:false,
      v3:false,
      scholarship:'',
      fee:'',
      content:"Scholarship Status : NO",
      content2:"",
      loggedIn,username
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
  }

  componentDidMount(){
    var url='http://localhost:3002/feePayment/'+this.state.username
    axios.get(url)
        .then((response) => {
          var t1=JSON.parse(response.data)
          this.setState({scholarship: t1[0]})
          this.setState({fee: t1[1]})
          if(this.state.scholarship==='Full')
          {
            this.setState({fee: "8000"})
            this.setState({content: "Scholarship Status : Yes"})
            this.setState({content2: "Tuition Fee  : ₹0"})
          }
          else if(this.state.scholarship==='Partial')
          {
            var temp=parseInt(this.state.fee)
            temp=temp-50000
            var tf=temp-8000
            this.setState({fee: (temp)})
            this.setState({content: "Scholarship Status : Partial"})
            this.setState({content2: "Tuition Fee  : ₹"+tf})
          }
          else
          {
            var temp=parseInt(this.state.fee)
            this.setState({content2: "Tuition Fee  : ₹"+temp})
          }
        })
  }
  handleChange1(event) {
    this.setState({cno: event.target.value});
    var num = /^[0-9]+$/
    if(this.state.cno.length===11)
    {
      if(this.state.cno.match(num))
      {
        this.state.v1=true
       // alert(this.state.v1)
      }
      else
      {
        this.state.v1=false
        this.state.valid=false
        alert("Enter Valid Card Number")
      }
    }
    else{
      this.state.valid=false
      this.state.v1=false
    }
    if(this.state.v1===true && this.state.v2===true && this.state.v3===true)
    {
      this.state.valid=true
    }
  }
  handleChange2(event) {
    this.setState({name: event.target.value});
    var letters = /^[A-Za-z]+$/
    if(this.state.name.length!==0)
    {
      var temp=this.state.name.replace(/\s+/g,'').trim()
      if(temp.match(letters))
      {
        this.state.v2=true
      }
      else
      {
        this.state.v2=false
        this.state.valid=false
        alert("Enter Valid Name")
      }
    }
    else{
      this.state.v2=false
      this.state.valid=false
    }

    if(this.state.v1===true && this.state.v2===true && this.state.v3===true)
    {
      this.state.valid=true
    }
  }
  handleChange3(event) {
    this.setState({cvv: event.target.value});
    var num = /^[0-9]+$/
    if(this.state.cvv.length===2)
    {
      if(this.state.cvv.match(num))
      {
        this.state.v3=true;
      }
      else
      {
        this.state.v3=false
        this.state.valid=false
        alert("Enter Valid CVV")
      }
    }
    else{
      this.state.valid=false
      this.state.v3=false;
    }
    if(this.state.v1===true && this.state.v2===true && this.state.v3===true)
    {
      this.state.valid=true
    }
  } 
  handleSubmit(event) {
    alert("Fee Paid Successfully!!!")
    event.preventDefault()
        axios.post('http://localhost:3002/feePayment',{username:this.state.username})
        .then((response) => {
          if(response.data==="success"){
            window.location='/FeeDetails'
          }
          console.log(response.data)
        })
  }
  render() {
    if(this.state.loggedIn===false){
      return <Redirect to="/UserLogin"/>
    }
    return (
        <>
        <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </head>
        <body>
        <Container fluid className="fontClass">
            <Row>
                <Col xs={4} id="pay-fee-wrapper">      
                    <Card className="fontClass">
                        <div class="card-deck">
                        <div style={{background:'#2f384d'}}class="card ">
                        <div class="card-body text-center">
                        <Card.Title style={{color:'#fff'}}>YOUR FEE DESCRIPTION</Card.Title>
                        <hr></hr>
                        <Card.Body>
                        <p class="card-text">{this.state.content}</p>
                        <p class="card-text">{this.state.content2}</p>
                        <p class="card-text">Library Fee  : ₹4000</p>
                        <p class="card-text">Lab Fee : ₹4000</p>
                        </Card.Body>
                        </div>
                        </div>
                        </div>
                        </Card>
                    </Col>
        <Col  xs={5} id="payment-wrapper">
            <Jumbotron>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
            </head>
                <h2>eKMIT PAYMENT</h2>
                <label for="fname">ACCEPTED CARDS</label>
                <div class="icon-container">
                <i style={{padding:'5px'}} class="fa fa-3x fa-cc-visa"></i>
                <i style={{padding:'5px'}} class="fa fa-3x fa-cc-amex"></i>
                <i style={{padding:'5px'}} class="fa fa-3x fa-cc-mastercard"></i>
                <i style={{padding:'5px'}} class="fa fa-3x fa-cc-discover"></i>
                </div>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                <label>NAME ON CARD</label>
                <input style={{marginLeft:'7px'}} type="text" id="cname" name="cardname" placeholder="Jane Doe" value={this.state.name} onChange={this.handleChange2}/>
                <label for="ccnum">CARD NUMBER</label>
                <input style={{marginLeft:'15px'}} type="text" id="ccnum" name="cardnumber" placeholder="XXXXXXXXXXXX" maxLength="12" value={this.state.cno} onChange={this.handleChange1}></input>
                <br></br>
                <label>EXPIRY</label>
                    <select style={{marginLeft:'76px'}}id="expmonth" name="expmonth" placeholder="January" class="select1">
                        <option value="Jan">January</option>
                        <option value="Feb">February</option>
                        <option value="Mar">March</option>
                        <option value="Apr">April</option>
                        <option value="May">May</option>
                        <option value="Jun">June</option>
                        <option value="Jul">July</option>
                        <option value="Aug">August</option>
                        <option value="Sep">September</option>
                        <option value="Oct">October</option>
                        <option value="Nov">November</option>
                        <option value="Dec">December</option>
                    </select>
                    <select id="expyear" name="expyear" placeholder="2022" class="select2">
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    </select>
                    <br></br>
                    <label for="cvv">CVV</label>
                    <input style={{marginLeft:'92px'}}type="text" id="cvv" name="cvv" placeholder="XXX" maxLength="3" value={this.state.cvv} onChange={this.handleChange3}/><br></br>
                    <b style={{ fontSize: "30px" }}>TOTAL FEE - ₹{this.state.fee}</b>
                    <br></br>
                    <button className="button" type="submit" disabled={!this.state.valid}>PAY</button>
                </form> 
                </Jumbotron>
      </Col> 
            </Row>
        </Container>
        </body>
      </>
    );
  }
}
export default payFee;