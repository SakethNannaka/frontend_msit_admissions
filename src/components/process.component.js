import React, {Component} from "react"
import msitprocess from "./msitprocess.jpeg"
import * as reac from 'react-bootstrap';

export default class Process extends Component {
    render() {
        return(
            <div>
                {/* <br></br>
                <hr></hr>
                <br></br>
                <div style = {{position: "relative", left: "25%"}}>
                <img src={msitprocess} alt="msitlogo" height={200}/>
                </div> */}
                <reac.Container>
                <reac.Row style = {{justifyContent: "center", justifyItems: "center",  margin: "100px",  padding: "20px"}}>
                    <reac.Image src= {msitprocess} fluid />
                </reac.Row>
              </reac.Container>
            </div>
        )
    }
}