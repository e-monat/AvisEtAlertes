import React from "react";
import { useParams } from "react-router-dom";
import alerts from "../data/alerts";

const Detail = () => {
    //Recupere le parametre id avec l'URL de useParams
    const { id } = useParams();
    //Recherche l'alerte qui correspond a l'ID dans la liste
    const alert = alerts.find(alert => alert.id === parseInt(id));
    //Si l'alerte n'est pass trouvee, affiche un message d'erreur
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