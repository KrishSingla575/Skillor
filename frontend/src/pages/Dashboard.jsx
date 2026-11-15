import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  ArrowRight,
  Video,
  CheckCircle2,
  X,
  ExternalLink,
  BookOpen,
  Calendar,
  Clock,
  Star,
  Users
} from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard({ setActivePage, openChat }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  // Live state from backend
  const [summary, setSummary] = useState({
    user: {
      name: currentUser?.name || "Skillor Member",
      incomingRequests: 0,
      upcomingSession: {
        day: "Saturday",
        time: "6:00 PM",
        skill: "React & Architecture",
        partner: "Priya Patel",
        meetingLink: "https://meet.skillor.io/room-demo",
      },
      stats: {
        skillsOffered: 3,
        skillsLearned: 2,
        hoursExchanged: 12,
        rating: 4.95,
      },
    },
    recommendedMatches: [],
    skillsPortfolio: {
      teaching: [],
      learning: [],
    },
    weeklyHours: [
      { day: "Mon", taught: 1.5, learned: 1.5 },
      { day: "Tue", taught: 3, learned: 2 },
      { day: "Wed", taught: 1, learned: 1 },
      { day: "Thu", taught: 4, learned: 4 },
      { day: "Fri", taught: 0, learned: 0 },
      { day: "Sat", taught: 2, learned: 2 },
      { day: "Sun", taught: 0.5, learned: 0.5 },
    ],
    peerReview: {
      quote: "Explained custom hooks intuitively and walked through concurrency patterns with clear metaphors. Saved me weeks of confusion!",
      reviewer: "Marcus Chen",
      role: "Full Stack Engineer",
      time: "2 days ago",
    },
  });

  // Modals state
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillData, setNewSkillData] = useState({
    skillName: "",
    type: "teach",
    level: "Intermediate",
  });
  const [addSkillLoading, setAddSkillLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [showSessionModal, setShowSessionModal] = useState(false);

  // Fetch summary data on mount
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await api.stats.getSummary();
        if (res.success && res.data) {
          setSummary(res.data);
        }
      } catch (err) {
        console.warn("Could not fetch summary from backend:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [currentUser]);

  // Handle Add New Skill submit
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillData.skillName.trim()) return;

    setAddSkillLoading(true);
    try {
      const res = await api.skills.addSkill({
        skillName: newSkillData.skillName.trim(),
        type: newSkillData.type,
        level: newSkillData.level,
      });

      if (res.success) {
        setToastMsg(`Added "${newSkillData.skillName.trim()}" to your ${newSkillData.type} skills!`);
        setShowAddSkillModal(false);
        setNewSkillData({ skillName: "", type: "teach", level: "Intermediate" });

        // Update local portfolio state
        const targetList = newSkillData.type === "teach" ? "teaching" : "learning";
        setSummary((prev) => ({
          ...prev,
          skillsPortfolio: {
            ...prev.skillsPortfolio,
            [targetList]: [
              ...prev.skillsPortfolio[targetList],
              { name: res.skill.skillName, level: res.skill.level },
            ],
          },
          user: {
            ...prev.user,
            stats: {
              ...prev.user.stats,
              skillsOffered:
                newSkillData.type === "teach"
                  ? prev.user.stats.skillsOffered + 1
                  : prev.user.stats.skillsOffered,
              skillsLearned:
                newSkillData.type === "learn"
                  ? prev.user.stats.skillsLearned + 1
                  : prev.user.stats.skillsLearned,
            },
          },
        }));

        setTimeout(() => setToastMsg(""), 3500);
      }
    } catch (err) {
      console.error("Error adding skill:", err);
    } finally {
      setAddSkillLoading(false);
    }
  };

  const user = summary.user;
  const recommendedMatches = summary.recommendedMatches || [];
  const skillsPortfolio = summary.skillsPortfolio || { teaching: [], learning: [] };
  const weeklyHours = summary.weeklyHours || [];
  const peerReview = summary.peerReview;

  return (
    <div className="dashboard">
      {toastMsg && (
        <div className="dashboard-toast" role="status">
          <CheckCircle2 size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <span className="hero-badge">Reciprocal Timebank Active</span>

          <h1>
            Good day, {currentUser?.name || user.name} 👋
          </h1>

          <p>
            You have{" "}
            <strong
              onClick={() => setActivePage && setActivePage("request")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {user.incomingRequests} incoming exchange requests
            </strong>
            {user.upcomingSession
              ? ` and an upcoming session with ${user.upcomingSession.partner}.`
              : "."}
          </p>
        </div>

        <div className="hero-actions">
          <button type="button" onClick={() => setShowAddSkillModal(true)}>
            + Add New Skill
          </button>

          <button
            type="button"
            onClick={() => setActivePage && setActivePage("matches")}
          >
            Explore Matches →
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-value">{user.stats.skillsOffered}</span>
          <span className="stat-label">Skills Offered</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{user.stats.skillsLearned}</span>
          <span className="stat-label">Skills Learned</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{user.stats.hoursExchanged}h</span>
          <span className="stat-label">Hours Exchanged</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{user.stats.rating} ★</span>
          <span className="stat-label">Peer Rating</span>
        </div>
      </section>

      {/* Upcoming Session Panel */}
      {user.upcomingSession && (
        <section className="upcoming-session-panel">
          <div className="upcoming-session-main">
            <div className="session-avatar" aria-hidden="true">
              {user.upcomingSession.partner.charAt(0)}
            </div>

            <div className="upcoming-session-details">
              <div className="session-meta">
                <span className="hero-badge">UPCOMING LIVE SESSION</span>
                <span className="session-status">Starting soon</span>
              </div>

              <h2>{user.upcomingSession.skill} Session</h2>

              <p>
                {user.upcomingSession.day} at {user.upcomingSession.time} with{" "}
                <strong>{user.upcomingSession.partner}</strong>
              </p>

              <div className="session-exchange-details">
                <span>
                  YOU TEACH <strong>{skillsPortfolio.teaching[0]?.name || "React"}</strong>
                </span>
                <span aria-hidden="true">⇄</span>
                <span>
                  PARTNER TEACHES <strong>{skillsPortfolio.learning[0]?.name || "UI/UX Design"}</strong>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="join-session-button"
              onClick={() => setShowSessionModal(true)}
            >
              Join Session
            </button>
          </div>

          <div className="session-completion">
            <span>Session readiness</span>
            <div className="session-completion-track">
              <div
                className="session-completion-fill"
                style={{ width: "85%" }}
              />
            </div>
            <strong>Ready to join</strong>
          </div>
        </section>
      )}

      {/* Lower Grid */}
      <div className="dashboard-lower-grid">
        <div className="dashboard-left-column">
          {/* Recommended Matches */}
          <section className="recommended-matches">
            <div className="section-heading">
              <h2 className="dashboard-section-title">
                Recommended Matches
                <span className="title-dot">●</span>
              </h2>
              <button
                type="button"
                className="view-all-button"
                onClick={() => setActivePage && setActivePage("matches")}
              >
                View all ({recommendedMatches.length}) →
              </button>
            </div>

            <div className="matches-grid">
              {recommendedMatches.map((match) => (
                <div className="match-card" key={match.id}>
                  <h3>{match.name}</h3>

                  <p className="match-skills">
                    <strong>Can teach:</strong>{" "}
                    {Array.isArray(match.teaches)
                      ? match.teaches.join(", ")
                      : match.teaches}
                  </p>

                  <p className="match-skills">
                    <strong>Wants to learn:</strong>{" "}
                    {Array.isArray(match.wantsToLearn)
                      ? match.wantsToLearn.join(", ")
                      : match.wantsToLearn}
                  </p>

                  <div className="match-compatibility">
                    <span>Compatibility</span>
                    <strong>{match.compatibility}%</strong>
                  </div>

                  <div className="match-progress-bar">
                    <div
                      className="match-progress-fill"
                      style={{
                        width: `${match.compatibility}%`,
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    className="view-profile-button"
                    onClick={() => setActivePage && setActivePage("matches")}
                  >
                    Connect & View Profile
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly Hours Card */}
          <section className="weekly-hours-card">
            <div className="weekly-hours-heading">
              <div>
                <h2 className="dashboard-section-title">
                  Weekly Reciprocal Hours Log
                </h2>
                <p>
                  Time spent teaching vs. learning across all peer connections
                </p>
              </div>

              <div className="chart-legend">
                <span>
                  <i className="legend-taught" /> Taught
                </span>
                <span>
                  <i className="legend-learned" /> Learned
                </span>
              </div>
            </div>

            <div className="weekly-chart">
              {weeklyHours.map((day) => {
                const maxHours = 4;
                const taughtHeight = `${(day.taught / maxHours) * 100}%`;
                const learnedHeight = `${(day.learned / maxHours) * 100}%`;

                return (
                  <div className="chart-day" key={day.day}>
                    <div className="chart-bars">
                      <div
                        className="chart-bar chart-bar-taught"
                        style={{ height: taughtHeight }}
                        title={`Taught: ${day.taught} hours`}
                      />
                      <div
                        className="chart-bar chart-bar-learned"
                        style={{ height: learnedHeight }}
                        title={`Learned: ${day.learned} hours`}
                      />
                    </div>
                    <span>{day.day}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <aside className="dashboard-right-column">
          <section className="skills-portfolio-card">
            <div className="section-heading">
              <h2 className="dashboard-section-title">My Skills Portfolio</h2>
              <button
                type="button"
                className="portfolio-edit-button"
                onClick={() => setShowAddSkillModal(true)}
              >
                + Add Skill
              </button>
            </div>

            <div className="portfolio-group">
              <div className="portfolio-group-heading">
                <span>⊕ I'M TEACHING (ACTIVE)</span>
                <strong>{skillsPortfolio.teaching.length} Skills</strong>
              </div>

              {skillsPortfolio.teaching.map((skill) => (
                <div className="portfolio-skill" key={skill.name}>
                  <span className="skill-dot taught-dot" />
                  <span className="portfolio-skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}</span>
                </div>
              ))}
            </div>

            <div className="portfolio-group">
              <div className="portfolio-group-heading learning-heading">
                <span>⊕ I'M LEARNING (IN PROGRESS)</span>
                <strong>{skillsPortfolio.learning.length} Skills</strong>
              </div>

              {skillsPortfolio.learning.map((skill) => (
                <div className="portfolio-skill" key={skill.name}>
                  <span className="skill-dot learned-dot" />
                  <span className="portfolio-skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}</span>
                </div>
              ))}
            </div>
          </section>

          {peerReview && (
            <section className="peer-review-card">
              <div className="review-heading">
                <span>VERIFIED PEER REVIEW</span>
                <strong>★★★★★</strong>
              </div>

              <blockquote>“{peerReview.quote}”</blockquote>

              <div className="review-author">
                <div className="review-avatar">
                  {peerReview.reviewer.charAt(0)}
                </div>
                <div>
                  <strong>{peerReview.reviewer}</strong>
                  <p>
                    {peerReview.role} · {peerReview.time}
                  </p>
                </div>
              </div>
            </section>
          )}

          <section className="reciprocal-protection-card">
            <div className="protection-icon">♜</div>
            <div>
              <h3>1:1 Reciprocal Protection</h3>
              <p>
                Every hour you teach converts directly to an equal learning
                credit. No cash transactions, no inflation.
              </p>
            </div>
          </section>
        </aside>
      </div>

      {/* Add New Skill Modal */}
      {showAddSkillModal && (
        <div
          className="dashboard-modal-backdrop"
          onClick={() => setShowAddSkillModal(false)}
        >
          <div
            className="dashboard-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="dashboard-modal-close"
              onClick={() => setShowAddSkillModal(false)}
            >
              <X size={18} />
            </button>

            <h2>Add New Skill to Portfolio</h2>
            <p className="modal-desc">
              Expanding your portfolio automatically unlocks new reciprocal peer matches in the network!
            </p>

            <form onSubmit={handleAddSkill} className="add-skill-form">
              <div className="form-group">
                <label>Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, Figma, Python, Docker"
                  value={newSkillData.skillName}
                  onChange={(e) =>
                    setNewSkillData({ ...newSkillData, skillName: e.target.value })
                  }
                  required
                  autoFocus
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Portfolio Type</label>
                  <select
                    value={newSkillData.type}
                    onChange={(e) =>
                      setNewSkillData({ ...newSkillData, type: e.target.value })
                    }
                  >
                    <option value="teach">I Can Teach (Offering)</option>
                    <option value="learn">I Want to Learn (Goal)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Proficiency / Goal Level</label>
                  <select
                    value={newSkillData.level}
                    onChange={(e) =>
                      setNewSkillData({ ...newSkillData, level: e.target.value })
                    }
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn secondary"
                  onClick={() => setShowAddSkillModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn primary"
                  disabled={addSkillLoading || !newSkillData.skillName.trim()}
                >
                  {addSkillLoading ? "Adding..." : "+ Save to Portfolio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Session Modal */}
      {showSessionModal && user.upcomingSession && (
        <div
          className="dashboard-modal-backdrop"
          onClick={() => setShowSessionModal(false)}
        >
          <div
            className="dashboard-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="dashboard-modal-close"
              onClick={() => setShowSessionModal(false)}
            >
              <X size={18} />
            </button>

            <div className="session-modal-badge">
              <Video size={16} />
              <span>Encrypted Video Room</span>
            </div>

            <h2>{user.upcomingSession.skill} Live Exchange</h2>
            <p className="modal-desc">
              With <strong>{user.upcomingSession.partner}</strong> on{" "}
              {user.upcomingSession.day} at {user.upcomingSession.time}.
            </p>

            <div className="meeting-room-box">
              <span className="room-label">Meeting URL</span>
              <code className="room-code">
                {user.upcomingSession.meetingLink || "https://meet.skillor.io/live-session"}
              </code>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn secondary"
                onClick={() => {
                  if (openChat) openChat();
                  setShowSessionModal(false);
                }}
              >
                Open Partner Chat
              </button>
              <a
                href={user.upcomingSession.meetingLink || "https://meet.jit.si/skillor-session"}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn primary modal-link-btn"
              >
                <span>Launch Video Call</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
