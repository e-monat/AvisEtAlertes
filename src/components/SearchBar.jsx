import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Que cherchez-vous?"
      value={search}
      onChange={(e) => setSearch(e.target.value)} //l'etat setSearch est mis a jour quand l'utilisateur rentre une nouvelle valeur
      className="search-bar"
    />
  );
};

export default SearchBar;