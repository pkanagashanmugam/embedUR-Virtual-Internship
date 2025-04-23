import './App.css';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
function App() {
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