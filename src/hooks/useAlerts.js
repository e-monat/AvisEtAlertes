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
                    const match = alert.titre?.match(
                        /(arr(?:\.|ondissement)?\s+d['e]?\s*([A-Za-zÀ-ÿ0-9\s\-–]+))|,\s*([A-Za-zÀ-ÿ\-–]+(?:–[A-Za-zÀ-ÿ\-–]+)*)$/i
                    );

                    if (match) {
                        arrondissement = match[2] || match[3] || "Inconnu";
                    }

                    return {
                        id: alert._id,
                        title: alert.titre || "Sans titre",
                        arrondissement,
                        date: alert.date_debut?.split("T")[0] || "Date Inconnue",
                        category: alert.type || "Autre",
                    };
                });

                setAlerts(records); //mise à jour de l'état
                localStorage.setItem("alerts", JSON.stringify(records)); //mise en cache
            } catch (err) {
                console.error("Erreur fetch:", err);
                const fallback = localStorage.getItem("alerts");
                if (fallback) {
                    console.warn("Données chargées depuis le cache local.");
                    setAlerts(JSON.parse(fallback)); //utilise les données dans le cache
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts(); //appel à l'API
    }, []);

    return { alerts, loading, error }; //retour du hook
};

export default useAlerts;


