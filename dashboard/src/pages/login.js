
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import axios from "axios";

function Login(){
    const navigate=useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        try{
            const res=await axios.post("http://localhost:4500/login",{email:email,password:password})
            alert(res.data.message);
            if(res.data.code === 200){
                //Encryption
                navigate("/landing",{state:{user_id:res.data.user_id}});
                localStorage.setItem("user_id", res.data.user_id);
            }
        }catch (err){
            console.log(err);
        }
    };
    return(
        <div>
            <Header />
            <div style={{height: '500px',width: '300px',marginTop: '50px',marginLeft: '600px',alignItems:'center',alignContent: 'center'}}>
                <center><h2 className="text-primary">LOGIN</h2></center><br />
                <form onSubmit={handleSubmit}> 
                    <div className="form-group">
                        <label>Enter your Email</label><br/> <br/>
                        <input type="email" className="form-control" name="email" placeholder="Enter your Email" required/> <br/> 
                        <label>Enter your Password</label><br/> <br/>
                        <input type="password" className="form-control" name="password" placeholder="Enter your Password" required/><br />
                        <center><button type="submit" className="btn btn-primary">Log in</button></center>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;