import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";
import HowToWork from "../pages/Howitwork";
import About from "../pages/About";
import Footer from "../components/layout/Footer";
import Dashboard from "../pages/Dashboard";
import Matches from "../pages/Matches"

function Mainlayout() {
    const [activePage, setActivePage] = useState("home");

    return (
        <div className="main-layout">
            <Navbar activePage={activePage} setActivePage={setActivePage} />
            <main className="main-content">
                {activePage === "home" && <Home />}

                {activePage === "how-to-work" && <HowToWork/>}

                {activePage === "about" && <About/>}

                {activePage === "dashboard" && <Dashboard />}

                {activePage === "matches" && <Matches />}
            </main>
            <Footer/>
        </div>
    );
}

export default Mainlayout;