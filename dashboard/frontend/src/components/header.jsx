import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    
    // Sets a local variable which identifies whether a user is logged in. This is useful to display the 'Log out' button.
    const isLoggedIn = !!localStorage.getItem("user_id");
    
    const handleDevices = () =>{
        if (localStorage.getItem("user_id") === 3){
            navigate("/admin");
        }else{
            navigate("/landing");
        }
    }

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
                        <button onClick={() => {navigate("/about")}} className="btn btn-success ms-1">About Us</button>
                        {isLoggedIn && (
                            <button onClick={handleDevices} className="btn btn-success ms-1">Devices</button>
                        )
                        }
                    </div>
                    {isLoggedIn && (
                        <button onClick={handleLogOut} className="btn btn-success" style={{marginLeft:'1050px'}}>Log Out</button>
                    )
                    }
            </div>
        </nav>
    );
}

export default Header;