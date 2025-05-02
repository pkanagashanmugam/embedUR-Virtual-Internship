import Header from '../components/header';
import { useState,useEffect,useCallback } from "react";
import axios from 'axios';

function Admin(){
    const user_id=localStorage.getItem("user_id");
    const [devices,setDevices]=useState([]);
    const [searchQuery,setSearchQuery]=useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const fetchDevices = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4500/device/${user_id}`);
            setDevices(response.data);
        } catch (err) {
            console.log(err);
        }
    }, [user_id]);

    useEffect(() => {
        fetchDevices();
    }, [fetchDevices]);

    console.log("Unfiltered Devices",devices);
    
    const searchedDevices= devices.filter(device=>
        device.header.toLowerCase().includes(searchQuery.toLowerCase())||
        device.health.toLowerCase().includes(searchQuery.toLowerCase())||
        device.user_id.toString().includes(searchQuery)
    );

    console.log("Filtered Devices",searchedDevices);
    
    // Sorting function
    const sortedDevices = [...searchedDevices].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key]?.toString().toLowerCase();
        const bVal = b[sortConfig.key]?.toString().toLowerCase();
        
        if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
    });

    console.log("Sorted Filtered Devices",sortedDevices);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getArrow = (key) => {
        if (sortConfig.key !== key) return '  ↑↓ ';
        return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
    };

    return(
        <div>
            <Header />
            <div style={{width:'1000px',padding:'50px'}}>
                <h2 style={{fontFamily:'initial',fontStyle:'oblique'}}>Client Devices</h2>
                <div>
                    <div style={{height:'40px',display:'inline-flex',gap:'10px',margin:'5px'}}>
                        <input type="text" placeholder="Search Dashboard" className="form-control" value={searchQuery}
                        onChange={(e) => {setSearchQuery(e.target.value);}}  
                        />
                    </div>
                    <br />
                    <table className="table table-hover">
                        <thead className="thead-dark"> 
                            <tr>
                                <th scope="col" onClick={() => handleSort('user_id')} style={{ cursor: 'pointer' }}>
                                    User Id{getArrow('user_id')}
                                </th>
                                <th scope="col" onClick={() => handleSort('header')} style={{ cursor: 'pointer' }}>
                                    Device Name{getArrow('header')}
                                </th>
                                <th scope="col" onClick={() => handleSort('health')} style={{ cursor: 'pointer' }}>
                                    Health{getArrow('health')}
                                </th>
                                <th scope="col" style={{ cursor: 'default' }}>
                                    Count
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedDevices.map((item,index) =>(
                                <tr key={index}>
                                    <td>{item.user_id}</td>
                                    <td>{item.header}</td>
                                    <td>{item.health}</td>
                                    <td>{item.count}</td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;