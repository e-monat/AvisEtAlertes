import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/alert/:id" element={<Detail />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;