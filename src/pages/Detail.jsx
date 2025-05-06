import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=fc6e5f85-7eba-451c-8243-bdf35c2ab336&limit=1000";

const Detail = () => {
    const { id } = useParams(); // recupere le ID
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAlert = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();

                const record = data.result.records.find(a => String(a._id) === id); //cherche l'alerte qui correspond a l'ID
                if (record) {
                    // extraire l'arrondissement à partir du titre
                    let arrondissement = "Inconnu";
                    if (record.titre && record.titre.includes("– Arrondissement de")) {
                        const parts = record.titre.split("– Arrondissement de");
                        if (parts.length > 1) {
                            arrondissement = parts[1].trim();
                        }
                    }

                    setAlert({
                        id: record._id,
                        title: record.titre || "Sans titre",
                        arrondissement,
                        date: record.date_debut,
                        category: record.type || "Autre",
                    });
                } else {
                    setAlert(null);
                }
            } catch (err) {
                console.error("Erreur fetch:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAlert();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur de chargement.</p>;
    if (!alert) return <h2>Alerte non trouvée</h2>;

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

