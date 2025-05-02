import { Link } from "react-router-dom";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JSEncrypt from "jsencrypt";

function Signup(){
    const public_key=localStorage.getItem("serverPublicKey");
    const encrypt=new JSEncrypt();
    encrypt.setPublicKey(public_key);
    console.log("Public key",public_key);
    const navigate=useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=encrypt.encrypt(e.target.password.value);
        console.log("Form Password : ",e.target.password.value);
        console.log("Encrpyted Password : ",password);
        try{
            const res=await axios.post("http://localhost:4500/signup",{email:email,password:password})
            alert(res.data.message);
            if(res.data.code === 200){
                navigate("/login");
            }
        }catch (err){
            console.log(err);
        }
    };
    return(
        <div>
            <Header />
            <div style={{height: '500px',width: '300px',marginTop: '50px',marginLeft: '600px',alignContent: 'center'}}>
                <center><h2 className="text-primary">SIGN UP</h2></center><br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Enter your Email</label><br/> <br/>
                        <input type="email" className="form-control" name="email" placeholder="Enter your Email" required/> <br/> 
                        <label>Enter your Password</label><br/> <br/>
                        <input type="password" className="form-control" name="password" placeholder="Enter your Password" required/><br />
                        <center><button type="submit" className="btn btn-primary">Sign Up</button></center><br />
                        <center><Link to="/login">Already have an Account?</Link></center>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;