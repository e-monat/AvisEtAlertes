import React, { useState } from "react";
import "../App.css";
import InstallPrompt from "./InstallPrompt.jsx";
import PushSubscriptionModal from "./PushSubscriptionModal.jsx";

const SubscriptionBox = () => {
    const [showModal, setShowModal] = useState(false); // pour afficher la modale

    const handleSubscribeClick = (e) => {
        e.preventDefault();
        setShowModal(true); // ouvre la modale
    };

    return (
        <div className="subscription-box">
            <h2>S'abonner aux alertes</h2>
            <p>Vous recevrez une notification push lorsqu'une nouvelle alerte sera publiée.</p>
            <a href="#" className="subscribe-link" onClick={handleSubscribeClick}>
                M'abonner →
            </a>

            {showModal && <PushSubscriptionModal onClose={() => setShowModal(false)} />}

            <InstallPrompt />
        </div>
    );
};

export default SubscriptionBox;

