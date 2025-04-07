import React, { useState } from "react";
import alerts from "../data/alerts";

const Filters = ({ setSelectedArrondissement, setSelectedSubject, setSelectedDate }) => {
    const [activeFilter, setActiveFilter] = useState(null); //suivre le filtre qui est actif

    //extraire tout les valeurs d'arrondissement, sujet et date
    const arrondissements = [...new Set(alerts.map(alert => alert.arrondissement))];
    const subjects = [...new Set(alerts.map(alert => alert.category))];
    const dates = [...new Set(alerts.map(alert => alert.date))];

    //fonction pour afficher une liste avec case a cocher
    const renderOptions = (options, onSelect) => (
        <div className="filter-dropdown">
            {options.map((option) => (
                <label key={option} className="filter-checkbox">
                    <input type="checkbox" onChange={() => onSelect(option)} />
                    <span>{option}</span>
                </label>
            ))}
        </div>
    );

    return (
        <div className="filters">
            <div
                className={`filter-bubble ${activeFilter === "arr" ? "active" : ""}`}
                onClick={() => setActiveFilter(activeFilter === "arr" ? null : "arr")}
            >
                Arrondissement
                {activeFilter === "arr" && renderOptions(arrondissements, (value) => {
                    setSelectedArrondissement(value);
                    setActiveFilter(null);
                })}
            </div>

            <div
                className={`filter-bubble ${activeFilter === "subject" ? "active" : ""}`}
                onClick={() => setActiveFilter(activeFilter === "subject" ? null : "subject")}
            >
                Sujet
                {activeFilter === "subject" && renderOptions(subjects, (value) => {
                    setSelectedSubject(value);
                    setActiveFilter(null);
                })}
            </div>

            <div
                className={`filter-bubble ${activeFilter === "date" ? "active" : ""}`}
                onClick={() => setActiveFilter(activeFilter === "date" ? null : "date")}
            >
                Date
                {activeFilter === "date" && renderOptions(dates, (value) => {
                    setSelectedDate(value);
                    setActiveFilter(null);
                })}
            </div>
        </div>
    );
};

export default Filters;


