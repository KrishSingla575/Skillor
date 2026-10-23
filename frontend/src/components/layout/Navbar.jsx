import React, { useState } from "react";
import {ArrowRight} from 'lucide-react';
import logo from "../../assets/logo.png";
import "./Navbar.css";
function Navbar({activePage, setActivePage}) {
    const [currentUser, logout] = useState(false); /// it change after useAuth


const navLinks = currentUser
    ? [
        { id: "dashboard", label: "Dashboard" },
        { id: "matches", label: "Matches" },
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
                        <div><p>hi</p></div>
                    ) : (
                        <div className="nav-ga">
                            <button
                                onClick={() => setActivePage("login")}
                                className="login"
                            >
                                Sign In
                            </button>

                            <button className="join-btn">
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