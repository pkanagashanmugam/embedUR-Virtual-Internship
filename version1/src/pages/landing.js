import Apcard from "../components/apcard";
import React, { useState, useEffect } from "react";
import Header from "../components/header";
import axios from "axios";

function Landing() {
    const [devices, setDevices] = useState([]);

    const fetchDevices = async () => {
        try {
          const response = await axios.get('http://localhost:4568/devicedet');
          setDevices(response.data);
        } catch (err) {
          console.error("Error fetching devices:", err);
        }
      };
    
    const handleUpdate = async(parameter)=>{
        const newCount = prompt("Enter new count : ");
        const newHealth = prompt("Enter new health : ");

        if (newCount || newHealth){
            try {
                const response = await axios.put(`http://localhost:4568/devicedet/${parameter}`, { count: newCount, health: newHealth });
                fetchDevices();
            } catch (err) {
                console.error(err);
            }
        }

    }

    const handleDelete = async(parameter)=>{
        try {
            const response = await axios.delete(`http://localhost:4568/devicedet/${parameter}`);
            fetchDevices();
        } catch (err) {
            console.error(err);
        }
    }
    
    const handleSubmission = async(e) =>{
        e.preventDefault();
        const parameter = e.target.dev_par.value;
        const count = e.target.dev_count.value;
        const health = e.target.dev_health.value;
       
        try {
            const response = await axios.post('http://localhost:4568/devicedet', { parameter:parameter, count: count, health:health });
            fetchDevices();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDevices();
      }, []);

    return (
        <div>
            <Header />
            <br />
            <h2 style={{marginLeft : '20px'}}>Device Health</h2>
            <br />
            <div style={styles.formcontainer}>
                <form onSubmit={handleSubmission}>
                    <div class="row">
                        <div className="col-3">
                            <input type="text" class="form-control" name="dev_par" placeholder="Device Parameter" required/>
                        </div>
                        <div class="col-3">
                            <input type="text" class="form-control" name="dev_count" placeholder="Count of Up Devices" required/>
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" name="dev_health" placeholder="Health of Running Devices" required/>
                        </div>
                        <div class="col-2">
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <br />
            <br />
            <h2 style={{marginLeft : '20px'}}>Device Status</h2>
            <div style={styles.container}>
                <br />
                <br />
                {devices.map((device,index) =>(             
                    <Apcard
                    key={index}
                    parameter={device.parameter}
                    count={device.count}
                    health={device.health}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
        </div>
    );
}

export default Landing;

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px',
        marginTop: '20px',
    },
    formcontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '20px',
        marginLeft : '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.29)',
        padding: '15px',
        flex: 1,
    },
};