import './App.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  // Function used to communicate with server in order to retrieve Server's Public Key and stores it as a local variable which is used in other pages
  useEffect(() => {
    const fetchPublicKey = async() =>{
      try{
        const res = await axios.get("http://localhost:4500/get_public_key",{responseType:"text"});
        localStorage.setItem("serverPublicKey",res.data);
      }catch(err){
        console.log("Error retrieving Server's Public Key",err);
      }
    };
    if (localStorage.getItem("serverPublicKey") == null){ // !!localStorage.getItem("serverPublicKey");
      fetchPublicKey();
    }else{
      console.log("Server Key Exists");
    }
  },[]);

  const navigate=useNavigate();
  return (
    <div>
      <Header />
      <div style={{ padding: '100px',textAlign: 'center'}}>
          <div style={{padding: '50px'}}>
            <h2>Welcome to Meraki Dashboard</h2>
            <button type="button" className='btn btn-primary m-3' onClick={() => navigate("/login")}>Login</button>
            <button type="button" className='btn btn-success m-3' onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
      </div>
    </div>
  );
}

export default App;


// console.log("Public key from server : ",res);
// console.log("Successfully retrieved Server's Public Key");
// const res = await axios.get("http://backend:4500/get_public_key",{responseType:"text"});
// const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_public_key`,{responseType:"text"});