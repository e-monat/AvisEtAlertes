import React, { useState } from "react";
import AlertList from "../components/AlertList";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import SubscriptionBox from "../components/SubscriptionBox";
import alerts from "../data/alerts";

const Home = () => {
    const [search, setSearch] = useState("");//Etat par la recherche par titre
    const [selectedArrondissement, setSelectedArrondissement] = useState("");//Etat pour le filtre par arrondissement
    const [selectedSubject, setSelectedSubject] = useState("");//Etat pour le filtre par sujet
    const [selectedDate, setSelectedDate] = useState("");//Etat pour le filtre par date

    //FIltrage des alertes selon les filtres choisi
    const filteredAlerts = alerts.filter(alert => {
        //Verifie si le titre de l'alerte correspond avec ce qui a ete entrer
        const matchesSearch = alert.title.toLowerCase().includes(search.toLowerCase());

        //Verifie si l'alerte correspond a l'arrondissement choisi
        const matchesArrondissement = selectedArrondissement === "" || alert.arrondissement === selectedArrondissement;

        //Verifie si l'alerte correspond au sujet choisi
        const matchesSubject = selectedSubject === "" || alert.category === selectedSubject;

        //Verifie si l'alerte correspond a la date choisi
        const matchesDate = selectedDate === "" || alert.date === selectedDate;


        return matchesSearch && matchesArrondissement && matchesSubject && matchesDate;
    });

    return (
        <div className="home-container">
            <div className="content-wrapper">
                <div className="left-column">
                    <h1 className="title">Avis et alertes</h1>
                    <p className="subtitle">Recherchez un avis</p>
                    <SearchBar search={search} setSearch={setSearch} />
                    <Filters
                        selectedArrondissement={selectedArrondissement}
                        setSelectedArrondissement={setSelectedArrondissement}
                        selectedSubject={selectedSubject}
                        setSelectedSubject={setSelectedSubject}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <p className="results-count">{`1 à ${filteredAlerts.length} sur ${alerts.length} résultats`}</p>    {/* Affiche le nombre de résultats filtrés */}
                    <AlertList alerts={filteredAlerts} />   {/* Composant pour afficher la liste des alertes filtrées */}
                </div>
                <div className="right-column">
                    <SubscriptionBox />
                </div>
            </div>
        </div>
    );
};

export default Home;
