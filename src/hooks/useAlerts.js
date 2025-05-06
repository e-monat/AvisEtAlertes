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
                console.log("Data récupérée:", data.result.records);
                const records = data.result.records.map(alert => {
                    // Extraire l'arrondissement depuis le titre
                    let arrondissement = "Inconnu";
                    if (alert.titre && alert.titre.includes("– Arrondissement de")) {
                        const parts = alert.titre.split("– Arrondissement de");
                        if (parts.length > 1) {
                            arrondissement = parts[1].trim();
                        }
                    }

                    return {
                        id: alert._id,
                        title: alert.titre || "Sans titre",
                        arrondissement,
                        date: alert.date_debut,
                        category: alert.type || "Autre",
                    };
                });

                setAlerts(records); //mise a jour de l'etat
                localStorage.setItem("alerts", JSON.stringify(records)); //mise en cache
            } catch (err) {
                console.error("Erreur fetch:", err);
                const fallback = localStorage.getItem("alerts");
                if (fallback) {
                    setAlerts(JSON.parse(fallback)); //utilise les donnees dans le cache
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts(); //appel a l'API
    }, []);

    return { alerts, loading, error }; //retour du hook
};

export default useAlerts;

