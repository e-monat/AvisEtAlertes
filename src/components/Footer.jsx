import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <img src="src/assets/petitlogo.png" alt="Montréal Logo" className="footer-logo" />
            <ul className="arrondissement-list">
                <li>Ahuntsic-Cartierville</li>
                <li>Montréal-Nord</li>
                <li>Villeray–Saint-Michel–Parc-Extension</li>
                <li>Rosemont–La Petite-Patrie</li>
                <li>Plateau-Mont-Royal</li>
                <li>Ville-Marie</li>
            </ul>
        </footer>
    );
};

export default Footer;