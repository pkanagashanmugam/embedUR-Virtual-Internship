import React from "react";
import Header from "../components/header";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup(){
    const navigate=useNavigate();
    const handleSubmission = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
    
        try {
          const response = await axios.post('http://localhost:4567/signup', { email:email, password: pass });
          if (response.data.code == 200) {
            alert("Registration Successful");
            navigate("/login");
        }
        else{
            alert("User Already Exists.. Try Logging in!");
          }
        } catch (err) {
          console.error(err);
        }
      };
    return (
        <div>
            <Header />
            <div style={{ backgroundColor: " rgb(247, 248, 247)", height: "100vh" }} className="d-flex justify-content-center align-items-center">
                <div className="bg-light p-5 rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
                    <center><h2 style={{color: "rgb(31, 160, 246)"}}>SIGN UP</h2></center><br/><br/>
                    <form onSubmit={handleSubmission}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Enter Your Email Id:</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter your Email Id" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Enter Your Password:</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your Password" required />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    </div>
                    </form>
                    <br />
                    <br />
                    <center><Link to="/login">Already have an Account?</Link></center>
                </div>
            </div>
        </div>
    );
}

export default Signup;