import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Home as HomeIcon,
  HelpCircle,
  Info,
  LayoutDashboard,
  Users,
  Inbox,
  MessageSquare,
  LogOut,
  ChevronRight,
  Sparkles
} from "lucide-react";
import logo from "../../assets/logo.png";
import "./Navbar.css";
<<<<<<< HEAD
function Navbar({activePage, setActivePage}) {
    const [currentUser, logout] = useState(true); /// it change after useAuth
=======
>>>>>>> dc249b869d9cfad21d53591876fc593db5977ac9

function Navbar({
  activePage,
  setActivePage,
  currentUser: propCurrentUser,
  setCurrentUser,
  onLogout
}) {
  const currentUser = propCurrentUser !== undefined ? propCurrentUser : false;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activePage]);

  // Auto-close mobile menu if viewport resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
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

  const navLinks = currentUser
    ? [
<<<<<<< HEAD
        { id: "dashboard", label: "Dashboard" },
        { id: "matches", label: "Matches" },
        { id: "messages", label: "Messages" }
    ]
    : [
        { id: "home", label: "Home" },
        { id: "how-to-work", label: "How It Works" },
        { id: "about", label: "About" },

    ];
    return(
        <header className="nav">
            <div className="main">
                <div 
                    onClick={()=> setActivePage('home')}
                    className="Mlogo">
                    <img src={logo} alt="Logo" className="logo"/>
                </div>
=======
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "matches", label: "Matches", icon: Users },
        { id: "request", label: "Request", icon: Inbox },
        { id: "messages", label: "Messages", icon: MessageSquare }
      ]
    : [
        { id: "home", label: "Home", icon: HomeIcon },
        { id: "how-to-work", label: "How It Works", icon: HelpCircle },
        { id: "about", label: "About", icon: Info }
      ];
>>>>>>> dc249b869d9cfad21d53591876fc593db5977ac9

  const handleNavClick = (id) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

<<<<<<< HEAD
                <div className="nav-right">
                  {currentUser ? (
    <div>
        <button
            onClick={() => setActivePage("profile")}
            className={`nav-link-btn ${activePage === "profile" ? "active" : ""}`}
        >
            <span className="nav-text">My Profile</span>
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
=======
  const handleSignOut = () => {
    if (onLogout) onLogout();
    else if (setCurrentUser) setCurrentUser(null);
    setActivePage("home");
    setIsMobileMenuOpen(false);
  };
>>>>>>> dc249b869d9cfad21d53591876fc593db5977ac9

  return (
    <header className="nav">
      <div className="nav-container">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick("home")}
          className="Mlogo"
          role="button"
          tabIndex={0}
          title="Return to Skillor Home"
        >
          <img src={logo} alt="Skillor Logo" className="logo" />
        </div>

        {/* Desktop Nav Center (Hidden on <=860px) */}
        <nav className="nav-center" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nav-link-btn ${isActive ? "active" : ""}`}
                type="button"
              >
                <span className="nav-text">{link.label}</span>
                {isActive && <span className="nav-link-active" />}
              </button>
            );
          })}
        </nav>

        {/* Desktop Nav Right Actions (Hidden on <=860px) */}
        <div className="nav-right">
          {currentUser ? (
            <div className="nav-user-container">
              <div
                className="nav-user-info"
                onClick={() => handleNavClick("dashboard")}
                title="Go to Dashboard"
                role="button"
                tabIndex={0}
              >
                <span className="nav-user-avatar">
                  {currentUser.name
                    ? currentUser.name.charAt(0).toUpperCase()
                    : "U"}
                </span>
                <span className="nav-user-name">
                  {currentUser.name || "Member"}
                </span>
              </div>
              <button
                type="button"
                className="nav-logout-btn"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="nav-ga">
              <button
                type="button"
                onClick={() => handleNavClick("login")}
                className="login"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => handleNavClick("signup")}
                className="join-btn"
              >
                <span>Join Skillor</span>
                <ArrowRight className="btn-icons" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button (Visible only on <=860px) */}
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

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="nav-mobile-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside
        className={`nav-mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}
        aria-label="Mobile Navigation Menu"
      >
        <div className="nav-mobile-drawer-header">
          <div
            onClick={() => handleNavClick("home")}
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

        {/* User Card if logged in */}
        {currentUser && (
          <div className="nav-mobile-user-card">
            <span className="mobile-user-avatar">
              {currentUser.name
                ? currentUser.name.charAt(0).toUpperCase()
                : "U"}
            </span>
            <div className="mobile-user-details">
              <span className="mobile-user-name">
                {currentUser.name || "Skillor Member"}
              </span>
              <span className="mobile-user-role">
                {currentUser.email || "Peer Learner & Mentor"}
              </span>
            </div>
          </div>
        )}

        {/* Mobile Nav Links */}
        <nav className="nav-mobile-links">
          <span className="nav-mobile-section-label">
            {currentUser ? "YOUR WORKSPACE" : "NAVIGATION"}
          </span>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                type="button"
                className={`nav-mobile-link-btn ${isActive ? "active" : ""}`}
                onClick={() => handleNavClick(link.id)}
              >
                <div className="mobile-link-left">
                  {Icon && <Icon size={18} className="mobile-link-icon" />}
                  <span>{link.label}</span>
                </div>
                <ChevronRight size={16} className="mobile-link-chevron" />
              </button>
            );
          })}
        </nav>

        {/* Mobile Auth Actions Footer */}
        <div className="nav-mobile-actions">
          {currentUser ? (
            <button
              type="button"
              className="nav-mobile-logout-btn"
              onClick={handleSignOut}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          ) : (
            <div className="nav-mobile-auth-stack">
              <button
                type="button"
                className="nav-mobile-join-btn"
                onClick={() => handleNavClick("signup")}
              >
                <span>Join Skillor</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="nav-mobile-signin-btn"
                onClick={() => handleNavClick("login")}
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
