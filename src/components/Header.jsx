import React from "react";
import { FaUserCircle } from "react-icons/fa";//pour un icon de user

const Header = () => {
    return (
        <header className="header">
            <img src="/logo.png" alt="Montréal Logo" className="logo" />
            <a href="#" className="account-link">
                <FaUserCircle className="account-icon" /> Mon compte
            </a>
        </header>
    );
};

export default Header;