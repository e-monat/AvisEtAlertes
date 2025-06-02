# Avis et Alertes Montréal – Progressive Web App

##  1: Description

Ce projet est une application web progressive (PWA) permettant aux citoyens de Montréal de consulter les avis et alertes en temps réel, même hors-ligne, et de recevoir des **notifications push** sur leurs appareils.

Elle se base sur l’API officielle de la Ville de Montréal, mais passe par un serveur Express pour centraliser et formater les données.

---

## 2: Fonctionnalités

- Recherche par mots-clés
- Filtres par arrondissement, sujet et date
- Page de détail pour chaque alerte
- Pagination (10 alertes par page)
-  Mode hors-ligne avec Workbox
-  Installation mobile (PWA complète)
-  Notifications push via Web Push API (avec gestion de l’abonnement/désabonnement)
-  Mise en cache locale des alertes
-  Simulation d’envoi de notifications via Postman (`/send-notification`)

---

##  3: Organisation du projet

-labo1/
├── backend/ # Backend Express
│ ├── models/ 
│ │ └── Subscription.js
│ ├── routes/ 
│ │ └── notifications.js
│ ├── utils/ 
│ │ └── webPush.js
│ ├── generateVapid.cjs
│ ├── .env 
│ └── server.js # Point d'entrée du serveur Express

├── src/ # Frontend React (PWA)
│ ├── components/ 
│ │ ├── AlertList.jsx
│ │ ├── AlertItem.jsx
│ │ ├── Filters.jsx
│ │ ├── Footer.jsx
│ │ ├── Header.jsx
│ │ ├── InstallPrompt.jsx
│ │ ├── PushSubscriptionModal.jsx
│ │ ├── SearchBar.jsx
│ │ └── SubscriptionBox.jsx
│ ├── pages/ # Pages principales
│ │ ├── Home.jsx
│ │ └── Detail.jsx
│ ├── hooks/ 
│ │ └── useAlerts.js
│ ├── App.jsx
│ ├── App.css
│ ├── index.css
│ └── main.jsx # Point d’entrée React
-ReadMe
## (Je ne sais pas pourquoi ça s'affiche mal)
    
## 4: Instructions pour installer et exécuter le code

-cd backend
npm install
node server.js

(frontend)
npm install
npm run dev
