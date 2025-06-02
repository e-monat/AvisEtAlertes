import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:3000/api/avis-alertes"; // 👈 ton backend maintenant

const Detail = () => {
    const { id } = useParams();
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAlert = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();

                const record = data.find(a => a.id == id); // double égal pour "1" == 1

                if (record) {
                    setAlert(record);
                } else {
                    setAlert(null);
                    setError(true);
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
    if (error || !alert) return <p>Erreur de chargement.</p>;

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


