import React, { useState } from "react";
import {ArrowRight} from 'lucide-react';
import logo from "../../assets/logo.png";
import "./Navbar.css";
function Navbar({activePage, setActivePage, currentUser: propCurrentUser, setCurrentUser}) {
    const currentUser = propCurrentUser !== undefined ? propCurrentUser : false;


const navLinks = currentUser
    ? [
        { id: "dashboard", label: "Dashboard" },
        { id: "matches", label: "Matches" },
        {id: "request", label: "Request"},
        { id: "messages", label: "Messages" }
    ]
    : [
        { id: "home", label: "Home" },
        { id: "how-to-work", label: "How It Works" },
        { id: "about", label: "About" }
    ];
    return(
        <header className="nav">
            <div className="main">
                <div 
                    onClick={()=> setActivePage('home')}
                    className="Mlogo">
                    <img src={logo} alt="Logo" className="logo"/>
                </div>

                <nav className="nav-center">
                    {navLinks.map(link => {
                        const isActive = activePage === link.id;
                        return(
                            <button
                                key={link.id}
                                onClick={()=> setActivePage(link.id)}
                                className={`nav-link-btn ${isActive ? "active" : ""}`}
                            >
                                <span className="nav-text">{link.label}</span>
                                {isActive && <span className="nav-link-active"></span>}
                            </button>
                        )
                    })}
                </nav>

                <div className="nav-right">
                    {currentUser ? (
                        <div className="nav-user-container">
                            <div className="nav-user-info" onClick={() => setActivePage("dashboard")} title="Go to Dashboard">
                                <span className="nav-user-avatar">
                                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                                </span>
                                <span className="nav-user-name">{currentUser.name || "Member"}</span>
                            </div>
                            <button
                                type="button"
                                className="nav-logout-btn"
                                onClick={() => {
                                    if (setCurrentUser) setCurrentUser(null);
                                    setActivePage("home");
                                }}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="nav-ga">
                            <button
                                onClick={() => setActivePage("login")}
                                className="login"
                            >
                                Sign In
                            </button>

                            <button
                                onClick={() => setActivePage("signup")}
                                className="join-btn"
                            >
                                <span>Join Skillor</span>
                                <ArrowRight className="btn-icons" size={16}/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>



    )
};
export default Navbar;