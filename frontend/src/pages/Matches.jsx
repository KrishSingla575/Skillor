import { useState, useMemo } from "react";
import {
    Users, Search, Star, Clock, ArrowUpDown, User, Send, Check, Bookmark,
    MapPin, Link2, SlidersHorizontal, X, ChevronLeft, ChevronRight,
} from "lucide-react";

import "./Matches.css";

const allMatches = [
    {
        id: 1,
        name: "Aarav Sharma",
        username: "aarav_27",
        location: "Dehradun, India",
        score: 92,
        status: "Last seen 2h ago",
        online: true,
        bio: "Computer science student passionate about programming and creative design.",
        teaches: ["Python", "SQL", "Data Structures"],
        wants: ["UI/UX Design", "Video Editing"],
        interests: "Tech, Design, Gaming",
        why: "You can teach Python, and Aarav can help you learn UI/UX Design.",
        level: "Beginner",
        modes: ["Online"],
        availability: ["Weekdays"],
        languages: ["English", "Hindi"],
        isNew: false,
        requestSent: false,
        saved: false,
        activeRank: 2,
    },
    {
        id: 2,
        name: "Priya Singh",
        username: "priya_codes",
        location: "Jaipur, India",
        score: 88,
        status: "Online now",
        online: true,
        bio: "Web developer and design enthusiast. Love building cool projects and learning new things.",
        teaches: ["HTML", "CSS", "JavaScript"],
        wants: ["Python", "Machine Learning"],
        interests: "Coding, Travel, Photography",
        why: "You can teach Web Dev, and Priya can help you learn Python.",
        level: "Intermediate",
        modes: ["Online", "In-person"],
        availability: ["Weekdays", "Weekends"],
        languages: ["English", "Hindi"],
        isNew: true,
        requestSent: true,
        saved: true,
        activeRank: 1,
    },
    {
        id: 3,
        name: "Rohan Mehta",
        username: "rohan_dev",
        location: "Bhopal, India",
        score: 76,
        status: "Last active 5h ago",
        online: true,
        bio: "Full-stack developer. Always curious to learn and share knowledge with others.",
        teaches: ["React", "Node.js", "Express.js"],
        wants: ["Graphic Design", "Photoshop"],
        interests: "Music, Fitness, Technology",
        why: "You can teach React & Node.js, and Rohan can help you learn Graphic Design.",
        level: "Advanced",
        modes: ["Online"],
        availability: ["Weekends"],
        languages: ["English", "Punjabi"],
        isNew: true,
        requestSent: false,
        saved: false,
        activeRank: 3,
    },
];

const PAGE_SIZE = 3;

const hasAny = (list, wanted) =>
    wanted.some((w) => list.some((s) => s.toLowerCase().includes(w.toLowerCase())));

const ticked = (obj) => Object.keys(obj).filter((k) => obj[k]);

function Matches() {
    const [tab, setTab] = useState("all");
    const [sortBy, setSortBy] = useState("score");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [matches, setMatches] = useState(allMatches);

    const [selected, setSelected] = useState(null);

    const [learnSkills, setLearnSkills] = useState([]);
    const [teachSkills, setTeachSkills] = useState([]);
    const [learnInput, setLearnInput] = useState("");
    const [teachInput, setTeachInput] = useState("");
    const [minScore, setMinScore] = useState(0);
    const [level, setLevel] = useState({ Beginner: false, Intermediate: false, Advanced: false });
    const [mode, setMode] = useState({ Online: false, "In-person": false });
    const [availability, setAvailability] = useState({ Weekdays: false, Weekends: false });
    const [language, setLanguage] = useState("Any");

    const toggle = (setter, key) =>
        setter((prev) => ({ ...prev, [key]: !prev[key] }));

    const toggleField = (id, field) =>
        setMatches((prev) =>
            prev.map((m) => (m.id === id ? { ...m, [field]: !m[field] } : m))
        );

    const addSkill = (e, value, list, setList, setInput) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        const v = value.trim();
        if (v && !list.includes(v)) setList([...list, v]);
        setInput("");
        setPage(1);
    };

    const clearAll = () => {
        setLearnSkills([]);
        setTeachSkills([]);
        setLearnInput("");
        setTeachInput("");
        setMinScore(0);
        setLevel({ Beginner: false, Intermediate: false, Advanced: false });
        setMode({ Online: false, "In-person": false });
        setAvailability({ Weekdays: false, Weekends: false });
        setLanguage("Any");
        setSearch("");
        setTab("all");
        setPage(1);
    };

    const visible = useMemo(() => {
        const q = search.trim().toLowerCase();
        const levels = ticked(level);
        const modes = ticked(mode);
        const times = ticked(availability);

        let list = matches.filter((m) => {
            if (m.score < minScore) return false;
            if (tab === "best" && m.score < 85) return false;
            if (tab === "new" && !m.isNew) return false;

            if (learnSkills.length && !hasAny(m.teaches, learnSkills)) return false;
            if (teachSkills.length && !hasAny(m.wants, teachSkills)) return false;

            if (levels.length && !levels.includes(m.level)) return false;
            if (modes.length && !modes.some((x) => m.modes.includes(x))) return false;
            if (times.length && !times.some((x) => m.availability.includes(x))) return false;
            if (language !== "Any" && !m.languages.includes(language)) return false;

            if (q) {
                const found =
                    m.name.toLowerCase().includes(q) ||
                    m.teaches.some((s) => s.toLowerCase().includes(q)) ||
                    m.wants.some((s) => s.toLowerCase().includes(q));
                if (!found) return false;
            }
            return true;
        });

        return [...list].sort((a, b) =>
            sortBy === "score"
                ? b.score - a.score
                : sortBy === "active"
                ? a.activeRank - b.activeRank
                : b.id - a.id
        );
    }, [matches, tab, sortBy, search, minScore, learnSkills, teachSkills, level, mode, availability, language]);

    const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const current = visible.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    const initials = (name) =>
        name.split(" ").map((n) => n[0]).join("").slice(0, 2);

    return (
        <div className="matches-page">
            <section className="matches-hero">
                <div className="matches-hero-icon">
                    <Users size={28} />
                </div>

                <div className="matches-hero-text">
                    <h1>Your Skill Matches</h1>
                    <p>
                        Find people who can teach what you want to learn and learn
                        what you can teach.
                    </p>

                    <div className="matches-search">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or skill..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                </div>

                <div className="matches-count">
                    <Users size={20} />
                    <div>
                        <strong>{visible.length}</strong>
                        <span>potential matches</span>
                    </div>
                </div>
            </section>

            <div className="matches-layout">
                <div className="matches-main">
                    <div className="matches-toolbar">
                        <div className="matches-tabs">
                            <button
                                type="button"
                                className={tab === "all" ? "tab active" : "tab"}
                                onClick={() => { setTab("all"); setPage(1); }}
                            >
                                All Matches
                            </button>
                            <button
                                type="button"
                                className={tab === "best" ? "tab active" : "tab"}
                                onClick={() => { setTab("best"); setPage(1); }}
                            >
                                <Star size={16} /> Best Matches
                            </button>
                            <button
                                type="button"
                                className={tab === "new" ? "tab active" : "tab"}
                                onClick={() => { setTab("new"); setPage(1); }}
                            >
                                <Clock size={16} /> New Matches
                            </button>
                        </div>

                        <label className="sort-select">
                            <ArrowUpDown size={16} />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="score">Highest Match Score</option>
                                <option value="active">Recently Active</option>
                                <option value="new">Newest Matches</option>
                            </select>
                        </label>
                    </div>

                    {current.length === 0 && (
                        <div className="matches-empty">
                            <Search size={28} />
                            <h3>No results found</h3>
                            <p>Try another name or skill, or clear your filters.</p>
                            <button type="button" onClick={clearAll}>
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {current.map((m) => (
                        <article className="mx-card" key={m.id}>
                            <div className="mx-card-top">
                                <div className="mx-profile">
                                    <div className="mx-avatar">
                                        {initials(m.name)}
                                        {m.online && <span className="mx-online-dot" />}
                                    </div>
                                    <div className="mx-profile-text">
                                        <h3>{m.name}</h3>
                                        <span className="mx-username">@{m.username}</span>
                                        <span className="mx-location">
                                            <MapPin size={13} /> {m.location}
                                        </span>
                                    </div>
                                </div>

                                <div className="mx-summary">
                                    <div className="mx-summary-row">
                                        <span className="mx-score">{m.score}% Match</span>
                                        <span
                                            className={
                                                m.status === "Online now"
                                                    ? "mx-status online"
                                                    : "mx-status"
                                            }
                                        >
                                            {m.status}
                                        </span>
                                    </div>
                                    <p className="mx-bio">{m.bio}</p>
                                </div>
                            </div>

                            <div className="mx-skills">
                                <div className="mx-skills-col">
                                    <div className="mx-skill-group">
                                        <span className="mx-skill-label">Can teach</span>
                                        <div className="mx-chips">
                                            {m.teaches.map((s) => (
                                                <span className="mx-chip green" key={s}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mx-interests">
                                        <strong>Interests:</strong> {m.interests}
                                    </p>
                                </div>

                                <div className="mx-skills-col mx-divided">
                                    <div className="mx-skill-group">
                                        <span className="mx-skill-label">Wants to learn</span>
                                        <div className="mx-chips">
                                            {m.wants.map((s) => (
                                                <span className="mx-chip purple" key={s}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mx-why">
                                        <Link2 size={15} />
                                        <span>
                                            <strong>Why we match:</strong> {m.why}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="mx-actions">
                                <button
                                    type="button"
                                    className="mx-btn outline"
                                    onClick={() => setSelected(m)}
                                >
                                    <User size={16} /> View Profile
                                </button>

                                {m.requestSent ? (
                                    <button type="button" className="mx-btn sent" disabled>
                                        <Check size={16} /> Request Sent
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="mx-btn primary"
                                        onClick={() => toggleField(m.id, "requestSent")}
                                    >
                                        <Send size={16} /> Connect
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="mx-btn outline"
                                    onClick={() => toggleField(m.id, "saved")}
                                >
                                    <Bookmark size={16} fill={m.saved ? "currentColor" : "none"} />
                                    {m.saved ? "Saved" : "Save"}
                                </button>
                            </div>
                        </article>
                    ))}

                    {visible.length > 0 && (
                        <div className="mx-pagination">
                            <button
                                type="button"
                                disabled={safePage === 1}
                                onClick={() => setPage(safePage - 1)}
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <button
                                    type="button"
                                    key={n}
                                    className={n === safePage ? "active" : ""}
                                    onClick={() => setPage(n)}
                                >
                                    {n}
                                </button>
                            ))}

                            <button
                                type="button"
                                disabled={safePage === totalPages}
                                onClick={() => setPage(safePage + 1)}
                                aria-label="Next page"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <aside className="matches-side">
                    <div className="filters-card">
                        <div className="filters-head">
                            <span>
                                <SlidersHorizontal size={15} /> Filters
                            </span>
                            <button type="button" onClick={clearAll}>Clear All</button>
                        </div>

                        <div className="filter-block">
                            <h4>Skills I want to learn</h4>
                            <div className="filter-search">
                                <Search size={15} />
                                <input
                                    type="text"
                                    placeholder="Type a skill, press Enter"
                                    value={learnInput}
                                    onChange={(e) => setLearnInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        addSkill(e, learnInput, learnSkills, setLearnSkills, setLearnInput)
                                    }
                                />
                            </div>
                            <div className="filter-tags">
                                {learnSkills.map((s) => (
                                    <span className="filter-tag" key={s}>
                                        {s}
                                        <button
                                            type="button"
                                            aria-label={`Remove ${s}`}
                                            onClick={() =>
                                                setLearnSkills(learnSkills.filter((x) => x !== s))
                                            }
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="filter-block">
                            <h4>Skills I can teach</h4>
                            <div className="filter-search">
                                <Search size={15} />
                                <input
                                    type="text"
                                    placeholder="Type a skill, press Enter"
                                    value={teachInput}
                                    onChange={(e) => setTeachInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        addSkill(e, teachInput, teachSkills, setTeachSkills, setTeachInput)
                                    }
                                />
                            </div>
                            <div className="filter-tags">
                                {teachSkills.map((s) => (
                                    <span className="filter-tag" key={s}>
                                        {s}
                                        <button
                                            type="button"
                                            aria-label={`Remove ${s}`}
                                            onClick={() =>
                                                setTeachSkills(teachSkills.filter((x) => x !== s))
                                            }
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="filter-block">
                            <h4>Experience Level</h4>
                            {Object.keys(level).map((k) => (
                                <label className="filter-check" key={k}>
                                    <input
                                        type="checkbox"
                                        checked={level[k]}
                                        onChange={() => toggle(setLevel, k)}
                                    />
                                    {k}
                                </label>
                            ))}
                        </div>

                        <div className="filter-block">
                            <h4>Learning Mode</h4>
                            {Object.keys(mode).map((k) => (
                                <label className="filter-check" key={k}>
                                    <input
                                        type="checkbox"
                                        checked={mode[k]}
                                        onChange={() => toggle(setMode, k)}
                                    />
                                    {k}
                                </label>
                            ))}
                        </div>

                        <div className="filter-block">
                            <h4>Availability</h4>
                            {Object.keys(availability).map((k) => (
                                <label className="filter-check" key={k}>
                                    <input
                                        type="checkbox"
                                        checked={availability[k]}
                                        onChange={() => toggle(setAvailability, k)}
                                    />
                                    {k}
                                </label>
                            ))}
                        </div>

                        <div className="filter-block">
                            <h4>Language</h4>
                            <select
                                className="filter-select"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option>Any</option>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Punjabi</option>
                            </select>
                        </div>

                        <div className="filter-block">
                            <h4>Minimum Match Score</h4>
                            <div className="filter-range">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={minScore}
                                    onChange={(e) => setMinScore(Number(e.target.value))}
                                />
                                <span>{minScore}%</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {selected && (
                <div className="mx-overlay" onClick={() => setSelected(null)}>
                    <div className="mx-modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="mx-modal-close"
                            aria-label="Close"
                            onClick={() => setSelected(null)}
                        >
                            <X size={18} />
                        </button>

                        <div className="mx-modal-head">
                            <div className="mx-avatar">{initials(selected.name)}</div>
                            <div>
                                <h2>{selected.name}</h2>
                                <span className="mx-username">@{selected.username}</span>
                                <span className="mx-location">
                                    <MapPin size={13} /> {selected.location}
                                </span>
                            </div>
                            <span className="mx-score">{selected.score}% Match</span>
                        </div>

                        <p className="mx-bio">{selected.bio}</p>

                        <h4>Can teach</h4>
                        <div className="mx-chips">
                            {selected.teaches.map((s) => (
                                <span className="mx-chip green" key={s}>{s}</span>
                            ))}
                        </div>

                        <h4>Wants to learn</h4>
                        <div className="mx-chips">
                            {selected.wants.map((s) => (
                                <span className="mx-chip purple" key={s}>{s}</span>
                            ))}
                        </div>

                        <div className="mx-modal-info">
                            <p><strong>Level:</strong> {selected.level}</p>
                            <p><strong>Learning mode:</strong> {selected.modes.join(", ")}</p>
                            <p><strong>Available:</strong> {selected.availability.join(", ")}</p>
                            <p><strong>Languages:</strong> {selected.languages.join(", ")}</p>
                            <p><strong>Interests:</strong> {selected.interests}</p>
                        </div>

                        <p className="mx-why">
                            <Link2 size={15} />
                            <span><strong>Why we match:</strong> {selected.why}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Matches;
