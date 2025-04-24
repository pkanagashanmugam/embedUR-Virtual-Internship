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
        console.log("Public key from server : ",res);
        localStorage.setItem("serverPublicKey",res.data);
        console.log("Successfully retrieved Server's Public Key");
      }catch(err){
        console.log("Error retrieving Server's Public Key",err);
      }
    };
    fetchPublicKey();
  },[]);

  const navigate=useNavigate();
  return (
    <center>
      <Header />
      <div style={{ padding: '50px', textAlign: 'center', alignContent:'center' }}>
          <div style={{alignContent: 'center',padding: '50px'}}>
            <center><h2>Welcome to Meraki Dashboard</h2></center>
            <button type="button" className='btn btn-primary m-3' onClick={() => navigate("/login")}>Login</button>
            <button type="button" className='btn btn-success m-3' onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
      </div>
    </center>
  );
}

export default App;