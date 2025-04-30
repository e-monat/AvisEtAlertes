import React, { useState, useEffect } from "react";

const Filters = ({
                     selectedArrondissements,
                     setSelectedArrondissements,
                     selectedSubjects,
                     setSelectedSubjects,
                     dateRange,
                     setDateRange,
                 }) => {
    const [activeFilter, setActiveFilter] = useState(null);
    const [options, setOptions] = useState({ arr: [], subject: [], date: [] });

    useEffect(() => {
        fetch("https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=fc6e5f85-7eba-451c-8243-bdf35c2ab336&limit=1000")
            .then(res => res.json())
            .then(data => {
                const records = data.result.records;
                setOptions({
                    arr: [...new Set(records.map(a => a.arrondissement))].sort(),
                    subject: [...new Set(records.map(a => a.sujet))].sort(),
                    date: [...new Set(records.map(a => a.date_avis))].sort(),
                });
            });
    }, []);

    const toggleValue = (value, list, setter) => {
        if (list.includes(value)) {
            setter(list.filter(v => v !== value));
        } else {
            setter([...list, value]);
        }
    };

    const renderOptions = (list, selected, setter) => (
        <div className="filter-dropdown">
            {list.map((option) => (
                <label key={option} className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => toggleValue(option, selected, setter)}
                    />
                    <span>{option}</span>
                </label>
            ))}
        </div>
    );

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="filters">
            <div
                className={`filter-bubble ${activeFilter === "arr" ? "active" : ""}`}
                onClick={() => setActiveFilter(activeFilter === "arr" ? null : "arr")}
            >
                Arrondissement
                {activeFilter === "arr" && renderOptions(options.arr, selectedArrondissements, setSelectedArrondissements)}
            </div>

            <div
                className={`filter-bubble ${activeFilter === "subject" ? "active" : ""}`}
                onClick={() => setActiveFilter(activeFilter === "subject" ? null : "subject")}
            >
                Sujet
                {activeFilter === "subject" && renderOptions(options.subject, selectedSubjects, setSelectedSubjects)}
            </div>

            <div
                className={`filter-bubble ${activeFilter === "date" ? "active" : ""}`}
                onClick={() => setActiveFilter(activeFilter === "date" ? null : "date")}
            >
                Période
                {activeFilter === "date" && (
                    <div className="filter-dropdown">
                        <label>
                            Début:
                            <input type="date" name="start" value={dateRange.start} onChange={handleDateChange} />
                        </label>
                        <label>
                            Fin:
                            <input type="date" name="end" value={dateRange.end} onChange={handleDateChange} />
                        </label>
                    </div>
                )}
            </div>

            <button className="reset-btn" onClick={() => {
                setSelectedArrondissements([]);
                setSelectedSubjects([]);
                setDateRange({ start: "", end: "" });
            }}>Tout effacer</button>
        </div>
    );
};

export default Filters;
