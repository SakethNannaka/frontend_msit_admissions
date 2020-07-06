import React, { Component } from "react";
import Navbar from "./navbar1.component"
import "./profile.css"
import Card from "react-bootstrap/Card";
// import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';

const EXAM = [
  { label: "GAT", value: 22 },
  { label: "WALKIN", value: 23 },
];

const Session = () =>{
    return ( <div>

<div className="container" style={{paddingTop:'100px'}}>
<div className="view-account" >

&nbsp;
<Card style={{backgroundColor:'white', padding:'50px'}}>
<h1 align="left" color="red">Payment Details</h1>
<div className="row">
      <nav className="side-menu">
        <ul className="nav">
          <li>
            <a href="#">
              <span className="fa fa-credit-card"></span> My Payments
            </a>
          </li>
          <li>
            <a href="#">
              <span className="fa fa-clock-o"></span> Pay Online
            </a>
          </li>
        </ul>
      </nav>
      </div>
<hr></hr>
<br></br>

<section className="module">

  </section>
      <div className="row">
        <div className="col-md-4">
          <label ><h5>
            Amount(Rs.) : 1000/-
          </h5></label> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>  
      </div>

      <div className="row">
          <div className="col-md-4">
            <Select options={EXAM} />
          </div>
      </div>

      <br></br>
      <Card style={{paddingLeft:"10px", backgroundColor:'#fff3cc'}}>
        <Card.Body>
        <div className='row' style={{paddingLeft:'15px'}}>
        <div className="col-md-12">
        <FormControlLabel
              control={<Checkbox name="gilad" />}
              label="I hereby declare that I agree to the terms and conditions of CIHL "
        />
        <a href="#" >Read terms and conditions</a>
        </div>
        </div>

        </Card.Body>
      </Card>
      <br></br>
      
      <Card style={{paddingLeft:"10px", backgroundColor:'#e6f9ff'}}>
        <Card.Body style={{width:'100%'}}>
        <Button variant="outline-primary" style={{width:'10%'}} id="rzp-button1" block >Pay</Button>
        </Card.Body>
      </Card>

      <br></br>
      <Card style={{paddingLeft:"10px", backgroundColor:'#fff3cc'}}>
        <Card.Body>
          <Card.Text >
            <h5 float='left'>Note: After clicking on the "Pay" button, you will be directed to a secure gateway for payment.
             Don't Close the Browser or Stop Until the Page returns MSIT Website.</h5> 
          </Card.Text>
        </Card.Body>
      </Card>
</Card>
</div>
</div>
</div>);
}



class Payments extends Component {
    
    
    render() { 
        return(
          <div>
            <Navbar />

            <Session/>
          </div>
        );
    }
}
export default Payments;
