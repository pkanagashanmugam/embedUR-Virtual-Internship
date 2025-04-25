import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    // Sets a local variable which identifies whether a user is logged in. This is useful to display the 'Log out' button.
    const isLoggedIn = !!localStorage.getItem("user_id");

    const handleLogOut = async() =>{
        try{
            // API to handle logout when user clicks log out button
            const response=await axios.delete(`http://localhost:4500/logout/${localStorage.getItem("user_id")}`);
            console.log(response);
            if (response.status === 200){
                alert("Successfully Logged Out");
                localStorage.removeItem("user_id");
                navigate("/");
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <nav className="navbar bg-success">
            <div className="d-flex align-items-center" style={{paddingLeft: '15px'}}>
                    <Link to="/" className="navbar-brand text-light" style={{fontSize:'2rem',fontStyle:'italic',fontWeight:'bold',fontFamily:'serif'}}>Cisco Meraki</Link>
                    <div>
                        <button onClick={() => {navigate("/")}} className="btn btn-success ms-1">About Us</button>
                        <button onClick={() => {navigate("/")}} className="btn btn-success ms-1">Our Team</button>
                    {isLoggedIn && (
                        <button onClick={handleLogOut} className="btn btn-success ms-3" style={{position:''}}>Log Out</button>
                    )
                    }
                </div>
            </div>
        </nav>
    );
}

export default Header;