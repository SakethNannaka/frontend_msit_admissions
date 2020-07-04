import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import React, {Component} from "react"
import msitprocess from "./msitprocess.jpeg"
import { Container, Row} from 'reactstrap';
import * as reac from 'react-bootstrap';

export default class Process extends Component {
    render() {

        return(
          
              <Container style={{marginTop:'100px', padding:'100px'}}>
              <Row xs={"auto"} md={"auto"} lg={"auto"} sm={"auto"} style={{justifyContent:'center', alignItems:'center'}}>
              <div style={{display:'flex', flexDirection:'column'}}>
                <div>
                <h1 align="center">Welcome to MSIT Admissions 2020</h1>
                </div>
                <br></br>
                <br></br>
                <hr style={{backgroundColor:'red'}}></hr>
                <br></br>

                <Image src={msitprocess} fluid />
              </div>
              </Row>
              <br></br>
              <br></br>
              <br></br>
              <Row xs={"auto"} md={"auto"} lg={"auto"} sm={"auto"} style={{justifyContent:'center', alignItems:'center'}}>

              <Link className="nav-link" to={"/login"}><reac.Button variant="primary" style={{backgroundColor:'orange', float:'left'}} block>Click Here to SIGNIN</reac.Button>  </Link>       
            
              <Link className="nav-link" to={"/register"}><reac.Button variant="primary" style={{backgroundColor:'orange',float:'right'}} block>Click Here to SIGNUP</reac.Button>  </Link>             


              </Row>

              </Container>
              
        )
    }
}