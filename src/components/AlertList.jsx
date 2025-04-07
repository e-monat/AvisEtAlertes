import React from "react";
import { Link } from "react-router-dom"; //importer la navigation pour la page details
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"; //icones de calendrier et localisation

//composant pour afficher la liste d'alerte
const AlertList = ({ alerts }) => {
    return (
        <div className="alert-list">
            {alerts.map(alert => (
                <div key={alert.id} className="alert-item">
                    <h2>{alert.title}</h2>
                    <span className="alert-category">{alert.category}</span>
                    <p>
                        <FaMapMarkerAlt className="location-icon" /> {alert.arrondissement} - <FaCalendarAlt className="calendar-icon" /> {alert.date}
                    </p>
                    <Link to={`/alert/${alert.id}`}>Voir les détails</Link>
                </div>
            ))}
        </div>
    );
};

export default AlertList;