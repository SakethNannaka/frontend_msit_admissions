import React, { Component } from 'react'
import * as reac from "react-bootstrap"
import Navbar from "./navbar1.component"

 export default class Contact extends Component {
     render() {
        return (

            <div>
                <Navbar />
                    <reac.Card style ={{marginTop: "100px", justifyContent: "center", justifyItems: "center", width: "50%", position:"relative", left: "25%"}}>
                        <reac.Card.Header>Contact us</reac.Card.Header>
                        <reac.Card.Body>
                        <div className = "container">
                            <br></br>
                            <h6>IIIT Campus, Gachibowli, Hyderabad-500032</h6>
                            <br></br>
                            <h6>Phone No:040-66531342</h6>
                            <br></br>
                            <h6>Mobile No:+91 7799834583, 7799834585</h6>
                            <br></br>
                            <h6>Email:enquiries@msitprogram.net</h6>
                            <br></br>
            
                        </div>
                        </reac.Card.Body>
                </reac.Card>
            </div>
        )
     }
}