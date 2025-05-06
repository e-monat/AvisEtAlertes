import React, { useState, useEffect } from "react";
import AlertList from "../components/AlertList";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import SubscriptionBox from "../components/SubscriptionBox";
import useAlerts from "../hooks/useAlerts.js"; //hook pour recuperer les alertes de l'API

const ALERTS_PER_PAGE = 10;

const Home = () => {
    const { alerts, loading, error } = useAlerts();
    const [search, setSearch] = useState("");
    const [selectedArrondissements, setSelectedArrondissements] = useState([]); //filtres arrondissements
    const [selectedSubjects, setSelectedSubjects] = useState([]); //filtres sujet
    const [dateRange, setDateRange] = useState({ start: "", end: "" }); //filtre de date
    const [currentPage, setCurrentPage] = useState(1); //pagination

    //Filtrage des alertes selon la recherche et filtre
    const filteredAlerts = alerts.filter(alert => {
        const matchesSearch = alert.title.toLowerCase().includes(search.toLowerCase());

        const matchesArrondissement = selectedArrondissements.length === 0 ||
            selectedArrondissements.includes(alert.arrondissement);

        const matchesSubject = selectedSubjects.length === 0 ||
            selectedSubjects.includes(alert.category);

        const matchesDate =
            !dateRange.start || alert.date.startsWith(dateRange.start); //filtre date exacte

        return matchesSearch && matchesArrondissement && matchesSubject && matchesDate;
    });

    //calcul nombre de pages
    const totalPages = Math.ceil(filteredAlerts.length / ALERTS_PER_PAGE);

    const currentAlerts = filteredAlerts.slice(
        (currentPage - 1) * ALERTS_PER_PAGE,
        currentPage * ALERTS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    useEffect(() => {
        setCurrentPage(1); // reset à page 1 quand les filtres changent
    }, [search, selectedArrondissements, selectedSubjects, dateRange]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur de chargement des données.</p>;

    return (
        <div className="home-container">
            <div className="content-wrapper">
                <div className="left-column">
                    <h1 className="title">Avis et alertes</h1>
                    <p className="subtitle">Recherchez un avis</p>
                    <SearchBar search={search} setSearch={setSearch} />
                    <Filters
                        alerts={alerts}
                        selectedArrondissements={selectedArrondissements}
                        setSelectedArrondissements={setSelectedArrondissements}
                        selectedSubjects={selectedSubjects}
                        setSelectedSubjects={setSelectedSubjects}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                    />
                    <p className="results-count">
                        {`Résultats ${filteredAlerts.length} – page ${currentPage} sur ${totalPages}`}
                    </p>
                    <AlertList alerts={currentAlerts} />

                    {totalPages > 1 && (
                        <div className="pagination">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="right-column">
                    <SubscriptionBox />
                </div>
            </div>
        </div>
    );
};

export default Home;
