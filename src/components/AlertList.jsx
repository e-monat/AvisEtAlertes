import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const AlertList = ({ alerts }) => {
    return (
        <div className="alert-list">
            {alerts.map(alert => (
                <div key={alert.id} className="alert-item">
                    <h2>{alert.title}</h2>
                    <span className="alert-category">{alert.category}</span>

                    <div className="alert-meta">
                        <FaMapMarkerAlt className="location-icon" /> {alert.arrondissement} - <FaCalendarAlt className="calendar-icon" /> {alert.date?.split("T")[0]}
                    </div>

                    <Link to={`/alert/${alert.id}`}>Voir les détails</Link>
                </div>
            ))}
        </div>
    );
};

export default AlertList;
