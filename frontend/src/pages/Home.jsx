import { useState, useMemo } from "react";
import {
  Sparkles,
  BookOpen,
  ArrowLeftRight,
  BrainCog,
  ArrowRight,
  Star,
  CircleCheck,
  ShieldCheck,
  CalendarCheck,
  CheckCircle,
  Check,
  Users,
  Code,
  Palette,
  Bot,
  Video,
  TrendingUp,
  Globe,
  Clock,
  Award,
  Zap,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  Layers,
  RefreshCw
} from "lucide-react";
import "./Home.css";


const INITIAL_PEERS = [
  {
    id: "1",
    name: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    role: "Senior Frontend Architect @ TechFlow",
    rating: 4.9,
    reviewsCount: 42,
    badge: "Super Peer",
    teaches: ["React.js", "TypeScript", "Next.js"],
    wants: ["Figma Design Systems", "UI Prototyping"],
    category: "engineering",
    availability: "Weekday Evenings (IST / UTC+5:30)",
    experience: "6+ years in frontend engineering",
    bio: "Passionate about building scalable UI architectures. Wanting to sharpen my product design instincts in exchange for deep React/Next.js mentoring."
  },
  {
    id: "2",
    name: "Priya Kapoor",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    role: "Lead UX Designer @ AutoCreative",
    rating: 4.95,
    reviewsCount: 38,
    badge: "Verified Mentor",
    teaches: ["Figma Design Systems", "UI/UX", "User Research"],
    wants: ["React.js", "Tailwind CSS"],
    category: "design",
    availability: "Flexible Weekends",
    experience: "5 years leading product design",
    bio: "I design complex design tokens and Figma libraries. Eager to understand how to turn them directly into clean React components."
  },
  {
    id: "3",
    name: "Arjun Mehta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: "AI & ML Engineer @ NeuralGrid",
    rating: 4.9,
    reviewsCount: 31,
    badge: "Top Rated",
    teaches: ["PyTorch", "Python", "LLM Prompting"],
    wants: ["SEO Strategy", "Product Growth"],
    category: "ai",
    availability: "Saturday & Sunday Afternoons",
    experience: "AI researcher turned applied engineer",
    bio: "Built custom transformer pipelines. Looking to learn customer acquisition and organic growth strategies for my AI open source project."
  },
  {
    id: "4",
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    role: "Growth Lead @ ScalePulse",
    rating: 4.88,
    reviewsCount: 29,
    badge: "Verified Mentor",
    teaches: ["Product Growth", "SEO Strategy", "Content Loops"],
    wants: ["Python", "Data Analysis"],
    category: "growth",
    availability: "Mon, Wed, Fri (After 6 PM)",
    experience: "Scaled 2 B2B SaaS apps past $1M ARR",
    bio: "I turn cold traffic into recurring product evangelists. Need Python scripting skills to automate my marketing pipelines."
  },
  {
    id: "5",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    role: "Lead Mobile Developer @ AppCraft",
    rating: 4.92,
    reviewsCount: 45,
    badge: "Super Peer",
    teaches: ["Flutter", "Dart", "iOS Swift"],
    wants: ["DaVinci Resolve", "Motion Design"],
    category: "engineering",
    availability: "Weekday Evenings (CET)",
    experience: "Published 10+ native and hybrid apps",
    bio: "Building buttery-smooth mobile applications. Wanting to learn pro motion graphics and video editing for product trailers."
  },
  {
    id: "6",
    name: "Carlos Gomez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    role: "Motion & 3D Artist @ PixelStudio",
    rating: 4.96,
    reviewsCount: 52,
    badge: "Top Rated",
    teaches: ["DaVinci Resolve", "Blender 3D", "After Effects"],
    wants: ["Flutter", "Spanish Fluency"],
    category: "media",
    availability: "Weekends & Evenings",
    experience: "7+ years visual storytelling and 3D modeling",
    bio: "Creating high-impact brand cinematics. Looking to turn my visual assets into interactive Flutter micro-apps."
  },
  {
    id: "7",
    name: "Maya Patel",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    role: "Cloud DevOps & Platform Engineer",
    rating: 4.89,
    reviewsCount: 26,
    badge: "Verified Mentor",
    teaches: ["Docker", "Kubernetes", "AWS Infrastructure"],
    wants: ["Public Speaking", "Technical Writing"],
    category: "engineering",
    availability: "Tue & Thu Evenings",
    experience: "Managing multi-region Kubernetes clusters",
    bio: "Infrastructure wrangler. Seeking to master technical storytelling and conference presentation delivery."
  },
  {
    id: "8",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    role: "Bilingual Tech Lead & Keynote Speaker",
    rating: 4.94,
    reviewsCount: 37,
    badge: "Super Peer",
    teaches: ["Public Speaking", "Executive Communication", "Korean"],
    wants: ["Docker", "AWS Infrastructure"],
    category: "languages",
    availability: "Saturdays 10:00 AM - 4:00 PM",
    experience: "Delivered 20+ international tech keynotes",
    bio: "Helping engineers speak with clarity and executive presence. Want to learn modern containerized cloud workflows."
  }
];

const POPULAR_SKILLS = [
  "React.js",
  "Figma",
  "Python",
  "UI/UX",
  "TypeScript",
  "PyTorch",
  "Video Editing",
  "Product Growth",
  "Blender 3D"
];

const SKILL_CATEGORIES = [
  {
    id: "all",
    name: "All Corridors",
    icon: Layers,
    count: "24,500+ Peers",
    color: "#6366f1"
  },
  {
    id: "engineering",
    name: "Code & Engineering",
    icon: Code,
    count: "8,420 Active",
    color: "#4f46e5",
    tags: ["React", "Python", "TypeScript", "Flutter", "Go"]
  },
  {
    id: "design",
    name: "UI/UX & Product Design",
    icon: Palette,
    count: "6,190 Active",
    color: "#8b5cf6",
    tags: ["Figma", "Design Systems", "User Research", "Wireframing"]
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    icon: Bot,
    count: "4,850 Active",
    color: "#0d9488",
    tags: ["PyTorch", "LLMs", "Prompting", "NLP", "Data Science"]
  },
  {
    id: "media",
    name: "Media & 3D Motion",
    icon: Video,
    count: "3,240 Active",
    color: "#f97316",
    tags: ["Blender", "DaVinci", "After Effects", "Sound Design"]
  },
  {
    id: "growth",
    name: "Growth & Product Strategy",
    icon: TrendingUp,
    count: "2,780 Active",
    color: "#ec4899",
    tags: ["SEO", "Conversion Rate", "Copywriting", "SaaS Growth"]
  },
  {
    id: "languages",
    name: "Languages & Speaking",
    icon: Globe,
    count: "2,410 Active",
    color: "#059669",
    tags: ["Public Speaking", "Spanish", "Japanese", "English"]
  }
];

const SIMULATION_PAIRS = [
  {
    pairTitle: "Frontend Architect ⇄ UX Design Lead",
    matchScore: 96,
    user1: {
      name: "Rahul Sharma",
      role: "Frontend Architect @ TechFlow",
      rating: "★ 4.9 (42 exchanges)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      teaches: ["React.js", "TypeScript", "Next.js"],
      wants: ["Figma Design Systems", "UI Prototyping"]
    },
    user2: {
      name: "Priya Kapoor",
      role: "Lead UX Designer @ AutoCreative",
      rating: "★ 4.95 (38 exchanges)",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      teaches: ["Figma Design Systems", "UI/UX", "User Research"],
      wants: ["React.js", "Tailwind CSS"]
    },
    scheduleNote: "Session Scheduled • Saturday 6:00 PM (IST)"
  },
  {
    pairTitle: "AI Researcher ⇄ SaaS Growth Lead",
    matchScore: 94,
    user1: {
      name: "Arjun Mehta",
      role: "AI & ML Engineer @ NeuralGrid",
      rating: "★ 4.9 (31 exchanges)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      teaches: ["PyTorch", "Python", "LLM Prompting"],
      wants: ["SEO Strategy", "Product Growth"]
    },
    user2: {
      name: "Sarah Jenkins",
      role: "Growth Lead @ ScalePulse",
      rating: "★ 4.88 (29 exchanges)",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      teaches: ["Product Growth", "SEO Strategy", "Content Loops"],
      wants: ["Python", "Data Analysis"]
    },
    scheduleNote: "Session Scheduled • Sunday 4:30 PM (EST)"
  },
  {
    pairTitle: "Mobile Developer ⇄ 3D Motion Artist",
    matchScore: 97,
    user1: {
      name: "Elena Rostova",
      role: "Lead Mobile Developer @ AppCraft",
      rating: "★ 4.92 (45 exchanges)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      teaches: ["Flutter", "Dart", "iOS Swift"],
      wants: ["DaVinci Resolve", "Motion Design"]
    },
    user2: {
      name: "Carlos Gomez",
      role: "Motion & 3D Artist @ PixelStudio",
      rating: "★ 4.96 (52 exchanges)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      teaches: ["DaVinci Resolve", "Blender 3D", "After Effects"],
      wants: ["Flutter", "Spanish Fluency"]
    },
    scheduleNote: "Session Scheduled • Thursday 7:00 PM (CET)"
  }
];

const FAQS = [
  {
    q: "Do I need to be a senior industry expert to teach on Skillor?",
    a: "Not at all! You only need to know something that someone else is trying to learn. A junior developer who mastered Git can easily mentor a beginner, while learning advanced React from a mid-level engineer. Skillor is built on reciprocal peer empowerment at every stage of craft."
  },
  {
    q: "Is Skillor truly 100% free? Are there hidden fees?",
    a: "Skillor is 100% free and peer-driven. It operates on a reciprocal timebank model: '1 hour taught = 1 hour learned'. You never pay for courses or tutoring. The currency is your own knowledge and willingness to share."
  },
  {
    q: "How do 1-on-1 learning sessions actually work?",
    a: "Once two peers agree to an exchange proposal, you can chat in your shared workspace, establish learning outcomes, and schedule sessions directly to your Google or Outlook calendar. You can meet using your favorite platform (Google Meet, Zoom) or our built-in interactive peer room."
  },
  {
    q: "What prevents someone from receiving teaching without giving back?",
    a: "Every member starts with initial trial exchange credits. After that, your ability to request new sessions depends on maintaining a balanced give-and-take ratio and high peer reliability scores. Unreliable members or no-shows lose matching privileges immediately."
  },
  {
    q: "Can I exchange multiple different skills at once?",
    a: "Yes! Your profile can showcase all the skills you can teach across multiple disciplines, as well as everything on your learning wishlist. Our smart matching algorithm computes synergy scores across all your skill combinations simultaneously."
  },
  {
    q: "How do I ensure the quality and safety of my learning partner?",
    a: "Every profile features verified community badges, star ratings from past sessions, real peer reviews, and GitHub/LinkedIn verification. You can review a partner's session history before accepting any exchange request."
  }
];

function Home() {

  const [learnInput, setLearnInput] = useState("Figma Design Systems");
  const [teachInput, setTeachInput] = useState("React.js");
  const [isSwapping, setIsSwapping] = useState(false);


  const [selectedCategory, setSelectedCategory] = useState("all");
  const [peerSearchQuery, setPeerSearchQuery] = useState("");

  const [activePairIndex, setActivePairIndex] = useState(0);


  const [calcTeach, setCalcTeach] = useState("React.js");
  const [calcLearn, setCalcLearn] = useState("Figma");


  const [openFaq, setOpenFaq] = useState(0);


  const [modalPeer, setModalPeer] = useState(null);
  const [proposeTeachSkill, setProposeTeachSkill] = useState("");
  const [proposeLearnSkill, setProposeLearnSkill] = useState("");
  const [proposeMessage, setProposeMessage] = useState("");
  const [preferredTime, setPreferredTime] = useState("Weekday Evenings");
  const [toastMessage, setToastMessage] = useState("");


  const handleSwap = (e) => {
    e.preventDefault();
    setIsSwapping(true);
    const temp = learnInput;
    setLearnInput(teachInput);
    setTeachInput(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };


  const handleTagClick = (tag, targetField) => {
    if (targetField === "learn") {
      setLearnInput(tag);
    } else {
      setTeachInput(tag);
    }
  };


  const filteredPeers = useMemo(() => {
    return INITIAL_PEERS.filter((peer) => {
      const matchesCategory =
        selectedCategory === "all" || peer.category === selectedCategory;
      const q = peerSearchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        peer.name.toLowerCase().includes(q) ||
        peer.role.toLowerCase().includes(q) ||
        peer.teaches.some((s) => s.toLowerCase().includes(q)) ||
        peer.wants.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, peerSearchQuery]);


  const handleOpenProposeModal = (peer) => {
    setModalPeer(peer);
    setProposeLearnSkill(peer.teaches[0] || "");
    setProposeTeachSkill(peer.wants[0] || teachInput || "React.js");
    setProposeMessage(
      `Hi ${peer.name.split(" ")[0]}! I'd love to learn ${
        peer.teaches[0] || "your skills"
      } from you. In exchange, I can teach you ${
        peer.wants[0] || teachInput || "my skills"
      }. Let me know if you're open for a 1-on-1 session!`
    );
  };


  const handleSubmitProposal = (e) => {
    e.preventDefault();
    const partnerName = modalPeer?.name || "Peer";
    setModalPeer(null);
    setToastMessage(`🎉 Exchange proposal successfully sent to ${partnerName}!`);
    setTimeout(() => {
      setToastMessage("");
    }, 5000);
  };


  const handleFindMatches = (e) => {
    e.preventDefault();
    const directorySection = document.getElementById("peer-showcase");
    if (directorySection) {
      directorySection.scrollIntoView({ behavior: "smooth" });
    }
    if (learnInput) {
      setPeerSearchQuery(learnInput);
    }
  };

  return (
    <div className="home-container" id="home-top">

      {toastMessage && (
        <div className="toast-banner" role="alert">
          <Sparkles size={18} className="toast-icon" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage("")}
            className="toast-close"
            aria-label="Close message"
          >
            <X size={16} />
          </button>
        </div>
      )}


      <section className="hero-section" aria-label="Hero Section">
        <div className="hero-inner">

          <div className="top-badge">
            <span className="live-ping">
              <span className="ping-dot"></span>
              <span className="ping-ring"></span>
            </span>
            <Sparkles size={14} className="badge-sparkle" />
            <span>Next-Gen Two-Way Skill Matching • 100% Free Peer Learning</span>
            <ArrowRight size={14} className="badge-arrow" />
          </div>


          <h1 className="hero-title">
            Learn a Skill. <span className="gradient-purple">Teach a Skill.</span>{" "}
            <span className="gradient-orange">Grow Together.</span>
          </h1>


          <p className="hero-subtitle">
            Exchange knowledge directly with verified peers who want to learn what
            you master. No $10,000 bootcamps or passive video libraries—just
            reciprocal, human-to-human craft mastery.
          </p>


          <form className="search-card" onSubmit={handleFindMatches} id="hero-match-form">

            <div className="search-field">
              <div className="field-label-row">
                <BookOpen size={16} className="field-icon teal-icon" />
                <label htmlFor="learn-input">I WANT TO LEARN</label>
              </div>
              <input
                id="learn-input"
                type="text"
                placeholder="e.g. Figma, React, Python, UI/UX"
                value={learnInput}
                onChange={(e) => setLearnInput(e.target.value)}
                autoComplete="off"
              />
            </div>


            <button
              type="button"
              id="swap-skills-btn"
              className={`swap-btn ${isSwapping ? "swapping" : ""}`}
              onClick={handleSwap}
              title="Swap skills: Teach ⇄ Learn"
              aria-label="Swap skills"
            >
              <ArrowLeftRight size={18} />
            </button>


            <div className="search-field">
              <div className="field-label-row">
                <BrainCog size={16} className="field-icon purple-icon" />
                <label htmlFor="teach-input">I CAN TEACH</label>
              </div>
              <input
                id="teach-input"
                type="text"
                placeholder="e.g. React.js, Video Editing, SQL"
                value={teachInput}
                onChange={(e) => setTeachInput(e.target.value)}
                autoComplete="off"
              />
            </div>


            <button type="submit" id="find-matches-btn" className="find-matches-btn">
              <span>Find Matches</span>
              <ArrowRight size={16} />
            </button>
          </form>


          <div className="quick-tags-container">
            <span className="quick-tags-label">Trending skills to explore:</span>
            <div className="quick-tags-list">
              {POPULAR_SKILLS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleTagClick(skill, "learn")}
                  className={`tag-chip ${learnInput === skill ? "tag-active" : ""}`}
                >
                  +{skill}
                </button>
              ))}
            </div>
          </div>


          <div className="trust-bar">
            <div className="trust-item">
              <Star className="trust-star" size={16} />
              <span>
                <strong>4.9 / 5</strong> from 12,800+ verified sessions
              </span>
            </div>
            <span className="trust-dot-sep">•</span>
            <div className="trust-item">
              <CircleCheck className="trust-check" size={16} />
              <span>
                <strong>100% Free</strong> Reciprocal Timebank
              </span>
            </div>
            <span className="trust-dot-sep">•</span>
            <div className="trust-item">
              <ShieldCheck className="trust-shield" size={16} />
              <span>Verified Portfolios & Reviews</span>
            </div>
          </div>
        </div>


        <div className="simulation-wrapper">
          <div className="sim-header-row">
            <div className="pair-switcher" role="tablist">
              {SIMULATION_PAIRS.map((pair, idx) => (
                <button
                  key={pair.pairTitle}
                  type="button"
                  role="tab"
                  aria-selected={activePairIndex === idx}
                  className={`pair-tab ${activePairIndex === idx ? "active" : ""}`}
                  onClick={() => setActivePairIndex(idx)}
                >
                  {pair.pairTitle}
                </button>
              ))}
            </div>
          </div>


          {(() => {
            const currentPair = SIMULATION_PAIRS[activePairIndex];
            return (
              <div className="sim-card-container">
                <div className="sim-grid">

                  <div className="sim-col">
                    <div className="sim-profile-header">
                      <div className="avatar-wrapper">
                        <img
                          src={currentPair.user1.avatar}
                          alt={currentPair.user1.name}
                          className="sim-avatar"
                        />
                        <span className="online-badge" title="Online now"></span>
                      </div>
                      <div className="sim-user-meta">
                        <div className="sim-name-row">
                          <h3 className="sim-name">{currentPair.user1.name}</h3>
                          <CheckCircle size={15} className="verified-badge" />
                        </div>
                        <span className="sim-role">{currentPair.user1.role}</span>
                        <span className="sim-rating">{currentPair.user1.rating}</span>
                      </div>
                    </div>

                    <div className="sim-skill-block">
                      <span className="skill-label label-teaches">TEACHES</span>
                      <div className="chips-row">
                        {currentPair.user1.teaches.map((skill) => (
                          <span key={skill} className="sim-chip chip-purple">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="sim-skill-block">
                      <span className="skill-label label-wants">WANTS TO LEARN</span>
                      <div className="chips-row">
                        {currentPair.user1.wants.map((skill) => (
                          <span key={skill} className="sim-chip chip-teal">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>


                  <div className="sim-center-hub">
                    <div className="match-circle-pulse">
                      <div className="match-circle">
                        <span className="match-score">{currentPair.matchScore}%</span>
                        <span className="match-label">MATCH</span>
                      </div>
                    </div>
                    <div className="match-tag">
                      <ArrowLeftRight size={14} />
                      <span>Two-Way Exchange</span>
                    </div>
                    <span className="synergy-note">High Skill Complementarity</span>
                  </div>


                  <div className="sim-col">
                    <div className="sim-profile-header">
                      <div className="avatar-wrapper">
                        <img
                          src={currentPair.user2.avatar}
                          alt={currentPair.user2.name}
                          className="sim-avatar"
                        />
                        <span className="online-badge" title="Online now"></span>
                      </div>
                      <div className="sim-user-meta">
                        <div className="sim-name-row">
                          <h3 className="sim-name">{currentPair.user2.name}</h3>
                          <CheckCircle size={15} className="verified-badge" />
                        </div>
                        <span className="sim-role">{currentPair.user2.role}</span>
                        <span className="sim-rating">{currentPair.user2.rating}</span>
                      </div>
                    </div>

                    <div className="sim-skill-block">
                      <span className="skill-label label-teaches">TEACHES</span>
                      <div className="chips-row">
                        {currentPair.user2.teaches.map((skill) => (
                          <span key={skill} className="sim-chip chip-purple">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="sim-skill-block">
                      <span className="skill-label label-wants">WANTS TO LEARN</span>
                      <div className="chips-row">
                        {currentPair.user2.wants.map((skill) => (
                          <span key={skill} className="sim-chip chip-teal">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>


                <div className="sim-footer">
                  <div className="sim-footer-status">
                    <CalendarCheck size={16} className="calendar-icon" />
                    <span>{currentPair.scheduleNote}</span>
                  </div>
                  <div className="sim-footer-actions">
                    <button
                      type="button"
                      className="sim-action-btn secondary"
                      onClick={() =>
                        setActivePairIndex(
                          (prev) => (prev + 1) % SIMULATION_PAIRS.length
                        )
                      }
                    >
                      <RefreshCw size={14} />
                      <span>Next Match Sample</span>
                    </button>
                    <button
                      type="button"
                      className="sim-action-btn primary"
                      onClick={() => {
                        handleOpenProposeModal(INITIAL_PEERS[activePairIndex % 3]);
                      }}
                    >
                      <span>Propose Similar Exchange</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <section className="stats-section" aria-label="Platform Statistics">
        <div className="stats-inner">
          <div className="stat-box">
            <span className="stat-number">24,800+</span>
            <span className="stat-title">Active Peer Learners</span>
            <span className="stat-desc">Across 68 countries</span>
          </div>

          <div className="stat-box-divider"></div>

          <div className="stat-box">
            <span className="stat-number">150+</span>
            <span className="stat-title">Skill Disciplines</span>
            <span className="stat-desc">Tech, Design, AI, Media & Languages</span>
          </div>

          <div className="stat-box-divider"></div>

          <div className="stat-box highlight">
            <span className="stat-number">$0.00</span>
            <span className="stat-title">Tuition & Debt Incurred</span>
            <span className="stat-desc">100% Reciprocal Timebank</span>
          </div>

          <div className="stat-box-divider"></div>

          <div className="stat-box">
            <span className="stat-number">98.4%</span>
            <span className="stat-title">Satisfaction Rating</span>
            <span className="stat-desc">Over 45,000+ hours completed</span>
          </div>
        </div>


        <div className="live-ticker-container">
          <span className="ticker-label">
            <span className="ticker-pulse"></span> LIVE EXCHANGES:
          </span>
          <div className="ticker-track">
            <div className="ticker-content">
              <span className="ticker-item">
                🔥 <strong>Elena (Berlin)</strong> just paired with <strong>Hiroshi (Tokyo)</strong> for Python ⇄ Japanese
              </span>
              <span className="ticker-item">
                ⚡ <strong>Marcus</strong> completed a 2hr Figma ⇄ Next.js session with <strong>Devika</strong>
              </span>
              <span className="ticker-item">
                ✨ <strong>Arjun</strong> scheduled an AI Prompting ⇄ SEO session with <strong>Sarah</strong>
              </span>
              <span className="ticker-item">
                🎯 <strong>Carlos</strong> approved an exchange request for Blender 3D ⇄ Flutter
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section" id="how-it-works" aria-label="How Skillor Works">
        <div className="section-head">
          <span className="section-tag">THE RECIPROCAL BLUEPRINT</span>
          <h2 className="section-title">How Peer Skill Exchange Works</h2>
          <p className="section-subtitle">
            Say goodbye to passive one-way tutorials. Skillor pairs you with an ambitious
            partner where teaching is the ultimate catalyst for deep mastery.
          </p>
        </div>

        <div className="steps-grid">

          <div className="step-card">
            <div className="step-header">
              <span className="step-num">01</span>
              <div className="step-icon-box purple">
                <BrainCog size={24} />
              </div>
            </div>
            <h3 className="step-title">List Your Dual Profile</h3>
            <p className="step-desc">
              Tell us what you can teach and what you are hungry to master. Add your
              current proficiency level, weekly availability, and learning objectives.
            </p>
            <div className="step-pill-row">
              <span className="mini-chip purple">Can Teach: Python</span>
              <span className="mini-chip teal">Wants: Figma</span>
            </div>
          </div>


          <div className="step-card">
            <div className="step-header">
              <span className="step-num">02</span>
              <div className="step-icon-box orange">
                <Zap size={24} />
              </div>
            </div>
            <h3 className="step-title">Two-Way Algorithmic Fit</h3>
            <p className="step-desc">
              Our synergy engine evaluates mutual requirements, matching you with peers
              who want what you teach and possess the exact expertise you desire.
            </p>
            <div className="step-pill-row">
              <span className="mini-chip green">96% Mutual Fit</span>
              <span className="mini-chip orange">Zero Tuition</span>
            </div>
          </div>


          <div className="step-card">
            <div className="step-header">
              <span className="step-num">03</span>
              <div className="step-icon-box teal">
                <CalendarCheck size={24} />
              </div>
            </div>
            <h3 className="step-title">Chat & Lock In Sessions</h3>
            <p className="step-desc">
              Discuss session agendas in your encrypted channel, sync calendars, and
              meet in dedicated 1-on-1 video rooms with screen sharing and code collab.
            </p>
            <div className="step-pill-row">
              <span className="mini-chip teal">Integrated Video</span>
              <span className="mini-chip purple">Calendar Sync</span>
            </div>
          </div>


          <div className="step-card">
            <div className="step-header">
              <span className="step-num">04</span>
              <div className="step-icon-box green">
                <Award size={24} />
              </div>
            </div>
            <h3 className="step-title">Earn Badges & Elevate</h3>
            <p className="step-desc">
              Complete reciprocal hours to earn verified peer endorsements, build an
              indisputable portfolio of skills, and climb community mentor tiers.
            </p>
            <div className="step-pill-row">
              <span className="mini-chip green">Verified Review</span>
              <span className="mini-chip orange">Feynman Mastery</span>
            </div>
          </div>
        </div>
      </section>


      <section className="categories-section" id="explore-skills" aria-label="Explore Skill Categories">
        <div className="section-head">
          <span className="section-tag">SKILL CORRIDORS</span>
          <h2 className="section-title">Explore Active Disciplines</h2>
          <p className="section-subtitle">
            From modern full-stack development to visual storytelling, find the exact
            complementary skill trade that supercharges your career.
          </p>
        </div>


        <div className="categories-nav">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const directoryEl = document.getElementById("peer-showcase");
                  if (directoryEl) {
                    directoryEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Icon size={16} />
                <span>{cat.name}</span>
                <span className="cat-count">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </section>


      <section className="showcase-section" id="peer-showcase" aria-label="Peer Directory">
        <div className="section-head-split">
          <div>
            <span className="section-tag">COMMUNITY PEERS READY NOW</span>
            <h2 className="section-title">Verified Members Ready to Exchange</h2>
            <p className="section-subtitle">
              Browse real members actively seeking complementary learning partners this week.
            </p>
          </div>


          <div className="showcase-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search peer by skill, name, or role..."
              value={peerSearchQuery}
              onChange={(e) => setPeerSearchQuery(e.target.value)}
            />
            {peerSearchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setPeerSearchQuery("")}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>


        <div className="peers-grid">
          {filteredPeers.length > 0 ? (
            filteredPeers.map((peer) => (
              <div key={peer.id} className="peer-card">

                <div className="peer-card-top">
                  <div className="peer-avatar-meta">
                    <img src={peer.avatar} alt={peer.name} className="peer-img" />
                    <div>
                      <div className="peer-name-line">
                        <h3 className="peer-card-name">{peer.name}</h3>
                        <CheckCircle size={14} className="verified-check orange" />
                      </div>
                      <span className="peer-role-text">{peer.role}</span>
                    </div>
                  </div>

                  <span className="peer-badge-tag">{peer.badge}</span>
                </div>

                <p className="peer-bio">{peer.bio}</p>


                <div className="peer-exchange-spec">
                  <div className="spec-row">
                    <span className="spec-label purple-text">TEACHES</span>
                    <div className="spec-chips">
                      {peer.teaches.map((skill) => (
                        <span key={skill} className="chip purple">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label teal-text">WANTS TO LEARN</span>
                    <div className="spec-chips">
                      {peer.wants.map((skill) => (
                        <span key={skill} className="chip teal">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>


                <div className="peer-meta-footer">
                  <div className="peer-rating-pill">
                    <Star size={13} className="star-icon" />
                    <span>
                      <strong>{peer.rating}</strong> ({peer.reviewsCount} reviews)
                    </span>
                  </div>

                  <div className="peer-availability">
                    <Clock size={13} />
                    <span>{peer.availability}</span>
                  </div>
                </div>


                <button
                  type="button"
                  className="propose-btn"
                  onClick={() => handleOpenProposeModal(peer)}
                >
                  <span>Propose Skill Exchange</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))
          ) : (
            <div className="empty-search-state">
              <BrainCog size={48} className="empty-icon" />
              <h3>No matching peers found</h3>
              <p>Try searching for a different skill or clear your search filter.</p>
              <button
                type="button"
                className="reset-filter-btn"
                onClick={() => {
                  setPeerSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>


      <section className="comparison-section" aria-label="Comparison Matrix">
        <div className="section-head">
          <span className="section-tag">WHY RECIPROCAL LEARNING WINS</span>
          <h2 className="section-title">Traditional Courses vs. Skillor</h2>
          <p className="section-subtitle">
            Discover why peer-to-peer knowledge exchange produces faster mastery and
            lifelong professional relationships.
          </p>
        </div>

        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-col">Learning Dimension</th>
                <th className="bootcamp-col">Expensive Bootcamps & Courses</th>
                <th className="skillor-col">
                  <div className="th-skillor">
                    <Sparkles size={16} />
                    <span>Skillor Peer Exchange</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-cell">Financial Cost</td>
                <td className="bad-cell">$5,000 – $25,000+ tuition</td>
                <td className="good-cell">
                  <Check size={16} className="good-icon" />
                  <strong>$0 (100% Free peer timebank)</strong>
                </td>
              </tr>
              <tr>
                <td className="feature-cell">Learning Format</td>
                <td className="bad-cell">Passive, pre-recorded mass videos</td>
                <td className="good-cell">
                  <Check size={16} className="good-icon" />
                  <strong>1-on-1 personalized live dialogue</strong>
                </td>
              </tr>
              <tr>
                <td className="feature-cell">Accountability & Completion</td>
                <td className="bad-cell">12–15% average completion rate</td>
                <td className="good-cell">
                  <Check size={16} className="good-icon" />
                  <strong>91% completion via mutual commitment</strong>
                </td>
              </tr>
              <tr>
                <td className="feature-cell">The Feynman Learning Effect</td>
                <td className="bad-cell">Zero teaching; forget material in weeks</td>
                <td className="good-cell">
                  <Check size={16} className="good-icon" />
                  <strong>Master deeply by explaining to someone else</strong>
                </td>
              </tr>
              <tr>
                <td className="feature-cell">Professional Network</td>
                <td className="bad-cell">Impersonal Slack channels with 5,000 lurkers</td>
                <td className="good-cell">
                  <Check size={16} className="good-icon" />
                  <strong>Lifelong allies across top tech & creative hubs</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>


      <section className="calculator-section" aria-label="Skill Synergy Calculator">
        <div className="calc-card">
          <div className="calc-left">
            <span className="section-tag light">INSTANT FIT ESTIMATOR</span>
            <h2 className="calc-title">Test Your Skill Exchange Synergy</h2>
            <p className="calc-desc">
              Select what you teach and what you want to learn to instantly calculate
              your ecosystem compatibility score and estimate current active peer partners.
            </p>

            <div className="calc-inputs">
              <div className="calc-input-block">
                <label htmlFor="calc-teach-input">Skill I Can Share:</label>
                <select
                  id="calc-teach-input"
                  value={calcTeach}
                  onChange={(e) => setCalcTeach(e.target.value)}
                >
                  <option value="React.js">React.js / Frontend</option>
                  <option value="Python">Python / Backend</option>
                  <option value="Figma">Figma / Design Systems</option>
                  <option value="PyTorch">PyTorch / AI Engineering</option>
                  <option value="Video Editing">Video Editing / DaVinci</option>
                  <option value="SEO Strategy">SEO & Product Growth</option>
                  <option value="Public Speaking">Public Speaking</option>
                </select>
              </div>

              <div className="calc-input-block">
                <label htmlFor="calc-learn-input">Skill I Want in Return:</label>
                <select
                  id="calc-learn-input"
                  value={calcLearn}
                  onChange={(e) => setCalcLearn(e.target.value)}
                >
                  <option value="Figma">Figma / UI Design</option>
                  <option value="React.js">React.js / Web Dev</option>
                  <option value="Python">Python / Machine Learning</option>
                  <option value="Blender 3D">Blender 3D / Animation</option>
                  <option value="Public Speaking">Executive Communication</option>
                  <option value="Product Growth">Product Growth / SaaS</option>
                </select>
              </div>
            </div>
          </div>

          <div className="calc-right">
            <div className="score-meter">
              <div className="score-circle">
                <span className="score-num">98%</span>
                <span className="score-label">SYNERGY SCORE</span>
              </div>
            </div>

            <div className="calc-metrics">
              <div className="metric-row">
                <Users size={16} />
                <span>
                  <strong>38 Active Peers</strong> ready in this corridor
                </span>
              </div>
              <div className="metric-row">
                <Clock size={16} />
                <span>
                  <strong>~18 mins</strong> average time to first session match
                </span>
              </div>
              <div className="metric-row">
                <ShieldCheck size={16} />
                <span>
                  <strong>Verified</strong> safety & community guidelines
                </span>
              </div>
            </div>

            <button
              type="button"
              className="calc-cta-btn"
              onClick={() => {
                const formEl = document.getElementById("hero-match-form");
                if (formEl) {
                  formEl.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span>Match for {calcTeach} ⇄ {calcLearn}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>


      <section className="testimonials-section" aria-label="Member Stories">
        <div className="section-head">
          <span className="section-tag">PROVEN IMPACT</span>
          <h2 className="section-title">Real Learners. Real Outcomes.</h2>
          <p className="section-subtitle">
            See how makers and engineers leveled up their careers without spending a dime.
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="story-card">
            <div className="story-stars">
              {"★".repeat(5)}
            </div>
            <p className="story-quote">
              “I traded 6 weeks of Figma design tokens with a senior developer who taught me
              React & Next.js from scratch. Within 3 months, I transitioned from graphic
              designer to full Product Designer with a 40% salary jump!”
            </p>
            <div className="story-author">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Marcus K."
                className="author-avatar"
              />
              <div>
                <h3 className="author-name">Marcus K.</h3>
                <span className="author-role">Product Designer @ FinCraft</span>
                <span className="author-exchange">Figma ⇄ Next.js</span>
              </div>
            </div>
          </div>

          <div className="story-card">
            <div className="story-stars">
              {"★".repeat(5)}
            </div>
            <p className="story-quote">
              “I was intimidated by deep learning math and couldn’t afford $12k for an AI
              bootcamp. Through Skillor, I taught Python & SQL to a researcher who coached me
              through PyTorch step-by-step. Unbelievable experience.”
            </p>
            <div className="story-author">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Aisha Patel"
                className="author-avatar"
              />
              <div>
                <h3 className="author-name">Aisha Patel</h3>
                <span className="author-role">Data Analyst @ BioTech Lab</span>
                <span className="author-exchange">Python ⇄ PyTorch AI</span>
              </div>
            </div>
          </div>

          <div className="story-card">
            <div className="story-stars">
              {"★".repeat(5)}
            </div>
            <p className="story-quote">
              “Teaching video editing forced me to truly synthesize my own techniques (the
              Feynman technique in action!). In exchange, my partner helped me master 3D
              Blender. Our agency now offers full 3D services for zero cost!”
            </p>
            <div className="story-author">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                alt="Leo Santos"
                className="author-avatar"
              />
              <div>
                <h3 className="author-name">Leo Santos</h3>
                <span className="author-role">Creative Director @ Apex Media</span>
                <span className="author-exchange">Premiere ⇄ Blender 3D</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="faq-section" id="faq" aria-label="Frequently Asked Questions">
        <div className="section-head">
          <span className="section-tag">HAVE QUESTIONS?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about two-way matching, session scheduling, and safety.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className={`faq-item ${isOpen ? "open" : ""}`}
                onClick={() => setOpenFaq(isOpen ? -1 : index)}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-toggle-icon">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer-block">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      <section className="cta-banner-section" aria-label="Call to Action">
        <div className="cta-banner-inner">
          <div className="cta-glow-orb-1"></div>
          <div className="cta-glow-orb-2"></div>

          <div className="cta-content">
            <span className="cta-badge">JOIN THE MOVEMENT</span>
            <h2 className="cta-heading">
              Stop Paying for Courses. <br />
              Start Trading Your Superpowers.
            </h2>
            <p className="cta-sub">
              Join 24,000+ ambitious developers, designers, and creators leveling up
              together through reciprocal 1-on-1 peer exchange.
            </p>

            <div className="cta-btn-row">
              <button
                type="button"
                className="cta-primary-btn"
                onClick={() => {
                  if (setActivePage) {
                    setActivePage("dashboard");
                  }
                }}
              >
                <span>Get Started — It’s Free Forever</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="cta-secondary-btn"
                onClick={() => {
                  const exploreEl = document.getElementById("explore-skills");
                  if (exploreEl) {
                    exploreEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Search size={16} />
                <span>Explore All Corridors</span>
              </button>
            </div>

            <div className="cta-perks-row">
              <span className="perk-item">
                <Check size={14} className="perk-check" /> No credit card required
              </span>
              <span className="perk-item">
                <Check size={14} className="perk-check" /> Setup in 60 seconds
              </span>
              <span className="perk-item">
                <Check size={14} className="perk-check" /> Free reciprocal timebank
              </span>
            </div>
          </div>
        </div>
      </section>


      {modalPeer && (
        <div
          className="modal-backdrop"
          onClick={() => setModalPeer(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-peer-preview">
                <img
                  src={modalPeer.avatar}
                  alt={modalPeer.name}
                  className="modal-avatar"
                />
                <div>
                  <h3 className="modal-title">
                    Propose Exchange with {modalPeer.name}
                  </h3>
                  <span className="modal-subtitle">{modalPeer.role}</span>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalPeer(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitProposal} className="modal-form">

              <div className="modal-field">
                <label htmlFor="modal-learn-skill">
                  Skill you want to learn from {modalPeer.name.split(" ")[0]}:
                </label>
                <select
                  id="modal-learn-skill"
                  value={proposeLearnSkill}
                  onChange={(e) => setProposeLearnSkill(e.target.value)}
                  required
                >
                  {modalPeer.teaches.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>


              <div className="modal-field">
                <label htmlFor="modal-teach-skill">
                  Skill you will teach {modalPeer.name.split(" ")[0]} in return:
                </label>
                <input
                  id="modal-teach-skill"
                  type="text"
                  placeholder="e.g. React.js, Python, Video Editing..."
                  value={proposeTeachSkill}
                  onChange={(e) => setProposeTeachSkill(e.target.value)}
                  required
                />
                <span className="modal-hint">
                  Peer wants: {modalPeer.wants.join(", ")}
                </span>
              </div>


              <div className="modal-field">
                <label htmlFor="modal-time-pref">Preferred Session Timeframe:</label>
                <select
                  id="modal-time-pref"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                >
                  <option value="Weekday Evenings">Weekday Evenings</option>
                  <option value="Weekend Mornings">Weekend Mornings</option>
                  <option value="Weekend Afternoons">Weekend Afternoons</option>
                  <option value="Flexible / Asynchronous Planning">Flexible / Discuss via Chat</option>
                </select>
              </div>


              <div className="modal-field">
                <label htmlFor="modal-message">Introduction & Exchange Goals:</label>
                <textarea
                  id="modal-message"
                  rows={3}
                  value={proposeMessage}
                  onChange={(e) => setProposeMessage(e.target.value)}
                  placeholder="Introduce yourself and describe what projects or outcomes you want to achieve together..."
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setModalPeer(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  <Send size={15} />
                  <span>Send Exchange Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;