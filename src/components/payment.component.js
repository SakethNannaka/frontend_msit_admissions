import React, { Component } from "react";
import Navbar from "./navbar1.component";
import "./profile.css";
import Axios from "axios";
import { Button } from "react-bootstrap";

const paymentHandler = async (e) => {
  const API_URL = "https://flask-deploy-admissions.herokuapp.com/";
  e.preventDefault();
  const orderUrl = `${API_URL}orders`;
  console.log(orderUrl);
  const response = await Axios.get(orderUrl);
  console.log(response);
  console.log(response.razorpay_payment_id);
  
  const { data } = response;

  const options = {
    key: "rzp_live_FGdmm48CwAcMir",
    name: "MSIT PROGRAM",
    description: "Some Description",
    order_id: data.id,
    handler: async (response) => {
      try {
        console.log(response.razorpay_payment_id);
        alert("payment sucessfull",response);
        console.log(response);
        const paymentId = response.razorpay_payment_id;
        const url = `${API_URL}fetch/${paymentId}`;
        const captureResponse = await Axios.get(url);
        console.log(captureResponse.data);
      } catch (err) {
        console.log(err);
        alert(err)
      }
    },
    theme: {
      color: "#686CFD",
    },
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

class Payments extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button
          variant="primary"
          style={{ width: "10%" }}
          onClick={paymentHandler}
        >
          Pay Now
        </Button>
        <a href="https://rzp.io/l/7Pq687b" className="btn-btn-primary">
          Pay Now
        </a>
      </div>
    );
  }
}
export default Payments;
