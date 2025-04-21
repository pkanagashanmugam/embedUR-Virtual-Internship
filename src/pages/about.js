import Header from "../components/header";

function About(){
    return(
        <div style={{alignContent:'center'}}>
            <Header />
            <section class="py-5">
                <div class="container">
                    <br />
                    <br />
                    <br />
                    <div class="row">
                        <div class="col-md-5">
                            <h2 class="display-5 fw-bold" className="text-success">About Us</h2>
                            <p class="lead" className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                        </div>
                        <div class="col-md-6 offset-md-1" style={{textAlign:'justify'}}>
                            <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                            <p class="lead">Ullamco laboris nisi ut a Lorem ipsum dolor sit amet,consectetur adipiscing eli ncididunt ullamco laboris nisi ut a Lorem ipsum dolor sit amet,consectetur adipiscing el Lorem ipsum dolor sit amet,consectetur adipiscing eli ncididunt ullamco laboris nisi ut a Lorem ipsum dolor sit amet,consectetur adipiscing el.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About;