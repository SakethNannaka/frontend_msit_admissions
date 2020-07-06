import Navbar from "./navbar1.component";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as reac from "react-bootstrap";
import Select from "react-select";
import Table from "react-bootstrap/Table";
import "./GatApplication.css";
import "./profile.css";
import "./hrTags.css"



export default class WalkinApplication extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      isValidDate: true,
      applicationNo: "",
      testCenter: "",
      paymentStatus: "",
      slotDate: "",
      totalScore: "",
      accepted: false,
      applied: null,
    };
  }
  async componentDidMount() {
    console.log("backend call 1");
    const email = localStorage.getItem("email");
    const emailDetails = {
      email: email,
    };
    axios
      .post("https://flask-deploy-admissions.herokuapp.com/walkin", emailDetails)
      .then((response) => {
        const data = response.data;
        const walkinDetails = data.walkinDetails;
        if (data.applied) {
          this.setState({
            applicationNo: walkinDetails.appNo,
            testCenter: walkinDetails.testCenter,
            accepted: true,
            email: email,
            applied: true,
            paymentStatus: walkinDetails.paymentStatus,
            slotDate: walkinDetails.slotDate,
            totalScore: walkinDetails.totalScore,
          });
        } else {
          console.log("not applied");
          this.setState({
            applicationNo: data.appNo,
            applied: false,
            email: email,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong!! please try again");
      });
    var presentDate = new Date();
    var lastDate = new Date(new Date("7/28/2020 00:00"));
    //mm/dd/yyyy
    if (presentDate.getTime() > lastDate.getTime()) {
      console.log("date over");
      this.setState({
        isValidDate: false,
      });
    }
  }
  handleDropdownChange = (selectedOption) => {
    this.setState({ testCenter: selectedOption.value });
  };
  acceptSubmit = () => {
    this.setState({
      accepted: true,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("backend call");
    const { applicationNo, email, testCenter } = this.state;
    const walkinDetails = {
      email: email,
      applicationNo: applicationNo,
      testCenter: testCenter,
    };
    if (this.state.testCenter === "" || this.state.testCenter=== "N/A") {
      document.getElementById("alerts").innerHTML = "Test center should be selected";
      this.setState({
        testCenter: ""
      })
      return;
    }
    axios
      .post("https://flask-deploy-admissions.herokuapp.com/walkinDetails", walkinDetails)
      .then((result) => {
        if (result.data.statuscode === "200") {
          this.setState({
            slotDate: result.data.slotDate,
            paymentStatus: result.data.paymentStatus,
            totalScore: result.data.totalScore,
            applied: true,
          });
          alert("updated successfully");
        }
      })
      .catch((error) => {
        console.log("errors");
      });
  };
  
  render() {
    const userDetails = JSON.parse(localStorage.getItem("state"));
    const image_url   ="https://admissionsimagebucket.s3.ap-south-1.amazonaws.com/"+localStorage.getItem("email")+".jpeg" ;
    console.log("walkin", userDetails.image_url)
    return (
      <div>
        <Navbar />

        <div className="container">
    <div className="view-account" style={{padding:'10px'}}>
      <section className="module">
        <div className="module-inner">
          <div className="side-bar">


             <div className="user-info" style={{marginTop:'50px'}}>
             <img id="pp"                     
                     className="img-profile img-circle img-responsive center-block"
                     src={image_url} 
                     alt=""
                     onError={(e)=>{e.target.onerror = null; e.target.src="https://paradisevalleychristian.org/wp-content/uploads/2017/01/Blank-Profile.png"}} 
                     />
                     
                <ul className="meta list list-unstyled">
                  <li className="name">
                    <h4>{userDetails.full_name}</h4>
                  </li>
                  <li className="email">
                    <a href >{userDetails.email}</a>
                  </li>
                  {/* <label className="label label-info">Applicant</label> */      }

                </ul>
            </div>


            <nav className="side-menu">
              <ul className="nav">
              
                      <li>
                      <Link className="nav-link" to={"/profile"}>
                          <span className="fa fa-user"></span> Profile                      
                          </Link>
                      </li>
                       

                      <li>
                      <Link className="nav-link" to={"/gat"}>
                          <span className="fa fa-th"></span> GAT
                          </Link>
                      </li>
                      <li className="active">
                      <Link className="nav-link" to={"/walkin"}>
                          <span className="fa fa-clock-o"></span> Walkin                      
                          </Link>
                      </li>

                      {/* <li>
                      <Link className="nav-link" to={"/edit"}>
                          <span className="fa fa-cog"></span> Edit Profile                      
                          </Link>
                      </li>
                       */}
              </ul>
            </nav>
          </div>
          <div className="content-panel">
          <hr style={{marginTop:'100px'}}id="seven" data-symbol="Walkin"></hr>

        <Application
        this = {this}
          // applied={this.state.applied}
          // applicationNo={this.state.applicationNo}
          // isValidDate={this.state.isValidDate}
          // accepted={this.state.accepted}
          // acceptSubmit={this.acceptSubmit}
          // handleSubmit={this.handleSubmit}
          // handleDropdownChange={this.handleDropdownChange}
        />
        {/* <AppliedApp
          applied={this.state.applied}
          applicationNo={this.state.applicationNo}
          testCenter={this.state.testCenter}
          paymentStatus={this.state.paymentStatus}
          slotDate={this.state.slotDate}
          totalScore={this.state.totalScore}
        /> */}
                </div>
        </div>
<p align = "center">MSIT Admissions @2020</p>

      </section>
    </div>
  </div>
     
      </div>
    );
  }
}
const Application = (props) => {
  console.log("gat", props.this.state.isValidDate);
  if (props.this.state.isValidDate & (props.this.state.applied == null)) {
    console.log("null");
    return <div></div>;
  } else if (props.this.state.isValidDate & !props.this.state.applied) {
    console.log("not applied", props.this.state.applied);
    return (
      <reac.Container className="main-content">
        <Walkin1 this = {props.this}  />
        <Walkin2
          this={props.this}
        />
      </reac.Container>
    );
  } else if (props.this.state.isValidDate & props.this.state.applied) {
    console.log("applied", props.this.state.applied);
    return (
      <div>
        <AppliedApp this = {props.this}/>
      </div>
    );
  } else {
    console.log("else");
    return (
      <reac.Container className="main-content">
        <div>
          <h5>You cannot apply now. Last date for walkin is MAY 25, 2020</h5>
        </div>
      </reac.Container>
    );
  }
};
const Walkin1 = (props) => {
  if (props.this.state.accepted === false) {
    return (
      <div>

        <reac.Row>

          <reac.Col className="note-box">
            <h5>
              Note: Dear applicant walk-in entrance test can be taken{" "}
              <b>only one time</b>, but you can take<b> GAT Regular one time</b>
              <br></br>
              **Please Book your slot after you pay the fee.{" "}
              <strong>
                (if you pay the fee, link will be visible under Date {"&"} Slot
                column in the below table){" "}
              </strong>
            </h5>
          </reac.Col>
        </reac.Row>
        <br></br>
        <reac.Row>
          <reac.Col></reac.Col>
          <h5>Do you want to apply Walk-in?</h5>
          <reac.Col></reac.Col>
        </reac.Row>
        <reac.Row>
          <reac.Col></reac.Col>
          <reac.Col></reac.Col>
          <reac.Col>
            <div className="footer">
              <reac.Button
                type="submit"
                variant="primary"
                onClick={props.this.acceptSubmit}
              >
                Yes
              </reac.Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/profile">
                <reac.Button variant="primary">No</reac.Button>
              </Link>
            </div>
          </reac.Col>
          <reac.Col></reac.Col>
          <reac.Col></reac.Col>
        </reac.Row>
      </div>
    );
  } else {
    return <div></div>;
  }
};
const options = [
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Kakinada", label: "Kakinada" },
  { value: "Home", label: "Home" },
];
const Walkin2 = (props) => {
  if (props.this.state.accepted === true) {
    return (
      <div>
        <reac.Form onSubmit={props.this.handleSubmit}>
          
          <p style={{ color: "red", fontSize:'15px'}} id="alerts"></p>
          <reac.Col className="note-box">
            <h5>
              Note: Dear applicant walk-in entrance test can be taken{" "}
              <b>only one time</b>, but you can take<b> GAT Regular one time</b>
              <br></br>
              **Please Book your slot after you pay the fee.{" "}
              <strong>
                (if you pay the fee, link will be visible under Date {"&"} Slot
                column in the below table){" "}
              </strong>
            </h5>
          </reac.Col>
          <br></br>
          <br></br>
          <br></br>
          <reac.Form.Group className="formBasicUsername">
            <reac.Form.Label>Application Number*</reac.Form.Label>
            <reac.Form.Control
              type="text"
              name="name"
              className="form-control"
              readOnly
              value={props.this.state.applicationNo}
            />
          </reac.Form.Group>
          <reac.Form.Group>
            <label>Test Centre*</label>
            <div>
              <div>
                <div>
                  <Select
                    options={options}
                    onChange={props.this.handleDropdownChange}
                  />
                </div>
              </div>
            </div>
          </reac.Form.Group>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <reac.Button variant="primary" type="submit">
              Apply
            </reac.Button>
            <Link to="/profile">
              <reac.Button variant="primary">Cancel</reac.Button>
            </Link>
          </div>
        </reac.Form>
        </div>
    );
  } else {
    return <div></div>;
  }
};
const AppliedApp = (props) => {
  let applicationNo = props.this.state.applicationNo;
  let testCenter = props.this.state.testCenter;
  let paymentStatus = props.this.state.paymentStatus;
  let slot = props.this.state.slotDate;
  let totalScore = props.this.state.totalScore;

  if (!props.this.state.applied) {
    applicationNo = "";
    testCenter = "";
    paymentStatus = "";
    slot = "";
    totalScore = "";
  }
    return (
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>

      
      <div className="table" style={{justifyContent: "center", alignItems: "center"}}>
        <br></br>
        <Table responsive="md" striped bordered hover style = {{fontFamily:"Roboto", width: '100%', justifyContent: "center", alignItems: "center"}}>
          <thead>
            <tr>
              <th style = {{width : 'auto'}}>Application Number</th>
              <th>Test Center</th>
              <th>Payment Details</th>
              <th>Date {'&'} Slot</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{applicationNo}</td>
              <td>{testCenter}</td>
              <td>{paymentStatus}</td>
              <td>{slot}</td>
              <td>{totalScore}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      </div>
    );
};
