import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  MessageSquare,
  Compass,
  Calendar,
  Award,
  Settings as SettingsIcon,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  CalendarDays,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "../../router/Router";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar({ activePage, setActivePage }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pathname = location.pathname;

  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/about", label: "About" },
  ];

  const authLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/discover", label: "Discover" },
    { path: "/matches", label: "Matches" },
    { path: "/requests", label: "Requests" },
    { path: "/chat", label: "Chat" },
    { path: "/sessions", label: "Sessions", icon: CalendarDays },
    { path: "/reviews", label: "Reviews" },
  ];

  const navLinks = currentUser ? authLinks : publicLinks;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
  }, [pathname, activePage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setShowDropdown(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNav = (path) => {
    navigate(path);
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
    if (setActivePage) {
      setActivePage(path.replace('/', '') || 'home');
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
    navigate('/');
    if (setActivePage) setActivePage('home');
  };

  return (
    <header className="nav">
      <div className="main">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('/')}
          className="Mlogo"
          role="button"
          tabIndex={0}
          title="Skillor - Learn. Share. Grow."
        >
          <img src={logo} alt="Skillor Logo" className="logo" />
        </div>

        <nav className="nav-center" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path !== '/' && pathname.startsWith(link.path));
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNav(link.path)}
                className={`nav-link-btn ${isActive ? "active" : ""}`}
              >
                <span className="nav-text">{link.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="nav-right">
          {currentUser ? (
            <div className="nav-user-container" ref={dropdownRef}>
              <div 
                className={`nav-user-info ${showDropdown ? "open" : ""}`}
                onClick={() => setShowDropdown(!showDropdown)}
                role="button"
                tabIndex={0}
                title="Account menu"
              >
                <span className="nav-user-avatar">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                </span>
                <span className="nav-user-name">{currentUser.name || "Member"}</span>
                <ChevronDown size={14} className={`dropdown-chevron ${showDropdown ? "rotated" : ""}`} />
              </div>

              {showDropdown && (
                <div className="nav-dropdown-menu">
                  <div className="dropdown-user-header">
                    <strong>{currentUser.name || "Member"}</strong>
                    <span>{currentUser.email || "Skillor Member"}</span>
                  </div>

                  <div className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleNav(`/profile/${currentUser.id || 'usr_narendar'}`)}
                  >
                    <UserIcon size={16} className="item-icon icon-purple" />
                    <span>My Profile</span>
                  </button>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleNav('/profile/edit')}
                  >
                    <SettingsIcon size={16} className="item-icon icon-blue" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleNav('/dashboard')}
                  >
                    <Award size={16} className="item-icon icon-green" />
                    <span>Dashboard</span>
                  </button>

                  <div className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="item-icon icon-red" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-ga">
              <button
                type="button"
                onClick={() => handleNav('/login')}
                className="login"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => handleNav('/register')}
                className="join-btn"
              >
                <span>Join Skillor</span>
                <ArrowRight className="btn-icons" size={16} />
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="nav-mobile-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`nav-mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}
        aria-label="Mobile Navigation Menu"
      >
        <div className="nav-mobile-drawer-header">
          <div
            onClick={() => handleNav('/')}
            className="nav-mobile-drawer-logo"
            role="button"
            tabIndex={0}
          >
            <img src={logo} alt="Skillor Logo" className="mobile-logo-img" />
          </div>
          <button
            type="button"
            className="nav-mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {currentUser && (
          <div className="nav-mobile-user-card">
            <span className="mobile-user-avatar">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
            </span>
            <div className="mobile-user-details">
              <span className="mobile-user-name">{currentUser.name || "Skillor Member"}</span>
              <span className="mobile-user-role">{currentUser.email || "Member"}</span>
            </div>
          </div>
        )}

        <nav className="nav-mobile-links">
          <span className="nav-mobile-section-label">
            {currentUser ? "WORKSPACE" : "NAVIGATION"}
          </span>
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path !== '/' && pathname.startsWith(link.path));
            return (
              <button
                key={link.path}
                type="button"
                className={`nav-mobile-link-btn ${isActive ? "active" : ""}`}
                onClick={() => handleNav(link.path)}
              >
                <span>{link.label}</span>
                <ChevronRight size={16} className="mobile-link-chevron" />
              </button>
            );
          })}
        </nav>

        <div className="nav-mobile-actions">
          {currentUser ? (
            <button
              type="button"
              className="nav-mobile-logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          ) : (
            <div className="nav-mobile-auth-stack">
              <button
                type="button"
                className="nav-mobile-join-btn"
                onClick={() => handleNav('/register')}
              >
                <span>Join Skillor</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="nav-mobile-signin-btn"
                onClick={() => handleNav('/login')}
              >
                Sign In
              </button>
            </div>
          )}

          <div className="nav-mobile-perk-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Peer-to-Peer • 100% Free Forever</span>
          </div>
        </div>
      </aside>
    </header>
  );
}

export default Navbar;