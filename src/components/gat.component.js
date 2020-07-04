//import following packages before run this file
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as reac from "react-bootstrap";
import Select from "react-select";
import Table from "react-bootstrap/Table";
//support files
import "./GatApplication.css";
import Navbar from "./navbar1.component";
import "./profile.css";


/**
 * This class is to apply,display,edit GAT application.When user clicks
 * on GAT in dashboard,first it calls API by ComponentDidMount method and feteches whether user
 * already applied or not.If already applied then it displays the GAT application details
 * otherwise it allows user to fill GAT application.
 * ComponentDidMount method also checks whether the date crosses the last date to apply or not.
 * For modularity I write the render content in child components they are:
 * 1.Application(It constains gat application.It has two child components a.ApplyGAT b.ApplyGRE)
 *      a.ApplyGAT(it contains gat application like application no, test center)
 *      b.ApplyGRE(it contains gre application like gre scores)
 * 2.AppliedApp(User applied application details table)
 */
export default class GatApplication extends Component {
  constructor() {
    super();
    this.state = {
      examOpt: "",
      applicationNo: "",
      testCenter: "",
      paymentStatus: "",
      //for gre scores
      quantVerbal: "",
      analytical: "",
      //this field is used as flag that user already applied or not. If user already applied
      //then it sets to true
      applied: null,
      //this field is used as flag i.e when the last date crosses then it sets to false
      isValidDate: true,
    };
  }

  /**
   * It have two duities. One to fetch data from API immediately when user opens this page.
   * Second one is two check whether last date is over or not immediately when user opens this page.
   */
  async componentDidMount() {
    const { applied } = this.state;
    //getting email from localstorage in browser
    const email = localStorage.getItem("email");
    const details = {
      email: email,
    };
    //API call to fetch data whether user already applied or not
    const res = await axios
      .post("https://flask-deploy-admissions.herokuapp.com/gatApplication", details)
      .then((response) => {
        console.log("success");
        const data = response.data;
        const gatDetails = data.gatDetails;
        console.log("gatdetails", gatDetails);
        if (data.applied) {
          console.log("appno", gatDetails.appNo);
          this.setState({
            applicationNo: gatDetails.appNo,
            testCenter: gatDetails.testCenter,
            appType: gatDetails.examType,
            analytical: gatDetails.greAnalytical,
            quantVerbal: gatDetails.greScore,
            paymentStatus: gatDetails.paymentStatus,
            applied: true,
          });
        } else {
          this.setState({
            applicationNo: data.appNo,
            applied: false,
          });
        }
      });
    //For checking last date
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
  /**
   * This method sets the examopt when users selects one of the exam either gat or gre.
   * When user selects gre then it sets examopt to GRE.It enables the respective application
   * page.
   * @param {*} e event
   */
  onChange = (e) => {
    this.setState({
      examOpt: e.target.value,
    });
    //when option changes from gre to gat, then it clears the fields
    if (e.target.value === "GAT") {
      this.setState({
        quantVerbal: "",
        quantVerbalError: false,
        analytical: "",
        analyticalError: false,
      });
    }
  };
  //this is to select testcenters
  handleDropdownChange = (selectedOption) => {
    this.setState({ testCenter: selectedOption.value });
  };
  /**
   * When user selects GRE and starts filling application, He need to enter quantative & verbal score
   * and analytical score. This functions checks whether input is valid or not.
   * If any invalid input then it sets error message otherwise it sets input into state variable
   * @param {*} e event
   * It calls th emethods validateQuantVerbal(quantVerbal),validateAnalytical(analytical)
   */
  handleChange = (e) => {
    if (e.target.name === "quantVerbal") {
      console.log("notnumber");
      this.validateQuantVerbal(e.target.value);
    }
    if (e.target.name === "analytical") {
      this.validateAnalytical(e.target.value);
    }
  };
  //to check quantVerbal score input is valid or not
  validateQuantVerbal(quantVerbal) {
    if (quantVerbal < 301 || quantVerbal > 340) {
      this.setState({
        quantVerbalError: true,
        quantVerbal: quantVerbal,
      });
    } else {
      this.setState({
        quantVerbalError: false,
        quantVerbal: quantVerbal,
      });
    }
  }
  //to check analytical score input is valid or not
  validateAnalytical(analytical) {
    if (analytical < 3.5 || analytical > 6) {
      this.setState({
        analyticalError: true,
        analytical: analytical,
      });
    } else {
      this.setState({
        analyticalError: false,
        analytical: analytical,
      });
    }
  }
  /**
   * This method is to edit the applied application
   */
  editApplication = () => {
    this.setState({
      applied: false,
    });
  };
  /**
   * After user filled the application, when he clicks on apply then
   * this method was called.This method send the user application details to API
   * and if it receives status code 200 then it shows application submited sucessfully
   * @param {*} event
   */
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("can", event.target.name);
    console.log("backend call");
    const email = localStorage.getItem("email");
    const {
      applicationNo,
      examOpt,
      testCenter,
      analytical,
      quantVerbal,
    } = this.state;
    const gatDetails = {
      email: email,
      applicationNo: applicationNo,
      testCenter: testCenter,
      appType: examOpt,
      analytical: analytical,
      quantVerbal: quantVerbal,
    };

    axios
      .post("https://flask-deploy-admissions.herokuapp.com/gatDetails", gatDetails)
      .then((result) => {
        if (result.data.status == "inserted") {
          this.setState({
            paymentStatus: result.data.payment,
            appType: examOpt,
            applied: true,
          });
          alert("inserted successfully");
        } else if (result.data.status == "updated") {
          this.setState({
            paymentStatus: result.data.payment,
            appType: examOpt,
            applied: true,
          });
          alert("updated successfully");
        } else {
          alert(result.data.status);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  /**
   * This is our main render method. Here we calls two child components.
   * One is Application(It constains gat application.It has two child components a.ApplyGAT b.ApplyGRE)
   *  and second one is AppliedApp(User applied application details table)
   */
  render() {
    const userDetails = JSON.parse(localStorage.getItem("state"));
    const image_url   ="https://admissionsimagebucket.s3.ap-south-1.amazonaws.com/"+localStorage.getItem("email")+".jpeg" ;
    return (
      <div>
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
  
    <div className="container" width="1250px">
    <div className="view-account">
      <section className="module">
        <div className="module-inner">
          <div className="side-bar"     >

             <div className="user-info">

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

                      <li className="active">
                      <Link className="nav-link" to={"/gat"}>
                          <span className="fa fa-th"></span> GAT
                          </Link>
                      </li>
                      <li>
                      <Link className="nav-link" to={"/walkin"}>
                          <span className="fa fa-clock-o"></span> Walkin                      
                          </Link>
                      </li>
                      {/* <li>
                      <a href >
                          <span className="fa fa-cog"></span> Edit Profile
                          </a>
                      </li> */}
              </ul>
            </nav>
          </div>
          <div className="content-panel">
            <h2 className="title">
              {/* Profile */}
              <span className="pro-label label label-warning">GAT</span>
            </h2>
        <Application
          applied={this.state.applied}
          examOpt={this.state.examOpt}
          applicationNo={this.state.applicationNo}
          quantVerbal={this.state.quantVerbal}
          analytical={this.state.analytical}
          quantVerbalError={this.state.quantVerbalError}
          analyticalError={this.state.analyticalError}
          isValidDate={this.state.isValidDate}
          buttonDisabled={this.state.buttonDisabled}
          onChange={this.onChange}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDropdownChange={this.handleDropdownChange}
        />
        <AppliedApp
          applied={this.state.applied}
          applicationNo={this.state.applicationNo}
          quantVerbal={this.state.quantVerbal}
          analytical={this.state.analytical}
          testCenter={this.state.testCenter}
          paymentStatus={this.state.paymentStatus}
          appType={this.state.appType}
          editApplication={this.editApplication}
        />
             </div>
        </div>
      </section>
    </div>
  </div>
     
      </div>
    );
  }
}
const Application = (props) => {
  console.log("gat", props.isValidDate);
  if (props.isValidDate & (props.applied == null)) {
    console.log("null");
    return <div></div>;
  } else if (props.isValidDate && !props.applied) {
    return (        

          <reac.Container className="main-content">
        <reac.Row>
          <reac.Col>
            <h5 className="note-box">
              Dear Applicant, You have two ways to get Admission into MSIT
              <li>
                GAT is the regular entrance test will be conducted for admission
                into MSIT.
              </li>
              <li>
                Entrance Test Waived for the candidates with GRE scores above{" "}
                <strong>301/340</strong> or equivalent old scores also
                considered.(GRE should have been taken after{" "}
                <strong>2016</strong>
                ).
              </li>
            </h5>
          </reac.Col>
        </reac.Row>
        <br></br>
        <h5>Please select your choice!!</h5>
        <reac.Row>
          <reac.Col></reac.Col>
          <reac.Col>
            <div className="radio-div">
              <label className="radio">
                <input
                  type="radio"
                  value="GAT"
                  checked={props.examOpt === "GAT"}
                  name="exam"
                  onChange={props.onChange}
                />
                GAT
              </label>
              <br></br>

              <label className="radio">
                <input
                  type="radio"
                  value="GRE"
                  checked={props.examOpt === "GRE"}
                  name="exam"
                  onChange={props.onChange}
                />
                GRE
              </label>
            </div>
            <div className="radio"></div>
          </reac.Col>
          <reac.Col></reac.Col>
        </reac.Row>
        <reac.Row>
          <reac.Col></reac.Col>
          <reac.Col>
            <ApplyGAT
              examOpt={props.examOpt}
              applicationNo={props.applicationNo}
              handleDropdownChange={props.handleDropdownChange}
              handleSubmit={props.handleSubmit}
            />
            <ApplyGRE
              applicationNo={props.applicationNo}
              examOpt={props.examOpt}
              quantVerbal={props.quantVerbal}
              quantVerbalError={props.quantVerbalError}
              analytical={props.analytical}
              analyticalError={props.analyticalError}
              handleChange={props.handleChange}
              handleSubmit={props.handleSubmit}
            />
          </reac.Col>
          <reac.Col></reac.Col>
        </reac.Row>
      </reac.Container>
     
    );
  } else if (props.isValidDate && props.applied) {
    return (
      <div className="main-content">Dear Applicant you applied for GAT</div>
    );
  } else {
    console.log("else");
    return (
      <reac.Container className="main-content">
        <div>
          <h5>You cannot apply now. Last date for GAT exam is MAY 25, 2020</h5>
        </div>
      </reac.Container>
    );
  }
};

const options = [
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Kakinada", label: "Kakinada" },
  { value: "Home", label: "Home" },
];
const ApplyGAT = (props) => {
  if (props.examOpt === "GAT") {
    return (
      <reac.Form onSubmit={props.handleSubmit}>
        <br></br>
        <p style={{ color: "red" }} id="alerts"></p>
        <reac.Form.Group className="formBasicUsername">
          <reac.Form.Label>Application Number*</reac.Form.Label>
          <reac.Form.Control
            type="text"
            name="name"
            className="form-control"
            readOnly
            value={props.applicationNo}
          />
        </reac.Form.Group>
        <reac.Form.Group>
          <label>Test Centre*</label>
          <div>
            <div>
              <div>
                <Select
                  options={options}
                  onChange={props.handleDropdownChange}
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
    );
  } else {
    return <div></div>;
  }
};
const ApplyGRE = (props) => {
  if (props.examOpt === "GRE") {
    return (
      <reac.Form onSubmit={props.handleSubmit}>
        <br></br>
        <p style={{ color: "red" }} id="alerts"></p>
        <reac.Form.Group className="formBasicUsername">
          <reac.Form.Label>Application Number</reac.Form.Label>
          <reac.Form.Control type="text" readOnly value={props.applicationNo} />
        </reac.Form.Group>
        <reac.Form.Group controlId="formBasicEmail">
          <reac.Form.Label>Quant + Verbal</reac.Form.Label>
          <reac.Form.Control
            type="number"
            pattern="[0-9]*"
            inputmode="numeric"
            name="quantVerbal"
            placeholder="more than 301"
            required={true}
            value={props.quantVerbal}
            onChange={props.handleChange}
          />
          {props.quantVerbalError ? (
            <span style={{ color: "red", fontSize: 12 }}>
              You should have between 301-340
            </span>
          ) : (
            ""
          )}
        </reac.Form.Group>
        <reac.Form.Group controlId="formBasicEmail">
          <reac.Form.Label>Analytical</reac.Form.Label>
          <reac.Form.Control
            type="number"
            pattern="[0-9]*"
            inputmode="numeric"
            name="analytical"
            placeholder="more than 3.5"
            required={true}
            value={props.analytical}
            onChange={props.handleChange}
          />
          {props.analyticalError ? (
            <span style={{ color: "red", fontSize: 12 }}>
              You should have between 3.5 - 6.0
            </span>
          ) : (
            ""
          )}
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
    );
  } else {
    return <div></div>;
  }
};

const AppliedApp = (props) => {
  let applicationNo = props.applicationNo;
  let testCenter = props.testCenter;
  let paymentStatus = props.paymentStatus;
  let appType = props.appType;
  let button = <reac.Button onClick={props.editApplication}></reac.Button>;
  if (props.applied && props.payment != "paid") {
    button = (
      <reac.Button onClick={props.editApplication}>
        CLICK HERE TO EDIT YOUR APPLICATION
      </reac.Button>
    );
  }
  if (!props.applied) {
    applicationNo = "";
    testCenter = "";
    paymentStatus = "";
    appType = "";
  }

  return (
    <div className="table">
      <h5 style={{ textAlign: "center" }}>Your Gat Application Details</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Application Number</th>
            <th>Test Center</th>
            <th>Payment Details</th>
            <th>Exam Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{applicationNo}</td>
            <td>{testCenter}</td>
            <td>{paymentStatus}</td>
            <td>{appType}</td>
          </tr>
          <tr>
            <td className="editButton" colSpan="4">
              {button}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
