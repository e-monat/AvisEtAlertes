import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
    const { id } = useParams();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const storedAlerts = localStorage.getItem("alerts");
        if (storedAlerts) {
            const parsedAlerts = JSON.parse(storedAlerts);
            const foundAlert = parsedAlerts.find(alert => alert.id === id);
            setAlert(foundAlert);
        }
    }, [id]);

    if (!alert) {
        return <h2>Alerte non trouvée</h2>;
    }

    return (
        <div className="detail">
            <h1>{alert.title}</h1>
            <p><strong>Arrondissement:</strong> {alert.arrondissement}</p>
            <p><strong>Date:</strong> {alert.date}</p>
            <p><strong>Sujet:</strong> {alert.category}</p>
        </div>
    );
};

export default Detail;
