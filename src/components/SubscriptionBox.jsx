import React, { useState } from "react";
import "../App.css";

const SubscriptionBox = () => {
    //Declaration de la variable pour afficher un toast quand quelqun clic sur "M'abonner"
    const [showToast, setShowToast] = useState(false);

    const handleSubscribeClick = (e) => {
        e.preventDefault();//empeche la redirection
        setShowToast(true);//affiche le toast
        setTimeout(() => {
            setShowToast(false);//affiche le toast pour 3 secondes
        }, 3000);
    };

    return (
        <div className="subscription-box">
            <h2>S'abonner aux alertes</h2>
            <p>Pour recevoir des avis et alertes par courriel ou texto, vous devez avoir créé un compte.</p>
            <a href="#" className="subscribe-link" onClick={handleSubscribeClick}>
                M'abonner →
            </a>


            {showToast && (
                <div className="toast">
                    L'option n'est pas encore disponible. {/*message du toast*/}
                </div>
            )}
        </div>
    );
};

export default SubscriptionBox;
