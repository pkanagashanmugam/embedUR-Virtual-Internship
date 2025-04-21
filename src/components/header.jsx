import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-success border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-light">Meraki</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link text-light">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link text-light">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link text-light">About Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
