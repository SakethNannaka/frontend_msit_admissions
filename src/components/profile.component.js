
import React, { Component } from "react";
import axios from "axios";
import Navbar from "./navbar1.component";
import "./profile.css"

import { Button,Spinner, Alert } from 'react-bootstrap';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns"; // import
import { CountryDropdown} from 'react-country-region-selector';
import { Link } from 'react-router-dom'

import Edit from "./editprofile.component"



function Session(props){
  console.log("status",props.this.status)
  if(props.status==="True"){


    console.log("User profile")
    const userDetails = props.this.state;
     var url = "https://admissionsimagebucket.s3.ap-south-1.amazonaws.com/"+localStorage.getItem("email")+".jpeg?random="+new Date().getTime()
    
    
    // Sample usage
      
    return (
      <div>

        

        <div className="container" width="1200px">
          <div className="view-account">
            <section className="module">
              <div className="module-inner">
                <div className="side-bar">
  
                  <div className="user-info">
  
                    <img
                      className="img-profile img-circle img-responsive center-block"
                      id = "pp"
                      src={url}
                      alt=""
                    ></img>
                    <ul className="meta list list-unstyled">
                      <li className="name">
                        <h4>{userDetails.full_name}</h4>
                      </li>
                      <li className="email">
                        <a href >{userDetails.email}</a>
                      </li>
                      {/* <label className="label label-info">Applicant</label> */}

                    </ul>
                  </div>
                  <nav className="side-menu">
                    <ul className="nav">
                    <li className="active">
                      <Link className="nav-link" to={"/profile"}>
                          <span className="fa fa-user"></span> Profile
                          </Link>
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
                      <li>
                          <a href onClick={props.this.handleEditProfile}>
                          <span className="fa fa-cog"></span> Edit Profile
                          </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="content-panel">
                  <h2 className="title">
                    {/* Profile */}
                    <span className="pro-label label label-warning">Profile View</span>

                  </h2>

            <br></br>    
      
            <div class="container2">
  <div class="row">

       <div class="col-md-7 ">

<div class="panel panel-default">
  <div class="panel-heading">  <h4 >User Profile</h4></div>
   <div class="panel-body">
       
    <div class="box box-info">
        
            <div class="box-body">
                     <div class="col-sm-6">
              <br></br>
    
            </div>
            <div class="col-sm-6">
              <span><p>Aspirant</p></span>            
            </div>
            <div class="clearfix"></div>
    
              
<div class="col-sm-5 col-xs-6 tital " >Full Name:</div><div class="col-sm-7 col-xs-6 ">{userDetails.full_name}</div>
     <div class="clearfix"></div>
<div class="bot-border"></div>

<div class="col-sm-5 col-xs-6 tital " >Parent Name:</div><div class="col-sm-7">{userDetails.parent_name}</div>
  <div class="clearfix"></div>
<div class="bot-border"></div>

<div class="col-sm-5 col-xs-6 tital " >Date Of Birth:</div><div class="col-sm-7"> {userDetails.date_of_birth}</div>
  <div class="clearfix"></div>
<div class="bot-border"></div>

<div class="col-sm-5 col-xs-6 tital " >Gender</div><div class="col-sm-7">{userDetails.gender}</div>

  <div class="clearfix"></div>
<div class="bot-border"></div>

<div class="col-sm-5 col-xs-6 tital " >Mobile Number:</div><div class="col-sm-7">{userDetails.mobile_no}</div>

  <div class="clearfix"></div>
<div class="bot-border"></div>

<div class="col-sm-5 col-xs-6 tital " >City:</div><div class="col-sm-7">{userDetails.city}</div>

 <div class="clearfix"></div>
<div class="bot-border"></div>

<div class="col-sm-5 col-xs-6 tital " >Nationality:</div><div class="col-sm-7">{userDetails.nationality}</div>

 <div class="clearfix"></div>
<div class="bot-border"></div>

<div class="col-sm-5 col-xs-6 tital " >Pincode:</div><div class="col-sm-7">{userDetails.pincode}</div>

<div class="clearfix"></div>
<div class="bot-border"></div>

<div class="col-sm-5 col-xs-6 tital " >Address:</div><div class="col-sm-7">{userDetails.address_line1}</div>




          </div>

        </div>
       
            
    </div> 
    </div>
</div>  

       
       
       
       
       
       
       
   </div>
</div>

                  </div>

              </div>
            </section>
<p align = "center">MSIT Admissions @2020</p>

          </div>
        </div>
      

            
       </div>
       );
  }else if(props.status==="False"){

    console.log("No user profile")
    return (
  <Edit prop={props.this} stat = {false}/>
    );
  }
  else if(props.status==="Edit"){
    return(
      <Edit prop={props.this} stat = {true}/>
    );
  }
  else{
    console.log("Waiting for did mount")
    return (
      <div>

<br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    &nbsp;  &nbsp;  
    Loading...
  </Button>
</div>
            );
  }

};


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      parent_name: "",
      gender: "",
      address_line1: "",
      address_line2: "",
      city: "",
      place_town: "",
      pincode: "",
      mobile_no: "",
      landline_no: "",
      board_name: "",
      board_number: "",
      btech: "",
      profile_pic:"",
      profile_pic_upload:"",
      email:localStorage.getItem("email"),
      date_of_birth:new Date(),
      parent_relation:"",
      nationality:"India",
      photo_status:1,
      status:null,
      image_url: "https://admissionsimagebucket.s3.ap-south-1.amazonaws.com/"+localStorage.getItem("email")+".jpeg?random="+new Date().getTime()
    };

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Binding 'this' to Event Handlers %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.changeBoard = this.changeBoard.bind(this);
    this.changeBtech = this.changeBtech.bind(this);
    this.onUploadFile = this.onUploadFile.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.changeParentRelation =this.changeParentRelation.bind(this);
    this.changeNationality = this.changeNationality.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.handleEditProfile =this.handleEditProfile.bind(this);
    this.handleProfile =this.handleProfile.bind(this);

  }
  // onChange = e => console.log("hai")


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };


  onChangeNumber = (e) => {
    if (e.target.name === "mobile_no" || e.target.name === "landline_no") {
      document.getElementById("alerts1").innerHTML = "Mobile number should be 10 digits"
      if(e.target.value.length >= 10) {
        document.getElementById("alerts1").innerHTML = ""
        e.target.value=e.target.value.slice(0,10)
      }
    }
    
    if (e.target.name === "pincode") {
      document.getElementById("alerts2").innerHTML = "pincode should be 6 digits"
      if(e.target.value.length > 6) {
        document.getElementById("alerts2").innerHTML = ""
        e.target.value=e.target.value.slice(0, 6)
      }
    }
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.mobile_no.length < 10 || this.state.landline_no.length < 10) {
        // alert("Mobile number should be atleast 10 digits")
        // document.getElementById("alerts1").innerHTML = "Mobile number should be atleast 10 digits"
        document.getElementById("alerts1").innerHTML = "Mobile number should be 10 digits"
        return
    }

    if (this.state.pincode.length < 6) {
      // alert("pincode should be atleast 6 digits")
      document.getElementById("alerts2").innerHTML = "pincode should be 6 digits"
      return
    }
    // this.setState({photo_status:true,educationdetails_status:true,status:true})
    this.setState({"email":localStorage.getItem("email")});
    console.log(this.state.email)
    console.log("********")
    console.log("submitted data",this.state)
    localStorage.setItem("state",JSON.stringify(this.state));
    const postData = this.state;
    axios.post(`https://flask-deploy-admissions.herokuapp.com/profile`, { postData })
      .then(res => {
        console.log(res.data);
        alert(res.data.success)
        window.location = "/profile";
        // this.setState({status:"True"})
      })
    console.log("********")

  };
  changeGender = (e) => {  
    console.log("**********************")
    console.log("Gender",e.target.value,"Selected")
    this.setState({  
            gender: e.target.value  
    })  ;
    console.log("after change....................")
    console.log(this.state);
    console.log("**********************")

}  
changeBoard = (e) => {  
  console.log("**********************")
  console.log("Change Board Clicked")
  this.setState({  
    board_name: e.target.value  
  })  ;
  console.log(e.target.value)
  console.log(this.state)
  console.log("**********************")

}  
changeBtech = (e) => {  
  console.log("**********************")
  console.log("Change Btech Clicked")
  this.setState({  
          btech: e.target.value  
  })  ;
  console.log(e.target.value)
  console.log(this.state)
  console.log("**********************")

}

onUploadFile(e) {
  console.log("**********************")
  console.log("on Upload File Clicked")
  this.setState ( {
      profile_pic_upload: e.target.files[0]
  })

  const preview = document.getElementById('pp1');   // getting elementid of image preview 
  const file = e.target.files[0]; 

  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result; // update new src for new image url
  }, false);

  if (file) {
    reader.readAsDataURL(file); // create URL for image 
  }

}  
  handleUpload(){
    // e.preventDefault();
  console.log("**********************")

    console.log("handle upload");
    console.log(this.state.profile_pic_upload);

        if (this.state.profile_pic_upload.type !== "image/jpeg" ) {
          // return alert("JPEG or JPG images only")
          return document.getElementById("alerts3").innerHTML = "JPEG or JPG images only"
      } else if (this.state.profile_pic_upload.size > 2000000) {
        // return alert("2mb")
        return document.getElementById("alerts3").innerHTML = "Image size should be lessthan 2mb"
      } else {
      document.getElementById("alerts3").innerHTML = ""


    const formdata = new FormData()

            formdata.append('file',this.state.profile_pic_upload, (this.state.email + '.jpeg'))

            let url = 'https://flask-deploy-admissions.herokuapp.com/image';

            axios.post(url, formdata, {
                headers: {
                  'content-type': 'multipart/form-data'
                }
              })
                  .then(res => {
                    console.log(res.data);
  document.getElementById('pp').src = "https://admissionsimagebucket.s3.ap-south-1.amazonaws.com/"+this.state.email+".jpeg?random="+new Date().getTime();
                    
                  })
                  .catch(err => console.log(err))

  console.log("**********************")    
                }
}


handleDateChange = (date_of_birth) =>{
console.log("handle date change")
console.log(date_of_birth)
console.log(this.state.date_of_birth)
console.log(this.state)
this.setState({date_of_birth:date_of_birth})
}
changeParentRelation = (e) => {  
  console.log("**********************")
  console.log("Change Relation Clicked")
  this.setState({  
          parent_relation: e.target.value  
  })  ;
  console.log(e.target.value)
  console.log(this.state)
  console.log("**********************")

}  

changeNationality = (e) => {  
  console.log("**********************")
  console.log("Change Nationality Clicked")
  this.setState({  
          nationality: e
  })  ;
  console.log(this.state)
  console.log("**********************")
}

handleEditProfile(){
  console.log("Edit Profile clicked");
  this.setState({status:"Edit"})
}
handleProfile(){
  console.log(" Profile clicked");
  this.setState({status:"True"})
}

componentDidMount(){
  setTimeout(() => {
  const email={"email":localStorage.getItem("email")}
  axios.post("https://flask-deploy-admissions.herokuapp.com/getProfile",email)
  .then(res => {
  console.log("DID MOUNT","res.data",res.data,"state",this.state.status);
  if(res.data.message==="False"){
    localStorage.setItem("state",JSON.stringify(this.state));
    this.setState({status:res.data.message})
    console.log("DID MOUNT","res.data",res.data,"state",this.state.status);
  }
  else if(res.data.message==="True"){
    console.log("DID MOUNT","res.data",res.data,"state",this.state.status);
    localStorage.setItem("state",JSON.stringify(res.data.response));
    console.log(res.data.response)
    this.setState({ status:res.data.message,address_line1:res.data.response.address_line1,
    address_line2:res.data.response.address_line2,
    board_name:res.data.response.board_name,
    board_number:res.data.response.board_number,
    btech:res.data.response.btech,
    city:res.data.response.city,
    date_of_birth:res.data.response.date_of_birth,
    email:res.data.response.email,
    full_name:res.data.response.full_name,
    gender:res.data.response.gender,
    landline_no:res.data.response.landline_no,
    mobile_no:res.data.response.mobile_no,
    nationality:res.data.response.nationality,
    parent_name:res.data.response.parent_name,
    parent_relation:res.data.response.parent_relation,
    photo_status:res.data.response.photo_status,
    pincode:res.data.response.pincode,
    place_town:res.data.response.place_town,
    })
  }
  })
  }, 0);
  
}

  render() {
    console.log(this.state.status)
    return (
      <div>
        <Navbar/>
        <br></br>
        <br></br>
        <Session
          status={this.state.status}
          this={this}
        />
      </div>
    );
  }
}
export default Profile;