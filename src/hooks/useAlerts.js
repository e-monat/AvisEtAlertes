import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/avis-alertes";

const useAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();

                console.log("Données reçues du backend :", data);
                if (Array.isArray(data)) {
                    setAlerts(data);
                    localStorage.setItem("alerts", JSON.stringify(data));
                } else {
                    console.error("Données non valides (pas un tableau)");
                    setError(true);
                }
            } catch (err) {
                console.error("Erreur fetch:", err);
                const fallback = localStorage.getItem("alerts");
                if (fallback) {
                    console.warn("Données chargées depuis le cache local.");
                    setAlerts(JSON.parse(fallback));
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    return { alerts, loading, error };
};

export default useAlerts;



