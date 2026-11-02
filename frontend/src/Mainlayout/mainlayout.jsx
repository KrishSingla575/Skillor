import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";
import HowToWork from "../pages/Howitwork";
import About from "../pages/About";
import Footer from "../components/layout/Footer";
import Dashboard from "../pages/Dashboard";
import Matches from "../pages/Matches";
import Request from "../pages/Request";
import Login from "../pages/Login";

function Mainlayout() {
    const [activePage, setActivePage] = useState("home");
    const [currentUser, setCurrentUser] = useState(null);

    // Full screen immersive glass auth experience with login_bg image
    if (activePage === "login" || activePage === "signup") {
        return (
            <Login
                initialMode={activePage === "signup" ? "signup" : "signin"}
                setActivePage={setActivePage}
                setCurrentUser={setCurrentUser}
            />
        );
    }

    return (
        <div className="main-layout">
            <Navbar
                activePage={activePage}
                setActivePage={setActivePage}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />
            <main className="main-content">
                {activePage === "home" && <Home setActivePage={setActivePage} />}

                {activePage === "how-to-work" && <HowToWork setActivePage={setActivePage} />}

                {activePage === "about" && <About setActivePage={setActivePage} />}

                {activePage === "dashboard" && <Dashboard setActivePage={setActivePage} />}

                {activePage === "matches" && <Matches setActivePage={setActivePage} />}

                {activePage === "request" && <Request setActivePage={setActivePage} />}
            </main>
            <Footer />
        </div>
    );
}

export default Mainlayout;
