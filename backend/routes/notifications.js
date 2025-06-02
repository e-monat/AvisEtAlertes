const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const webpush = require("../utils/webPush");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


// POST /subscribe
router.post("/subscribe", async (req, res) => {
    const sub = req.body;
    try {
        const exists = await Subscription.findOne({ endpoint: sub.endpoint });
        if (!exists) {
            await Subscription.create(sub);
            return res.status(201).json({ message: "Abonnement enregistré" });
        }
        res.status(200).json({ message: "Déjà abonné" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// POST /unsubscribe
router.post("/unsubscribe", async (req, res) => {
    const { endpoint } = req.body;
    try {
        const result = await Subscription.findOneAndDelete({ endpoint });
        if (!result) return res.status(404).json({ message: "Abonnement non trouvé" });
        res.status(200).json({ message: "Abonnement supprimé" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// POST /send-notification
router.post("/send-notification", async (req, res) => {
    const { title = "Nouvelle alerte", body = "Consultez les dernières alertes." } = req.body;
    try {
        const subs = await Subscription.find();
        const payload = JSON.stringify({ title, body });

        const results = await Promise.allSettled(subs.map(sub =>
            webpush.sendNotification(sub, payload)
        ));

        res.json({
            message: "Notifications envoyées",
            results
        });
    } catch (err) {
        res.status(500).json({ error: "Erreur envoi notification" });
    }
});

// GET /avis-alertes
router.get("/avis-alertes", async (req, res) => {
    try {
        const response = await fetch("https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=fc6e5f85-7eba-451c-8243-bdf35c2ab336&limit=1000");
        const data = await response.json();
        const records = data.result.records.map(alert => ({
            id: alert._id,
            title: alert.titre || "Sans titre",
            arrondissement: alert.titre?.split("– Arrondissement de")[1]?.trim() || "Inconnu",
            date: alert.date_debut,
            category: alert.type || "Autre",
        }));
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: "Erreur récupération des alertes" });
    }
});

module.exports = router;
