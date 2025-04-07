import React from "react";
import { Link } from "react-router-dom";

const AlertItem = ({ alert }) => {
    return (
        <div className="alert-item">
            <h2>{alert.title}</h2>
            <p>{alert.arrondissement} - {alert.date}</p>
            <Link to={`/alert/${alert.id}`}>Voir plus</Link>
        </div>
    );
};

export default AlertItem;