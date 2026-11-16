import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";
import HowToWork from "../pages/Howitwork";
import About from "../pages/About";
import Footer from "../components/layout/Footer";
import Dashboard from "../pages/Dashboard";
import Matches from "../pages/Matches";
import Request from "../pages/Request";
import Messages from "../pages/Messages";
import Login from "../pages/Login";
import Sessions from "../pages/Sessions";
import Discover from "../pages/Discover";
// import Reviews from "../pages/Reviews";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "../router/Router";

const routeToPage = {
    "/": "home",
    "/home": "home",
    "/how-it-works": "how-to-work",
    "/about": "about",
    "/dashboard": "dashboard",
    "/discover": "discover",
    "/matches": "matches",
    "/requests": "request",
    "/sessions": "sessions",
    "/chat": "messages",
    "/reviews": "reviews",
    "/login": "login",
    "/register": "signup",
};

function pageFromPath(pathname) {
    const clean = (pathname || "/").split("?")[0].split("#")[0];
    return routeToPage[clean] || "home";
}

function Mainlayout() {
    const location = useLocation();
    const [activePage, setActivePage] = useState(() =>
        pageFromPath(location.pathname)
    );
    const { setCurrentUser, logout } = useAuth();

    // Keep the rendered page in sync with the URL (navbar links, back button, etc.)
    useEffect(() => {
        setActivePage(pageFromPath(location.pathname));
    }, [location.pathname]);

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
                setCurrentUser={setCurrentUser}
                onLogout={logout}
            />
            <main className="main-content">
                {activePage === "home" && <Home setActivePage={setActivePage} />}

                {activePage === "how-to-work" && <HowToWork setActivePage={setActivePage} />}

                {activePage === "about" && <About setActivePage={setActivePage} />}

                {activePage === "dashboard" && <Dashboard setActivePage={setActivePage} />}

                {activePage === "discover" && <Discover setActivePage={setActivePage} />}

                {activePage === "matches" && <Matches setActivePage={setActivePage} />}

                {activePage === "request" && <Request setActivePage={setActivePage} />}

                {activePage === "messages" && <Messages setActivePage={setActivePage} />}

                {activePage === "sessions" && <Sessions setActivePage={setActivePage} />}
            </main>
            <Footer setActivePage={setActivePage} />
        </div>
    );
}

export default Mainlayout;