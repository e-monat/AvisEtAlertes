import { useEffect, useState } from "react";

const API_URL = "https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=fc6e5f85-7eba-451c-8243-bdf35c2ab336&limit=1000";

const useAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                const records = data.result.records.map(alert => ({
                    id: alert._id,
                    title: alert.titre || "Sans titre",
                    arrondissement: alert.arrondissement || "Inconnu",
                    date: alert.date_avis,
                    category: alert.sujet || "Autre",
                }));

                setAlerts(records);
                localStorage.setItem("alerts", JSON.stringify(records));
            } catch (err) {
                console.error("Erreur fetch:", err);
                const fallback = localStorage.getItem("alerts");
                if (fallback) {
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
