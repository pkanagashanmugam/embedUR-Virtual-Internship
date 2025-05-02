import Header from "../components/header";
import { Apcard } from "../components/apcard";
import { useState,useEffect,useCallback } from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";

function Landing(){
    const [devices,setDevices]=useState([]);

    // Variable used to identify currently logged user by using user_id
    // const location=useLocation();
    // const user_id=location.state?.user_id;    
    
    const user_id=localStorage.getItem("user_id");

    // Function that uses API call to retrieve devices of current user 
    const fetchDevices = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4500/device/${user_id}`);
            // console.log("RESPONSE FROM DB :", response.data);
            setDevices(response.data);
        } catch (err) {
            console.log(err);
        }
    }, [user_id]);

    useEffect(() => {
        fetchDevices();
    }, [fetchDevices]);

    // Function that handles device submission  
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const header=e.target.header.value;
        const count=e.target.count.value;
        const health=e.target.health.value;
        try{
            await axios.post("http://localhost:4500/device",{user_id:user_id,header:header,count:count,health:health})
            fetchDevices();
        }catch (err){
            console.log(err);
        }
    };

    // Function that handles Device Update
    const handleUpdate = async(parameter) =>{
        const header=parameter.header;
        const oldcount=parameter.count;
        const count=prompt("Enter New Count:");
        const health=prompt("Enter New Health");
        try{
            await axios.put(`http://localhost:4500/device/${user_id}`,{header:header,oldcount:oldcount,count:count,health:health})
            fetchDevices();
        }catch (err){
            console.log(err);
        }
    };
    
    // Function that handles Device Deletion
    const handleDelete = async(parameter) =>{
        const header=parameter.header;
        const count=parameter.count;
        const health=parameter.health;
        try{
            await axios.delete(`http://localhost:4500/device/${user_id}`,{data:{header:header,count:count,health:health}})
            fetchDevices();
        }catch (err){
            console.log(err);
        }
    };

    return(
        <div>
            <Header />
            <br />
            <h2 style={{marginLeft: '50px'}}>Device Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="row" style={{marginLeft: '50px',marginTop:'10px'}}> 
                    <div className="col-3"><input className="form-control mb-3" name="header" placeholder="Enter Device Header" style={{marginTop:'10px'}} required/></div>
                    <div className="col-3"><input className="form-control mb-3" name="count" placeholder="Enter Device Count" style={{marginTop:'10px'}} required/></div>
                    <div className="col-3"><input className="form-control mb-3" name="health" placeholder="Enter Device Health" style={{marginTop:'10px'}} required/></div>
                    <div className="col-3"><input type="submit" className="btn btn-primary" style={{marginTop:'10px'}} /></div>
                </div>
            </form>
            <br />
            <h2 style={{marginLeft: '50px'}}>Device Status</h2>
            <br />
            <br />
            <div className="flex-container" style={{marginLeft: '100px',gap:'20px 40px',width: '1400px',display:'flex',flexWrap:'wrap'}}>
                {devices.map((item,index) =>{
                    const type=item.health === "Healthy"?"success":item.health === "Poor"?"danger":"info";
                    return (<Apcard
                        type={type}
                        key={index}
                        header={item.header}
                        count={item.count}
                        health={item.health}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        />)
                    })}
            </div>
        </div>
    );
}

export default Landing;

// const fetchDevices = async() => {
//     try{
    //         const response=await axios.get(`http://localhost:4500/device/${user_id}`);
    //         console.log("RESPONSE FROM DB :",response.data);
    //         setDevices(response.data);
    //     }catch(err){
        //         console.log(err);
//     }
// };
// useEffect(()=>{fetchDevices()},[]);