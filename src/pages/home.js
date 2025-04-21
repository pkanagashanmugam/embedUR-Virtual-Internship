import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div>
    <Header />
      <div style={{ padding: '50px', textAlign: 'center', alignContent:'center' }}>
        <h2>Welcome to the Dashboard</h2>
        <button
          className="btn btn-primary m-3"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="btn btn-success m-3"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
//       <h1 className="mb-4">Welcome to Our App</h1>
//       <button className="btn btn-primary mb-3" onClick={() => navigate("/login")}>
//         Login
//       </button>
//       <button className="btn btn-success" onClick={() => navigate("/signup")}>
//         Sign Up
//       </button>
//     </div>
//   );
// }

// export default Home;

// src/components/home.jsx