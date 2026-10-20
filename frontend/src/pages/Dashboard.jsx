import React from "react";
import "./Dashboard.css";

function Dashboard() {
    // Temporary structure.
    // These values will later come from AuthContext / backend API.
    const user = {
    name: "User",
    incomingRequests: 0,
    upcomingSession: {
    day: "Saturday",
    time: "6:00 PM",
    skill: "React",
    partner: "Skillor Member",
},

    stats: {
        skillsOffered: 0,
        skillsLearned: 0,
        hoursExchanged: 0,
        rating: 0,
    },
    progress: {
        learningHours: 6,
        teachingHours: 4,
        targetHours: 10,
},
}
const recommendedMatches = [
    {
        id: 1,
        name: "Alex Morgan",
        teaches: ["React", "JavaScript"],
        wantsToLearn: ["UI/UX Design"],
        compatibility: 92,
    },
    {
        id: 2,
        name: "Jordan Lee",
        teaches: ["UI/UX Design", "Figma"],
        wantsToLearn: ["React"],
        compatibility: 87,
    },
    {
        id: 3,
        name: "Taylor Smith",
        teaches: ["Python", "Data Analysis"],
        wantsToLearn: ["JavaScript"],
        compatibility: 81,
    },
];;

const skillsPortfolio = {
    teaching: [
        { name: "React & Modern Hooks", level: "Expert" },
        { name: "JavaScript (ES6+)", level: "Advanced" },
        { name: "Python & FastAPI", level: "Intermediate" },
    ],
    learning: [
        { name: "Figma & UI/UX Systems", level: "Intermediate" },
        { name: "Three.js & WebGL", level: "Beginner" },
    ],
};

const weeklyHours = [
    { day: "Mon", taught: 1.5, learned: 1.5 },
    { day: "Tue", taught: 3, learned: 2 },
    { day: "Wed", taught: 1, learned: 1 },
    { day: "Thu", taught: 4, learned: 4 },
    { day: "Fri", taught: 0, learned: 0 },
    { day: "Sat", taught: 2, learned: 2 },
    { day: "Sun", taught: 0.5, learned: 0.5 },
];

const peerReview = {
    quote:
        "Explained custom hooks intuitively and walked through concurrency patterns with clear metaphors. Saved me weeks of confusion!",
    reviewer: "Marcus Chen",
    role: "Full Stack Engineer",
    time: "2 days ago",
};


    return (
        <div className="dashboard">
            {/* Hero Section */}
            <section className="dashboard-hero">
                <div className="hero-content">
                    <span className="hero-badge">
                        Reciprocal Timebank Active
                    </span>

                    <h1>
                        Good morning, {user.name} 👋
                    </h1>

                    <p>
                        You have{" "}
                        <strong>
                            {user.incomingRequests} incoming exchange requests
                        </strong>
                        {user.upcomingSession
                            ? ` and an upcoming session with ${user.upcomingSession.partner}.`
                            : "."}
                    </p>
                </div>

                <div className="hero-actions">
                    <button type="button">
                        + Add New Skill
                    </button>

                    <button type="button">
                        Explore Matches
                    </button>
                </div>
            </section>
            <section className="dashboard-stats">
    <div className="stat-card">
        <span className="stat-value">
            {user.stats.skillsOffered}
        </span>
        <span className="stat-label">
            Skills Offered
        </span>
    </div>

    <div className="stat-card">
        <span className="stat-value">
            {user.stats.skillsLearned}
        </span>
        <span className="stat-label">
            Skills Learned
        </span>
    </div>

    <div className="stat-card">
        <span className="stat-value">
            {user.stats.hoursExchanged}
        </span>
        <span className="stat-label">
            Hours Exchanged
        </span>
    </div>

    <div className="stat-card">
        <span className="stat-value">
            {user.stats.rating}
        </span>
        <span className="stat-label">
            Rating
        </span>
    </div>
</section>

<section className="upcoming-session-panel">
    <div className="upcoming-session-main">
        <div className="session-avatar" aria-hidden="true">
            {user.upcomingSession.partner.charAt(0)}
        </div>

        <div className="upcoming-session-details">
            <div className="session-meta">
                <span className="hero-badge">
                    UPCOMING LIVE SESSION
                </span>
                <span className="session-status">
                    Starting soon
                </span>
            </div>

            <h2>
                {user.upcomingSession.skill} Session
            </h2>

            <p>
                {user.upcomingSession.time} with{" "}
                <strong>{user.upcomingSession.partner}</strong>
            </p>

            <div className="session-exchange-details">
                <span>
                    YOU TEACH <strong>React & JavaScript</strong>
                </span>
                <span aria-hidden="true">⇄</span>
                <span>
                    PARTNER TEACHES <strong>UI/UX Design</strong>
                </span>
            </div>
        </div>

        <button type="button" className="join-session-button">
            Join Session
        </button>
    </div>

    <div className="session-completion">
        <span>Session progress</span>
        <div className="session-completion-track">
            <div className="session-completion-fill" />
        </div>
        <strong>75% Complete</strong>
    </div>
</section>


<div className="dashboard-lower-grid">
    <div className="dashboard-left-column">
        <section className="recommended-matches">
            <div className="section-heading">
                <h2 className="dashboard-section-title">
                    Recommended Matches
                    <span className="title-dot">●</span>
                </h2>
                <button type="button" className="view-all-button">
                    View all ({recommendedMatches.length}) →
                </button>
            </div>

            <div className="matches-grid">
                {recommendedMatches.map((match) => (
                    <div className="match-card" key={match.id}>
                        <h3>{match.name}</h3>

                        <p className="match-skills">
                            <strong>Can teach:</strong>{" "}
                            {match.teaches.join(", ")}
                        </p>

                        <p className="match-skills">
                            <strong>Wants to learn:</strong>{" "}
                            {match.wantsToLearn.join(", ")}
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
                        >
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </section>

        <section className="weekly-hours-card">
            <div className="weekly-hours-heading">
                <div>
                    <h2 className="dashboard-section-title">
                        Weekly Reciprocal Hours Log
                    </h2>
                    <p>Time spent teaching vs. learning across all peer connections</p>
                </div>

                <div className="chart-legend">
                    <span><i className="legend-taught" /> Taught</span>
                    <span><i className="legend-learned" /> Learned</span>
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

    <aside className="dashboard-right-column">
        <section className="skills-portfolio-card">
            <div className="section-heading">
                <h2 className="dashboard-section-title">My Skills Portfolio</h2>
                <button type="button" className="portfolio-edit-button">
                    ✎ Edit
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

        <section className="peer-review-card">
            <div className="review-heading">
                <span>VERIFIED PEER REVIEW</span>
                <strong>☆☆☆☆☆</strong>
            </div>

            <blockquote>“{peerReview.quote}”</blockquote>

            <div className="review-author">
                <div className="review-avatar">
                    {peerReview.reviewer.charAt(0)}
                </div>
                <div>
                    <strong>{peerReview.reviewer}</strong>
                    <p>{peerReview.role} · {peerReview.time}</p>
                </div>
            </div>
        </section>

        <section className="reciprocal-protection-card">
            <div className="protection-icon">♜</div>
            <div>
                <h3>1:1 Reciprocal Protection</h3>
                <p>
                    Every hour you teach converts directly to an equal
                    learning credit. No cash transactions, no inflation.
                </p>
            </div>
        </section>
    </aside>
</div>
</div>
);
}

export default Dashboard;