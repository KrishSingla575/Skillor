import React from "react";
import {
  ArrowUp,
  Sparkles,
  Heart,
  Globe,
  ShieldCheck,
  Compass,
  ArrowRight
} from "lucide-react";
import logo from "../../assets/logo.png";
import "./Footer.css";

function Footer({ setActivePage }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (pageId, sectionId) => {
    if (setActivePage && pageId) {
      setActivePage(pageId);
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          scrollToTop();
        }
      }, 100);
    } else {
      scrollToTop();
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Top Callout / Banner */}
        <div className="footer-cta-banner">
          <div className="footer-cta-left">
            <span className="footer-pill-badge">
              <Sparkles size={14} className="cta-sparkle" />
              <span>Peer-to-Peer Learning Revolution</span>
            </span>
            <h3 className="footer-cta-title">
              Ready to trade your skills with peers worldwide?
            </h3>
            <p className="footer-cta-desc">
              Join thousands of developers, designers, and creators leveling up
              together — 100% free, zero course fees.
            </p>
          </div>
          <div className="footer-cta-right">
            <button
              type="button"
              className="footer-cta-btn"
              onClick={() => handleNavigation("signup")}
            >
              <span>Get Started Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand">
            <div
              className="footer-logo"
              onClick={() => handleNavigation("home")}
              role="button"
              tabIndex={0}
              title="Return to Skillor Home"
            >
              <img src={logo} alt="Skillor Logo" className="img" />
            </div>
            <p className="footer-description">
              The modern reciprocal skill exchange ecosystem. Connect with
              complementary peers, teach what you know, and master what you
              want — all without monetary transactions.
            </p>

            <div className="footer-badges-row">
              <span className="footer-tagline">
                <Sparkles size={13} />
                <span>Learn • Share • Grow</span>
              </span>
              <span className="footer-trust-badge">
                <ShieldCheck size={13} />
                <span>100% Free Peer Network</span>
              </span>
            </div>

            {/* Social Links */}
            <div className="footer-social-row">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Skillor on GitHub"
                title="GitHub"
              >
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Skillor on Twitter"
                title="Twitter / X"
              >
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Skillor on LinkedIn"
                title="LinkedIn"
              >
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z"/>
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Skillor Discord Community"
                title="Discord Community"
              >
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div className="footer-col">
            <h4 className="footer-heading">PLATFORM</h4>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("how-to-work")}
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("home", "explore-skills")}
                >
                  Skill Explorer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("matches")}
                >
                  Smart Matching
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("home", "peer-showcase")}
                >
                  Peer Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("signup")}
                >
                  Join Skillor Free
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="footer-col">
            <h4 className="footer-heading">SKILL CATEGORIES</h4>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("home", "explore-skills")}
                >
                  Engineering & Code
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("home", "explore-skills")}
                >
                  Design & Creative
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("home", "explore-skills")}
                >
                  AI & Data Science
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("home", "explore-skills")}
                >
                  Languages & Speech
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("home", "explore-skills")}
                >
                  Business & Growth
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-col">
            <h4 className="footer-heading">COMPANY</h4>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("about")}
                >
                  About Skillor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNavigation("how-to-work")}
                >
                  Exchange Guidelines
                </button>
              </li>
              <li>
                <a href="#privacy" className="footer-link-btn">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="footer-link-btn">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#security" className="footer-link-btn">
                  Trust & Safety
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Skillor Inc. Built for ambitious peer
              learners and mentors everywhere.
            </p>
          </div>

          <div className="footer-legal-links">
            <a href="#terms" className="footer-legal-link">Terms</a>
            <span className="footer-legal-dot">•</span>
            <a href="#privacy" className="footer-legal-link">Privacy</a>
            <span className="footer-legal-dot">•</span>
            <a href="#cookies" className="footer-legal-link">Cookies</a>
            <span className="footer-legal-dot">•</span>
            <a href="#community" className="footer-legal-link">Community Code</a>
          </div>

          <div className="footer-bottom-right">
            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              title="Back to Top"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
