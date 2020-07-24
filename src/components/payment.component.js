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
  const postData = {
    email: localStorage.getItem("email"),
  };
  const options = {
    key: "rzp_live_FGdmm48CwAcMir",
    name: "MSIT PROGRAM",
    description: "Some Description",
    image:
      "https://admissions-react-msit.herokuapp.com/static/media/logo.3973b5b7.png",
    order_id: data.id,
    handler: async (response) => {
      try {
        console.log(response.razorpay_payment_id);
        alert(" payment sucessfull || status will be updated once Verified");
        console.log(response);
        const paymentId = response.razorpay_payment_id;
        const url = `${API_URL}fetch/${paymentId},${postData.email}`;
        const captureResponse = await Axios.get(url);
        console.log(captureResponse.data);
        window.location = "/profile";
      } catch (err) {
        console.log(err);
        alert(err);
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
        <Button variant="primary" onClick={paymentHandler}>
          Pay Now
        </Button>
      </div>
    );
  }
}

export default Payments;
