import Header from "../components/header";

function About(){
    return(
        <div>
            <Header />
            <div className="content" style={{margin:'50px',height:'500px',display:'flex'}}>
                <div className="picture" style={{width:'50%',height:'100%',padding:'20px'}}>
                    <img src="/Cisco-Meraki-devices-cover-1200.jpg" alt="Cisco Meraki Devices" style={{ width: '100%'}} />
                </div>
                <div className="text" style={{width:'50%',height:'100%',fontSize:'17px',padding:'15px',lineHeight:'2'}}>
                    <h2>About Us</h2>
                    <p style={{textAlign:'justify'}}>
                        The Meraki cloud solution is a centralized management service that allows users to manage all of their Meraki network devices via a single, simple and secure platform.
                        With intuitive technologies, we optimize IT experiences, secure locations, and seamlessly connect people, places, and things.
                        Having over 16.6 Million active meraki devices, catering over 8 Lakh customers, we make IT easier, faster and smarter for our customers.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;