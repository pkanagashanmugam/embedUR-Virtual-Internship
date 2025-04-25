
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import axios from "axios";
import JSEncrypt from "jsencrypt";

function Login(){
    const public_key=localStorage.getItem("serverPublicKey");
    const encrypt=new JSEncrypt();
    encrypt.setPublicKey(public_key);
    console.log("Public Key of Server : ",public_key);

    const navigate=useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=encrypt.encrypt(e.target.password.value);

        try{
            const res=await axios.post("http://localhost:4500/login",{email:email,password:password})
            // const res=await axios.post("http://backend:4500/login",{email:email,password:password})
            // const res=await axios.post(`${process.env.REACT_APP_API_URL}/get_public_key`,{email:email,password:password})
            console.log("Login Response from server",res);
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