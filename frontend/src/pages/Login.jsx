import React, { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Sparkles,
  BookOpen,
  Check,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Loader2,
  X,
  KeyRound,
  ArrowRight
} from "lucide-react";
import logo from "../assets/logo.png";
import logoLight from "../assets/logo-light.png";
import loginBg from "../assets/login_bg.png";
import "./Login.css";

export default function Login({
  initialMode = "signin",
  setActivePage,
  setCurrentUser,
}) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    teachSkill: "",
    learnSkill: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };



  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 4
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Basic Validation
    if (!formData.email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!formData.password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    if (mode === "signup") {
      if (!formData.name.trim()) {
        setErrorMsg("Please enter your full name.");
        return;
      }
      if (formData.password.length < 6) {
        setErrorMsg("Password must be at least 6 characters long.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg("Passwords do not match. Please re-check.");
        return;
      }
      if (!agreedToTerms) {
        setErrorMsg("Please accept the Terms of Service to continue.");
        return;
      }
    }

    setIsLoading(true);

    // Simulate authenticating/registering with a smooth feedback delay
    setTimeout(() => {
      setIsLoading(false);
      const authenticatedUser = {
        name: formData.name.trim() || (mode === "signin" ? (formData.email.split("@")[0]) : "Skillor Member"),
        email: formData.email.trim(),
        role: "Skill Trader",
        teachSkill: formData.teachSkill || "React.js",
        learnSkill: formData.learnSkill || "UI/UX Design",
      };

      if (setCurrentUser) {
        setCurrentUser(authenticatedUser);
      }

      setSuccessMsg(
        mode === "signin"
          ? `Welcome back, ${authenticatedUser.name}! Logging you in...`
          : `Account successfully created for ${authenticatedUser.name}! Redirecting...`
      );

      setTimeout(() => {
        if (setActivePage) {
          setActivePage("dashboard");
        }
      }, 1000);
    }, 900);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSubmitted(true);
    }, 700);
  };

  return (
    <div
      className="login-page-container"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="login-backdrop-overlay" />

      <div className="glass-ambient-orb orb-primary" />
      <div className="glass-ambient-orb orb-secondary" />
      <div className="glass-ambient-orb orb-accent" />

      {/* Top Glass Navigation Bar */}
      <header className="glass-topbar">
        <div
          className="glass-topbar-logo"
          onClick={() => setActivePage && setActivePage("home")}
          role="button"
          tabIndex={0}
          title="Return to Skillor Home"
        >
          <img src={logoLight} alt="Skillor Logo" className="glass-logo-img" />
          {/* <span className="glass-logo-badge">Peer-to-Peer</span> */}
        </div>

        <div className="glass-topbar-actions">
          {/* <div className="glass-trust-pill">
            <ShieldCheck size={16} className="trust-icon" />
            <span>256-Bit SSL Encrypted</span>
          </div> */}

          <button
            type="button"
            className="glass-back-btn"
            onClick={() => setActivePage && setActivePage("home")}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Glass Login Card */}
      <main className="glass-card-wrapper">
        <div className="glass-login-card">
          {/* Glass specular light accent */}
          <div className="glass-card-shine" />

          {/* Card Header */}
          <div className="glass-card-header">
            <div className="glass-card-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>Skill Exchange Portal</span>
            </div>
            <h1 className="glass-card-title">
              {mode === "signin" ? "Welcome Back" : "Join Skillor"}
            </h1>
            <p className="glass-card-subtitle">
              {mode === "signin"
                ? "Sign in to exchange skills, manage requests, and meet peers."
                : "Create an account to start trading your superpowers for free."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="glass-tab-pill-container">
            <button
              type="button"
              className={`glass-tab-btn ${mode === "signin" ? "active" : ""}`}
              onClick={() => {
                setMode("signin");
                setErrorMsg("");
                setSuccessMsg("");
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`glass-tab-btn ${mode === "signup" ? "active" : ""}`}
              onClick={() => {
                setMode("signup");
                setErrorMsg("");
                setSuccessMsg("");
              }}
            >
              Create Account
            </button>
          </div>

          {/* Quick Demo Pre-fills */}
          {/* <div className="glass-demo-bar">
            <span className="demo-label">⚡ 1-Click Demo:</span>
            <button
              type="button"
              className="glass-demo-pill"
              onClick={() => handleQuickDemo("learner")}
              title="Autofill as Learner (Alex Morgan)"
            >
              Learner
            </button>
            <button
              type="button"
              className="glass-demo-pill"
              onClick={() => handleQuickDemo("mentor")}
              title="Autofill as Senior Mentor (Rahul Sharma)"
            >
              Mentor
            </button>
          </div> */}

          {/* Alert Error / Success feedback */}
          {errorMsg && (
            <div className="glass-alert-box error" role="alert">
              <AlertCircle size={18} className="alert-icon" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="glass-alert-box success" role="alert">
              <CheckCircle2 size={18} className="alert-icon" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form className="glass-form" onSubmit={handleSubmit} noValidate>
            {/* Full Name (Sign Up only) */}
            {mode === "signup" && (
              <div className="glass-input-group">
                <label className="glass-label" htmlFor="name">
                  Full Name
                </label>
                <div className="glass-input-box">
                  <User size={18} className="glass-input-icon" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="glass-input"
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="glass-input-group">
              <label className="glass-label" htmlFor="email">
                Email Address
              </label>
              <div className="glass-input-box">
                <Mail size={18} className="glass-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="glass-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Skills Fields (Sign Up only) */}
            {mode === "signup" && (
              <div className="glass-input-row">
                <div className="glass-input-group">
                  <label className="glass-label" htmlFor="teachSkill">
                    I Can Teach
                  </label>
                  <div className="glass-input-box">
                    <BookOpen size={18} className="glass-input-icon" />
                    <input
                      id="teachSkill"
                      name="teachSkill"
                      type="text"
                      className="glass-input"
                      placeholder="e.g. React.js, Python"
                      value={formData.teachSkill}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="glass-input-group">
                  <label className="glass-label" htmlFor="learnSkill">
                    I Want to Learn
                  </label>
                  <div className="glass-input-box">
                    <Sparkles size={18} className="glass-input-icon" />
                    <input
                      id="learnSkill"
                      name="learnSkill"
                      type="text"
                      className="glass-input"
                      placeholder="e.g. UI/UX, Figma"
                      value={formData.learnSkill}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="glass-input-group">
              <div className="glass-label-row">
                <label className="glass-label" htmlFor="password">
                  Password
                </label>
                {mode === "signin" && (
                  <button
                    type="button"
                    className="glass-forgot-link"
                    onClick={() => {
                      setForgotEmail(formData.email);
                      setForgotSubmitted(false);
                      setShowForgotModal(true);
                    }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="glass-input-box">
                <Lock size={18} className="glass-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="glass-input"
                  placeholder={
                    mode === "signin" ? "Enter your password" : "Min. 6 characters"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                />
                <button
                  type="button"
                  className="glass-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Strength Meter (Sign Up) */}
              {mode === "signup" && formData.password.length > 0 && (
                <div className="password-strength-container">
                  <div className="password-bars">
                    {[1, 2, 3, 4].map((step) => (
                      <span
                        key={step}
                        className={`strength-bar ${strength >= step ? `active step-${strength}` : ""
                          }`}
                      />
                    ))}
                  </div>
                  <span className="strength-text">
                    {strength <= 1
                      ? "Weak"
                      : strength === 2
                        ? "Fair"
                        : strength === 3
                          ? "Good"
                          : "Strong"}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {mode === "signup" && (
              <div className="glass-input-group">
                <label className="glass-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="glass-input-box">
                  <Lock size={18} className="glass-input-icon" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="glass-input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="glass-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Checkboxes */}
            {mode === "signin" ? (
              <div className="glass-checkbox-row">
                <label className="glass-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="glass-checkbox"
                  />
                  <span>Remember me for 30 days</span>
                </label>
              </div>
            ) : (
              <div className="glass-checkbox-row">
                <label className="glass-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="glass-checkbox"
                    required
                  />
                  <span>
                    I agree to the{" "}
                    <a href="#terms" className="glass-inline-link">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#privacy" className="glass-inline-link">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="glass-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="spin-loader" />
                  <span>
                    {mode === "signin"
                      ? "Signing In..."
                      : "Creating Account..."}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {mode === "signin"
                      ? "Sign In to Skillor"
                      : "Create My Account"}
                  </span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="glass-divider">
            <span className="glass-divider-line" />
            <span className="glass-divider-text">Or continue with</span>
            <span className="glass-divider-line" />
          </div>

          {/* Social Buttons */}
          <div className="glass-social-row">
            <button
              type="button"
              className="glass-social-btn"
              onClick={() => {
                handleQuickDemo("learner");
              }}
              title="Sign in with Google"
            >
              <svg className="social-icon" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.8l3.7-2.9c-.2-.8-.4-1.5-.4-2.3"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="glass-social-btn"
              onClick={() => {
                handleQuickDemo("mentor");
              }}
              title="Sign in with GitHub"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Bottom Switcher */}
          <div className="glass-card-footer">
            {mode === "signin" ? (
              <p>
                Don&apos;t have an account yet?{" "}
                <button
                  type="button"
                  className="glass-toggle-inline"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                >
                  Create one for free
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="glass-toggle-inline"
                  onClick={() => {
                    setMode("signin");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Glass Footer Bar */}
      <footer className="glass-bottom-bar">
        <p className="glass-footer-copy">
          © {new Date().getFullYear()} Skillor • Learn. Share. Grow. {/*Peer-to-Peer
          Skill Marketplace */}
        </p>
        <div className="glass-footer-links">
          <span
            onClick={() => setActivePage && setActivePage("about")}
            className="glass-f-link"
          >
            About
          </span>
          <span className="dot-sep">•</span>
          <span
            onClick={() => setActivePage && setActivePage("how-to-work")}
            className="glass-f-link"
          >
            How It Works
          </span>
          <span className="dot-sep">•</span>
          <span
            onClick={() => setActivePage && setActivePage("home")}
            className="glass-f-link"
          >
            Explore Skills
          </span>
        </div>
      </footer>

      {/* Forgot Password Glass Modal */}
      {showForgotModal && (
        <div className="glass-modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div
            className="glass-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="glass-modal-close"
              onClick={() => setShowForgotModal(false)}
            >
              <X size={18} />
            </button>

            <div className="glass-modal-icon-badge">
              <KeyRound size={24} className="key-icon" />
            </div>

            <h2 className="glass-modal-title">Reset Password</h2>
            <p className="glass-modal-desc">
              Enter your registered Skillor account email and we’ll send you a
              magic link to safely reset your password.
            </p>

            {forgotSubmitted ? (
              <div className="glass-modal-success">
                <CheckCircle2 size={36} className="modal-success-icon" />
                <h3>Recovery Link Sent!</h3>
                <p>
                  We have sent instructions to <strong>{forgotEmail}</strong>.
                  Please check your inbox and spam folder.
                </p>
                <button
                  type="button"
                  className="glass-submit-btn modal-btn"
                  onClick={() => setShowForgotModal(false)}
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="glass-modal-form">
                <div className="glass-input-group">
                  <label className="glass-label" htmlFor="forgot-email">
                    Account Email
                  </label>
                  <div className="glass-input-box">
                    <Mail size={18} className="glass-input-icon" />
                    <input
                      id="forgot-email"
                      type="email"
                      className="glass-input"
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="glass-modal-actions">
                  <button
                    type="button"
                    className="glass-modal-cancel"
                    onClick={() => setShowForgotModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="glass-submit-btn"
                    disabled={forgotLoading}
                  >
                    {forgotLoading ? (
                      <>
                        <Loader2 size={18} className="spin-loader" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

