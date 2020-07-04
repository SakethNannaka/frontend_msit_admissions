
import React, { Component } from "react";
import axios from "axios";
import Navbar from "./navbar1.component";
import "./profile.css"
import { Button, Alert} from 'react-bootstrap';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns"; // import
import { CountryDropdown} from 'react-country-region-selector';
import { Link } from 'react-router-dom'



const IsNone = (props) => {
  if (props.stat) {
    console.log("ttttttttttttttttttttttttttttttttttttttt")
    return (<nav className="side-menu">
    <ul className="nav">

      <li>
          <a href onClick={props.stat1.handleProfile}>
          <span className="fa fa-user"></span> Profile
          </a>
      </li>

      <li>
      <Link className="nav-link" to={"/gat"}>
          <span className="fa fa-th"></span> GAT
          </Link>
      </li>
      <li>
      <Link className="nav-link" to={"/gat"}>
          <span className="fa fa-clock-o"></span> Walkin                      
          </Link>
      </li>

      <li className="active">
      <a href onClick={props.stat1.handleEditProfile}>
          <span className="fa fa-cog"></span> Edit Profile
          </a>
      </li>
    </ul>
  </nav>);
  } else {
    console.log("fffffffffffffffffffffff")
    return (
      <nav className="side-menu">
                    <ul className="nav" >
                      <li className = "active">
                      <a href onClick={props.stat1.handleEditProfile}>
                          <span className="fa fa-cog"></span> Edit Profile
                          </a>
                      </li>
                    </ul>
                  </nav>
    )
  }
}

class Edit extends Component {
  constructor(props){
    super(props)

    this.state = { full_name:"" }
  }

    
  render() { 
    const userDetails=JSON.parse(localStorage.getItem("state"));
    console.log("stat" + typeof(this.props.stat))
    return ( 
      <div>
      <div>
        
        <div className="container" width="1250px">
          <div className="view-account">
            <section className="module">
              <div className="module-inner">
                <div className="side-bar">
  
                <div className="user-info">

                  <img
                    className="img-profile img-circle img-responsive center-block"
                    id = "pp"
                    src={userDetails.image_url}
                    alt=""
                  ></img>
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

                  <IsNone stat = {this.props.stat} stat1 = {this.props.prop} />
                  
                </div>
                <div className="content-panel">
                  <h2 className="title">
                    {/* Profile */}
                    <span className="pro-label label label-warning">Edit Profile</span>
                  </h2>
                  <form className="form-horizontal" onSubmit={this.props.prop.onSubmit}>
                    <fieldset className="fieldset">
                      <h3 className="fieldset-title">Personal Info</h3>

                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span id = "alerts3" style = {{color: "red", fontSize: "15px"}}></span>
                      <div className="form-group avatar">
                        <figure className="figure col-md-2 col-sm-3 col-xs-12">
                          <img
                            id = "pp1"
                            className="img-rounded img-responsive"
                            src=""
                            alt=""
                          ></img>
  
                        </figure>
                        <div className="form-inline col-md-10 col-sm-9 col-xs-12">
                        
                        {/* <ImageUploader
                              // withIcon={true}
                              buttonText='Choose images'
                              imgExtension={['.jpg', '.gif', '.png', '.gif']}
                              maxFileSize={5242880}
                              onChange={this.props.prop.handleUpload}
                          /> */}
                          <input
                            type="file"
                            className="file-uploader pull-left"
                            name="profile_pic_upload"
                            onChange={this.props.prop.onUploadFile}
                          ></input>
  
                          &nbsp;
                          &nbsp;  
                          <Button variant="primary" onClick={this.props.prop.handleUpload}>Update Image</Button>
  
                          {/* <button
                            type="submit"
                            className="btn btn-sm btn-primary-alt pull-left"
                            onSubmit={this.props.prop.handleUpload}
                          >
                            Update Image
                          </button> */}
                        </div>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span id = "alerts1" style = {{color: "red", fontSize: "15px"}}></span>
                      <br></br>
                      <br></br>
                      <div className="form-group">
                        <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                          Full Name
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Full Name"
                            name="full_name"
                            onChange={this.props.prop.onChange}
                            style={{ width: "250px" }}
                            maxLength="20"
                            minLength="3"
                            required
                            defaultValue={userDetails.full_name}
                          ></input>
                        </div>
                      </div>
  
  
                      <div className="form-group">
                        <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                          Parent Name
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Guardian Name"
                            name="parent_name"
                            maxLength="20"
                            style={{ width: "250px" }}
                            onChange={this.props.prop.onChange}
                            defaultValue={userDetails.parent_name}
                          ></input>
                        </div>
                      </div>
  
                      
                      <div className="form-group">
                        <label className="col-md-2  col-sm-3 col-xs-12 control-label">
                          Parent Relation
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
                          <select id="parent_relation" name="parent_relation"  onChange={this.props.prop.changeParentRelation}
                            defaultValue={userDetails.parent_relation}
                          >
                            <option value="father">Father</option>
                            <option value="mother">Mother</option>
                            <option value="brother">Brother</option>
                            <option value="other">Other</option>
                          </select>
                          &nbsp; &nbsp;
                        </div>
                      </div>
  
                      <div className="form-group">
                        <label className="col-md-2  col-sm-3 col-xs-12 control-label">
                          Nationality
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
  
                          <CountryDropdown
                            name="nationality"
                            id="nationality"
                            value={this.props.prop.state.nationality}
                            defaultValue={userDetails.nationality}
                            onChange={this.props.prop.changeNationality} />
                            </div>
  
                            </div>
                      <div className="form-group">
                        <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                          Gender
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                            name="gender"
                          >
                            Male
                          </label>
                          &nbsp;
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="gender1"
                            value="Male"
                            checked={this.props.prop.state.gender==="Male"}
                            onChange={this.props.prop.changeGender}
                          ></input>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Female &nbsp;
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="gender2"
                            value="Female"
                            checked={this.props.prop.state.gender==="Female"}
                            onChange={this.props.prop.changeGender}
                          ></input>
  
                        </div>
                      </div>
                      <div className="form-group">
                      <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                          Date of Birth
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DatePicker name="date_of_birth"
                               value={this.props.prop.state.date_of_birth}
                               selected={this.props.prop.state.date_of_birth}
                               onChange={this.props.prop.handleDateChange} />
                            </MuiPickersUtilsProvider>
                        </div>
                      </div>
  
                      <div className="form-group">
                        <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                          Contact
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Mobile No."
                            name="mobile_no"
                            style={{ width: "250px" }}
                            onChange={this.props.prop.onChangeNumber}
                            maxLength='10'
                            defaultValue={userDetails.mobile_no}
                            required
                          ></input>
                          &nbsp;
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Landline No or Alternative number"
                            name="landline_no"
                            style={{ width: "250px" }}
                            defaultValue={userDetails.landline_no}
                            onChange={this.props.prop.onChangeNumber}
                            required
                          ></input>
                        </div>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span id = "alerts2" style = {{color: "red", fontSize: "15px"}}></span>
                      <br></br>
                      <br></br>
                      <div className="form-group">
                        <label className="col-md-2 col-sm-3 col-xs-12 control-label">
                          Address
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address Lane 1"
                            name="address_line1"
                            required
                            maxLength="20"
                            onChange={this.props.prop.onChange}
                            defaultValue={userDetails.address_line1}
                          ></input>
                          <br></br>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address Lane 2"
                            name="address_line2"
                            maxLength="20"
                            onChange={this.props.prop.onChange}
                            defaultValue={userDetails.address_line2}
                            required
                          ></input>
                          <br></br>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="City"
                            name="city"
                            maxLength="15"
                            onChange={this.props.prop.onChange}
                            defaultValue={userDetails.city}
                            required
                          ></input>
                          <br></br>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Town"
                            name="place_town"
                            maxLength="15"
                            onChange={this.props.prop.onChange}
                            defaultValue={userDetails.place_town}
                            required
                          ></input>
                          <br></br>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Pincode"
                            name="pincode"
                            maxLength="10"
                            onChange={this.props.prop.onChangeNumber}
                            defaultValue={userDetails.pincode}
                            required
                          ></input>
                        </div>
                      </div>

                    </fieldset>
                    <fieldset className="fieldset">
                      <h3 className="fieldset-title">Educational Info</h3>
                      <div className="form-group">
                        <label className="col-md-2  col-sm-3 col-xs-12 control-label">
                          Class 10
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
                          <select id="board_name" name="board_name" value={this.props.prop.state.board_name} onChange={this.props.prop.changeBoard}>
                            <option >Select 10th Board</option>
                            <option value="ssc">SSC</option>
                            <option value="cbse">CBSE</option>
                            <option value="icse">ICSE</option>
                          </select>
                          &nbsp; &nbsp;
                          <input
                            type="number"
                            name="board_number"
                            placeholder="Hallticket"
                            maxlength="13"
                            onChange={this.props.prop.onChangeNumber}
                            defaultValue={userDetails.board_number}
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2  col-sm-3 col-xs-12 control-label">
                          B.Tech
                        </label>
                        <div className="col-md-10 col-sm-9 col-xs-12">
                          
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                          </label>
                          <select
                            id="btech2"
                            name="btech"
                            value={this.props.prop.btech}
                            onChange={this.props.prop.onChange}
                          >
                            <option>Select Btech Status</option>
                            <option value="2020">Final Year Pursuing</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                          </select>
                        </div>
                      </div>
                    </fieldset>
                    <hr></hr>
                    <div className="form-group">
                      <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                        <input
                          className="btn btn-primary"
                          type="submit"
                          value="Update Profile"
                        ></input>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      </div>
    );
      
  }
}
 
export default Edit;