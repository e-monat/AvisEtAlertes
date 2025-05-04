import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filters = ({
                     alerts,
                     selectedArrondissements,
                     setSelectedArrondissements,
                     selectedSubjects,
                     setSelectedSubjects,
                     dateRange,
                     setDateRange,
                 }) => {
    const [activeFilter, setActiveFilter] = useState(null);
    const startDateRef = useRef();

    const arrondissements = [...new Set(alerts.map((alert) => alert.arrondissement))].sort();
    const subjects = [...new Set(alerts.map((alert) => alert.category))].sort();

    const toggleSelection = (value, currentList, setter) => {
        const updated = currentList.includes(value)
            ? currentList.filter((v) => v !== value)
            : [...currentList, value];
        setter(updated);
    };

    const resetFilters = () => {
        setSelectedArrondissements([]);
        setSelectedSubjects([]);
        setDateRange({ start: "", end: "" });
    };

    const renderOptions = (options, selectedList, setter) => (
        <div className="filter-dropdown">
            {options.map((option) => (
                <label key={option} className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={selectedList.includes(option)}
                        onChange={() => toggleSelection(option, selectedList, setter)}
                    />
                    <span>{option}</span>
                </label>
            ))}
        </div>
    );

    return (
        <div className="filters">
            {/* Arrondissement */}
            <div
                className={`filter-bubble ${activeFilter === "arr" ? "active" : ""}`}
                onClick={() => setActiveFilter(activeFilter === "arr" ? null : "arr")}
            >
                Arrondissement
                {activeFilter === "arr" &&
                    renderOptions(arrondissements, selectedArrondissements, setSelectedArrondissements)}
            </div>

            {/* Sujet */}
            <div
                className={`filter-bubble ${activeFilter === "sub" ? "active" : ""}`}
                onClick={() => setActiveFilter(activeFilter === "sub" ? null : "sub")}
            >
                Sujet
                {activeFilter === "sub" &&
                    renderOptions(subjects, selectedSubjects, setSelectedSubjects)}
            </div>

            {/* Date */}
            <div
                className={`filter-bubble ${activeFilter === "date" ? "active" : ""}`}
                onClick={() => {
                    const alreadyOpen = activeFilter === "date";
                    setActiveFilter(alreadyOpen ? null : "date");

                    if (!alreadyOpen && startDateRef.current) {
                        setTimeout(() => startDateRef.current.setOpen(true), 0);
                    }
                }}
            >
                Date
                {activeFilter === "date" && (
                    <div className="filter-dropdown">
                        <DatePicker
                            ref={startDateRef}
                            selected={dateRange.start ? new Date(dateRange.start) : null}
                            onChange={(date) =>
                                setDateRange({
                                    start: date ? date.toISOString().split("T")[0] : "",
                                    end: date ? date.toISOString().split("T")[0] : "",
                                })
                            }
                            dateFormat="yyyy-MM-dd"
                            inline
                        />
                    </div>
                )}
            </div>



            <button className="clear-button" onClick={resetFilters}>
                Tout effacer
            </button>
        </div>
    );
};

export default Filters;

