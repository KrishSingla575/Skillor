import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";
import HowToWork from "../pages/Howitwork";
import About from "../pages/About";
import Footer from "../components/layout/Footer";
import Dashboard from "../pages/Dashboard";
import Matches from "../pages/Matches";
import Request from "../pages/Request";
import Sessions from "../pages/Sessions";
import Messages from "../pages/Messages";
import Login from "../pages/Login";
import Discover from "../pages/Discover";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import SkillDetails from "../pages/SkillDetails";
import { useAuth } from "../context/AuthContext";
import { useLocation, matchRoute } from "../router/Router";

function Mainlayout() {
    const { pathname } = useLocation();
    const [activePage, setActivePage] = useState("home");
    const { currentUser, setCurrentUser, logout } = useAuth();

    const route = pathname || "/";

    const isAuthRoute =
        (route === "/login" ||
        route === "/register" ||
        route === "/signup" ||
        activePage === "login" ||
        activePage === "signup");

    if (
        isAuthRoute &&
        activePage !== "dashboard" &&
        route !== "/dashboard"
    ) {
        return (
            <Login
                initialMode={route === "/register" || activePage === "signup" ? "signup" : "signin"}
                setActivePage={setActivePage}
                setCurrentUser={setCurrentUser}
            />
        );
    }

    const profileMatch = matchRoute("/profile/:id", route);
    const skillMatch = matchRoute("/skill/:id", route);

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

                {activePage === "dashboard" && <Dashboard setActivePage={setActivePage} />}

                {activePage === "matches" && <Matches setActivePage={setActivePage} />}

                {activePage === "request" && <Request setActivePage={setActivePage} />}

                {activePage === "messages" && <Messages setActivePage={setActivePage} />}
            </main>
            <Footer setActivePage={setActivePage} />
        </div>
    );
}

export default Mainlayout;
