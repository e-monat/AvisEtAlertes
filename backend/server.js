
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const notificationsRoutes = require("./routes/notifications");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", notificationsRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connecté"))
    .catch((err) => console.error("Erreur MongoDB :", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
