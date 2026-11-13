import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";
import HowToWork from "../pages/Howitwork";
import About from "../pages/About";
import Footer from "../components/layout/Footer";
import Dashboard from "../pages/Dashboard";
import Matches from "../pages/Matches";
<<<<<<< HEAD
import Profile from "../pages/Profile";
=======
import Request from "../pages/Request";
import Messages from "../pages/Messages";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";
>>>>>>> dc249b869d9cfad21d53591876fc593db5977ac9

function Mainlayout() {
    const [activePage, setActivePage] = useState("home");
    const { currentUser, setCurrentUser, logout } = useAuth();
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
                onLogout={logout}
            />
            <main className="main-content">
                {activePage === "home" && <Home setActivePage={setActivePage} />}

                {activePage === "how-to-work" && <HowToWork setActivePage={setActivePage} />}

                {activePage === "about" && <About setActivePage={setActivePage} />}

<<<<<<< HEAD
                {activePage === "dashboard" && <Dashboard />}
                {activePage === "matches" && <Matches />}
                {activePage === "profile" && <Profile setActivePage={setActivePage} />}
=======
                {activePage === "dashboard" && <Dashboard setActivePage={setActivePage} />}

                {activePage === "matches" && <Matches setActivePage={setActivePage} />}

                {activePage === "request" && <Request setActivePage={setActivePage} />}

                {activePage === "messages" && <Messages setActivePage={setActivePage} />}
>>>>>>> dc249b869d9cfad21d53591876fc593db5977ac9
            </main>
            <Footer setActivePage={setActivePage} />
        </div>
    );
}

export default Mainlayout;
