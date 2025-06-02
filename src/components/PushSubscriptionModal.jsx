import React, { useEffect, useState } from "react";

const VAPID_PUBLIC_KEY = "BGIfaKsDvKpMOHou0q8EfPxT9gByiBa0yQz3DLiGhIhMUZoaYuY-tItjm4T3nX5y75goc_ZHZqNeRvKYuUlrcxQ";

const PushSubscriptionModal = ({ onClose }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkSubscription();
    }, []);

    const checkSubscription = async () => {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            const sub = await registration.pushManager.getSubscription();
            setIsSubscribed(!!sub);
        }
    };

    const subscribe = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });

            await fetch("http://localhost:3000/api/subscribe", {
                method: "POST",
                body: JSON.stringify(subscription),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setIsSubscribed(true);
            alert("Abonnement réussi !");
        } catch (err) {
            console.error("Erreur d'abonnement :", err);
            setError("Impossible de s’abonner.");
        }
    };

    const unsubscribe = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            if (subscription) {
                await fetch("http://localhost:3000/api/unsubscribe", {
                    method: "POST",
                    body: JSON.stringify({ endpoint: subscription.endpoint }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                await subscription.unsubscribe();
                setIsSubscribed(false);
                alert("Désabonnement réussi.");
            }
        } catch (err) {
            console.error("Erreur de désabonnement :", err);
            setError("Erreur lors du désabonnement.");
        }
    };

    const urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Notifications Push</h2>
                <p>Vous recevrez une alerte lorsque de nouveaux contenus seront disponibles.</p>

                {isSubscribed ? (
                    <button onClick={unsubscribe}>Se désabonner</button>
                ) : (
                    <button onClick={subscribe}>S’abonner</button>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button onClick={onClose} style={{ marginTop: "1rem" }}>Fermer</button>
            </div>
        </div>
    );
};

export default PushSubscriptionModal;
