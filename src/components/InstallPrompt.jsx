import React, { useEffect, useState } from "react";

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault(); //empeche le toast default
            setDeferredPrompt(e);
            setShowPrompt(true); //montre mon toast perso
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // declenche l'installation
            deferredPrompt.userChoice.then(() => {
                setDeferredPrompt(null);
                setShowPrompt(false); //cache le toast
            });
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="install-prompt">
            <p>Installez l'application sur votre appareil !</p>
            <button onClick={handleInstallClick}>Installer</button>
        </div>
    );
};

export default InstallPrompt;
