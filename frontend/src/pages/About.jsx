import { useState } from "react";
import {
  Flame,
  Sparkles,
  ArrowRight,
  ChevronDown,
  XCircle,
  CheckCircle2,
  Zap,
  Star,
  Layers,
  ShieldCheck,
  HandHeart,
  Scale,
  Globe,
  Users,
  Award,
  ArrowLeftRight,
  Cpu,
  Compass,
  Check,
  X
} from "lucide-react";
import "./About.css";
import narendarImg from "../members/Narendar.png";
import krishAchraImg from "../members/Krish_achra.png";
import krishSinglaImg from "../members/Krish_sigla.png";
import lakshayImg from "../members/Lakshay.png";

const MATCH_SCENARIOS = [
  {
    id: "elena-marcus",
    tabLabel: "Swift ⇄ UI Design",
    matchRate: "99.4%",
    peerA: {
      name: "Elena R.",
      role: "iOS Tech Lead @ Uber • Berlin",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
      rating: "4.97",
      trades: "48 trades",
      badge: "Verified Mentor",
      teaches: ["Swift & SwiftUI", "System Arch."],
      wants: ["Figma Design Systems", "Micro-Interactions"],
      status: "Active Today • 18 Trades"
    },
    peerB: {
      name: "Marcus V.",
      role: "Principal Designer @ Stripe • Copenhagen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
      rating: "4.99",
      trades: "64 trades",
      badge: "Super Peer",
      teaches: ["UI Design Systems", "Motion Graphic"],
      wants: ["Swift & SwiftUI", "Backend Basics"],
      status: "Active Today • 24 Trades"
    },
    reciprocalNote: "Engine Matches: Elena wants UI Design + Marcus teaches UI Design. Elena teaches Swift + Marcus wants iOS!"
  },
  {
    id: "sarah-arjun",
    tabLabel: "Growth Strategy ⇄ PyTorch AI",
    matchRate: "98.8%",
    peerA: {
      name: "Sarah J.",
      role: "Growth Lead @ ScalePulse • Austin",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80",
      rating: "4.92",
      trades: "39 trades",
      badge: "Verified Mentor",
      teaches: ["Product Growth", "SEO Strategy"],
      wants: ["Python for Data", "LLM Prompting"],
      status: "Active Today • 15 Trades"
    },
    peerB: {
      name: "Arjun M.",
      role: "AI & ML Engineer @ NeuralGrid • Bengaluru",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
      rating: "4.95",
      trades: "52 trades",
      badge: "Top Rated",
      teaches: ["PyTorch & AI", "Python Scripting"],
      wants: ["B2B Acquisition", "Product Growth"],
      status: "Active Today • 31 Trades"
    },
    reciprocalNote: "Engine Matches: Sarah wants AI automation + Arjun teaches PyTorch. Arjun wants user acquisition + Sarah teaches Growth Loops!"
  },
  {
    id: "priya-rahul",
    tabLabel: "Figma Systems ⇄ React Architecture",
    matchRate: "99.2%",
    peerA: {
      name: "Priya K.",
      role: "Lead UX Architect @ DesignLabs • Mumbai",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
      rating: "4.96",
      trades: "41 trades",
      badge: "Super Peer",
      teaches: ["Design Tokens", "Figma Auto-Layout"],
      wants: ["React Component Arch", "Next.js 15"],
      status: "Active Today • 22 Trades"
    },
    peerB: {
      name: "Rahul S.",
      role: "Staff Frontend Architect @ CloudScale • London",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
      rating: "4.98",
      trades: "58 trades",
      badge: "Verified Mentor",
      teaches: ["React.js & Next.js", "State Architecture"],
      wants: ["Design Systems", "UX Research"],
      status: "Active Today • 29 Trades"
    },
    reciprocalNote: "Engine Matches: Priya teaches Figma Tokens + Rahul wants Design Systems. Rahul teaches Next.js + Priya wants React!"
  }
];

const FOUNDERS = [
  {
    id: 1,
    name: "Narendar Kumar",
    role: "Full-Stack Developer",
    image: narendarImg,
    bio: "Passionate about building intuitive interfaces, performant full-stack architectures, and creating meaningful digital experiences.",
    github: "https://github.com/narendar9888",
    linkedin: "https://www.linkedin.com/in/narendar007/",
  },
  {
    id: 2,
    name: "Krish Achra",
    role: "Full-Stack Developer",
    image: krishAchraImg,
    bio: "Enjoys turning ideas into functional applications with clean code, modern dashboards, and thoughtful design.",
    github: "https://github.com/krishachra",
    linkedin: "https://www.linkedin.com/in/krishachra/",
  },
  {
    id: 3,
    name: "Krish Singla",
    role: "Full-Stack Developer",
    image: krishSinglaImg,
    bio: "Interested in backend systems, database architecture, and building reliable peer-to-peer web applications.",
    github: "https://github.com/KrishSingla575",
    linkedin: "https://www.linkedin.com/in/krish-singla575/",
  },
  {
    id: 4,
    name: "Lakshay",
    role: "Full-Stack Developer",
    image: lakshayImg,
    bio: "Focused on solving problems, learning new technologies, building collaborative products, and smart matching systems.",
    github: "https://github.com/lakshay-munjal-x",
    linkedin: "https://www.linkedin.com/in/lakshay-munjal-24a07637a/",
  },
];



const PRINCIPLES = [
  {
    id: "access",
    icon: HandHeart,
    colorClass: "about-card-orange",
    title: "Radical Accessibility",
    description:
      "We believe upfront tuition is an archaic gatekeeper to human dignity and economic mobility. Anyone who can communicate a craft deserves access to learning without financial penalty.",
    actionText: "READ OUR ACCESS PLEDGE →",
    modalContent: {
      headline: "Our Radical Access Pledge",
      points: [
        "Knowledge should be earned through effort, curiosity, and reciprocity—never financial leverage.",
        "Zero paywalls for fundamental skill matching or direct peer communication.",
        "Global parity: A 1-hour skill session in Nairobi carries the exact same reciprocal value as 1 hour in New York.",
        "Lifelong free tier commitment backed by our community constitution."
      ]
    }
  },
  {
    id: "respect",
    icon: Scale,
    colorClass: "about-card-purple",
    title: "Mutual Respect",
    description:
      "Both parties come as equals. The 10-year veteran learning prompt engineering is as humble as the junior designer teaching Figma autolayout. Everyone is a learner here.",
    actionText: "EXPLORE THE PEER ETHOS →",
    modalContent: {
      headline: "The Peer Ethos of Equals",
      points: [
        "Titles and seniority are left at the door; curiosity and humility lead the exchange.",
        "Both master and apprentice commit equal preparation, promptness, and focus.",
        "Constructive critique is delivered with kindness, empathy, and actionable guidance.",
        "Every craft—from low-level systems programming to storytelling—holds intrinsic dignity."
      ]
    }
  },
  {
    id: "accountability",
    icon: Zap,
    colorClass: "about-card-teal",
    title: "High Accountability",
    description:
      "Reciprocal learning works because both players have real skin in the game. Miss a session, and you hold your partner back. Show up prepared, and you accelerate together.",
    actionText: "LEARN TRUST ARCHITECTURE →",
    modalContent: {
      headline: "Our High-Accountability Architecture",
      points: [
        "Bilateral commitment contracts prevent ghosting and ensure scheduled time is respected.",
        "Verified trust scores reward dependable peers with priority discovery and elite badges.",
        "Automated session notes and structured milestone roadmaps keep learning on track.",
        "Mutual feedback at the end of each session builds your verified peer reputation."
      ]
    }
  },
  {
    id: "synergy",
    icon: Globe,
    colorClass: "about-card-rose",
    title: "Global Peer Synergy",
    description:
      "Breaking geographical barriers by matching partners across 60+ countries. Experience varied perspectives, cultural insights, and diverse approaches to problem-solving.",
    actionText: "VIEW COMMUNITY REACH →",
    modalContent: {
      headline: "Global Peer Synergy & Reach",
      points: [
        "Over 14,200 peer trades conducted across North America, Europe, Asia, Latin America, and Africa.",
        "Timezone-intelligent coordination tools make cross-border learning friction-free.",
        "Cross-cultural learning unlocks unique perspectives on design, engineering, and problem-solving.",
        "A truly global knowledge commons where borders do not restrict potential."
      ]
    }
  }
];

function About({ setActivePage }) {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [activeModalPrinciple, setActiveModalPrinciple] = useState(null);
  const [pulseActive, setPulseActive] = useState(false);

  const currentScenario = MATCH_SCENARIOS[activeScenarioIndex];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSimulateTrade = () => {
    setPulseActive(true);
    setTimeout(() => {
      setPulseActive(false);
    }, 1800);
  };

  const handleStartSwapping = () => {
    if (setActivePage) {
      setActivePage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="about-page">
      <section className="about-hero-section">
        <div className="about-hero-inner">
          <div className="about-manifesto-badge">
            <span className="about-badge-icon-wrap">
              <Flame size={13} className="about-badge-flame-icon" />
            </span>
            <span className="about-badge-text">
              Skillor Manifesto • Our Story • The Radical Architecture of Skillor
            </span>
          </div>

          <h1 className="about-hero-title">
            Democratizing Education <br />
            Through <span className="about-gradient-text">True Reciprocity.</span>
          </h1>

          <p className="about-hero-description">
            Traditional education is a one-directional, extortionately priced experience, and it's stalling.
            Skillor transforms learning into a peer-driven, human-to-human barter economy where everyone
            is both a master and an apprentice. Zero dollars exchanged. 100% mutual commitment.
          </p>

          <div className="about-hero-actions">
            <button
              className="about-btn-primary"
              onClick={() => scrollToSection("founding-philosophy")}
            >
              <span>Read Our Founding Philosophy</span>
              <ArrowRight size={17} className="about-btn-icon-right" />
            </button>

            <button
              className="about-btn-secondary"
              onClick={() => scrollToSection("core-founders")}
            >
              <span>Meet Our Core Founders</span>
              <ChevronDown size={17} className="about-btn-icon-down" />
            </button>
          </div>

          <div className="about-stats-grid">
            <div className="about-stat-card about-stat-orange">
              <div className="about-stat-number">14,200+</div>
              <div className="about-stat-label">Peer Skill Trades</div>
              <div className="about-stat-subtext">Executed across 5 continents with 0 friction</div>
            </div>

            <div className="about-stat-card about-stat-green">
              <div className="about-stat-number">$0</div>
              <div className="about-stat-label">Tuition / Bank Deductions</div>
              <div className="about-stat-subtext">Democratized knowledge access forever</div>
            </div>

            <div className="about-stat-card about-stat-purple">
              <div className="about-stat-number">98.6%</div>
              <div className="about-stat-label">Mutual Satisfaction</div>
              <div className="about-stat-subtext">Ranked 5 stars on reciprocal interactions</div>
            </div>

            <div className="about-stat-card about-stat-cyan">
              <div className="about-stat-number">52+</div>
              <div className="about-stat-label">Skill Disciplines</div>
              <div className="about-stat-subtext">From AI and code to UI/UX and brand design</div>
            </div>
          </div>
        </div>
      </section>

      <section id="founding-philosophy" className="about-landscape-section">
        <div className="about-section-container">
          <div className="about-section-badge-wrapper">
            <div className="about-section-purple-badge">
              <Sparkles size={13} className="about-sparkle-icon" />
              <span>Our Assessment of the Educational Landscape</span>
            </div>
          </div>

          <h2 className="about-section-title">
            Two Divergent Realities in Modern Skill Growth
          </h2>
          <p className="about-section-subtitle">
            Knowledge transfer should not feel like a commercial transaction. Here's why the old
            paradigm is failing and how Skillor reimagines it.
          </p>

          <div className="about-landscape-comparison-grid">
            <div className="about-landscape-card about-card-old-paradigm">
              <div className="about-landscape-card-header">
                <span className="about-landscape-pill about-pill-old">THE OLD PARADIGM</span>
                <span className="about-landscape-status-icon about-icon-danger">
                  <XCircle size={18} />
                </span>
              </div>

              <h3 className="about-landscape-card-title">
                Why Traditional Learning Fails Modern Learners
              </h3>
              <p className="about-landscape-card-desc">
                For decades, acquiring practical digital skills has meant paying astronomical fees to watch
                pre-recorded content or begging for brief coffee chats with zero promise of feedback.
              </p>

              <div className="about-landscape-points-list">
                <div className="about-landscape-point-item">
                  <div className="about-point-number-badge about-badge-red">1</div>
                  <div className="about-point-content">
                    <h4 className="about-point-title">$10,000+ Bootcamps</h4>
                    <p className="about-point-desc">
                      Extortionate tuition models that saddle developers and designers with debt before their first role.
                    </p>
                  </div>
                </div>

                <div className="about-landscape-point-item">
                  <div className="about-point-number-badge about-badge-red">2</div>
                  <div className="about-point-content">
                    <h4 className="about-point-title">150 Passive Videos Dropped</h4>
                    <p className="about-point-desc">
                      Static courses lock learners in a feedback vacuum with zero active context and incomplete mentoring.
                    </p>
                  </div>
                </div>

                <div className="about-landscape-point-item">
                  <div className="about-point-number-badge about-badge-red">3</div>
                  <div className="about-point-content">
                    <h4 className="about-point-title">One-Directional Tutoring</h4>
                    <p className="about-point-desc">
                      Paid tutors treat it like billable hours instead of mutual mastery and true empathy.
                    </p>
                  </div>
                </div>

                <div className="about-landscape-point-item">
                  <div className="about-point-number-badge about-badge-red">4</div>
                  <div className="about-point-content">
                    <h4 className="about-point-title">Zero Interpersonal Connection</h4>
                    <p className="about-point-desc">
                      Studying alone without fellow peers reduces retention and accountability to almost zero.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-landscape-callout about-callout-red">
                <div className="about-callout-tag">CRITICAL REALITY CHECK</div>
                <div className="about-callout-text">
                  Only 8.4% of enrolled students ever complete self-paced course curriculum alone.
                </div>
              </div>
            </div>

            <div className="about-landscape-card about-card-skillor-rev">
              <div className="about-landscape-card-header">
                <span className="about-landscape-pill about-pill-skillor">THE SKILLOR REVOLUTION</span>
                <span className="about-landscape-status-icon about-icon-success">
                  <CheckCircle2 size={18} />
                </span>
              </div>

              <h3 className="about-landscape-card-title">
                The Kinetic Power of Reciprocal Exchange
              </h3>
              <p className="about-landscape-card-desc">
                When trading skills peer-to-peer, the stakes change. You aren't just a customer waiting to
                be spoonfed; you're an active participant in someone else's learning as well as your own.
              </p>

              <div className="about-landscape-points-list">
                <div className="about-landscape-point-item">
                  <div className="about-point-number-badge about-badge-green">1</div>
                  <div className="about-point-content">
                    <h4 className="about-point-title">Zero-Cost Knowledge Barter</h4>
                    <p className="about-point-desc">
                      Your skill is the currency. Trade an hour of your Node.js or Figma craft for an hour of another's UX expertise.
                    </p>
                  </div>
                </div>

                <div className="about-landscape-point-item">
                  <div className="about-point-number-badge about-badge-green">2</div>
                  <div className="about-point-content">
                    <h4 className="about-point-title">The Protégé Effect (Teaching = Mastering)</h4>
                    <p className="about-point-desc">
                      Explaining a concept to someone else deepens your own comprehension far faster than passive reading.
                    </p>
                  </div>
                </div>

                <div className="about-landscape-point-item">
                  <div className="about-point-number-badge about-badge-green">3</div>
                  <div className="about-point-content">
                    <h4 className="about-point-title">High-Affinity Accountability</h4>
                    <p className="about-point-desc">
                      Both learners have "skin in the game". If either person misses sessions, everyone loses, and reciprocal pacts break.
                    </p>
                  </div>
                </div>

                <div className="about-landscape-point-item">
                  <div className="about-point-number-badge about-badge-green">4</div>
                  <div className="about-point-content">
                    <h4 className="about-point-title">True Generational Empathy</h4>
                    <p className="about-point-desc">
                      You'll form authentic professional relationships with peers, building lifelong partnerships, ventures, or peer networks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-landscape-callout about-callout-green">
                <div className="about-callout-tag">THE SKILLOR DIFFERENCE</div>
                <div className="about-callout-text">
                  "When you give, you receive. When you teach, you master. Knowledge should not cost a fortune."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="engine-section" className="about-engine-section">
        <div className="about-section-container">
          <div className="about-section-badge-wrapper">
            <div className="about-section-purple-badge">
              <Cpu size={13} className="about-sparkle-icon" />
              <span>Autonomous Peer Discovery Framework</span>
            </div>
          </div>

          <h2 className="about-section-title">Our Algorithmic Reciprocity Engine</h2>
          <p className="about-section-subtitle">
            How we connect two individual knowledge balances into a reciprocal handshake. Learners
            don't pay cash; they trade Master Skills (Teaches) and Apprentice Skills (Wants).
          </p>

          <div className="about-engine-tabs-row">
            {MATCH_SCENARIOS.map((scenario, idx) => (
              <button
                key={scenario.id}
                onClick={() => setActiveScenarioIndex(idx)}
                className={`about-engine-tab-btn ${activeScenarioIndex === idx ? "about-active" : ""}`}
              >
                <span>Pair {idx + 1}: {scenario.tabLabel}</span>
                <span className="about-engine-tab-rate">{scenario.matchRate}</span>
              </button>
            ))}
          </div>

          <div className="about-engine-showcase-box">
            <div className="about-engine-peer-card">
              <div className="about-engine-peer-header">
                <img
                  src={currentScenario.peerA.avatar}
                  alt={currentScenario.peerA.name}
                  className="about-engine-avatar"
                />
                <div className="about-engine-peer-info">
                  <h4 className="about-engine-peer-name">{currentScenario.peerA.name}</h4>
                  <p className="about-engine-peer-role">{currentScenario.peerA.role}</p>
                  <div className="about-engine-rating-row">
                    <Star size={13} className="about-star-icon" fill="#f59e0b" stroke="none" />
                    <span>{currentScenario.peerA.rating}</span>
                    <span className="about-rating-dot">•</span>
                    <span className="about-rating-trades">{currentScenario.peerA.trades}</span>
                  </div>
                </div>
              </div>

              <div className="about-engine-skills-block">
                <span className="about-skills-block-label">OFFERING (MASTER SKILLS)</span>
                <div className="about-skills-tags-wrap">
                  {currentScenario.peerA.teaches.map((skill, i) => (
                    <span key={i} className="about-skill-tag about-tag-master">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="about-engine-skills-block">
                <span className="about-skills-block-label">SEEKING (APPRENTICE SKILLS)</span>
                <div className="about-skills-tags-wrap">
                  {currentScenario.peerA.wants.map((skill, i) => (
                    <span key={i} className="about-skill-tag about-tag-apprentice">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="about-engine-peer-footer">
                <span className="about-footer-status-pill">{currentScenario.peerA.status}</span>
                <span className="about-footer-verified-badge">
                  <ShieldCheck size={13} /> {currentScenario.peerA.badge}
                </span>
              </div>
            </div>

            <div className="about-engine-hub-connector">
              <div className={`about-engine-match-badge ${pulseActive ? "about-pulse-highlight" : ""}`}>
                <Zap size={13} className="about-zap-icon" />
                <span>{currentScenario.matchRate} Reciprocity Match!</span>
              </div>

              <div className="about-engine-connector-visual">
                <div className={`about-connector-line-left ${pulseActive ? "about-pulse-line" : ""}`}></div>
                <button
                  className={`about-connector-center-orb ${pulseActive ? "about-orb-active" : ""}`}
                  onClick={handleSimulateTrade}
                  title="Click to simulate live reciprocal trade!"
                >
                  <ArrowLeftRight size={22} className="orb-icon" />
                </button>
                <div className={`about-connector-line-right ${pulseActive ? "about-pulse-line" : ""}`}></div>
              </div>

              <div className="about-engine-reciprocal-note">
                <p className="about-note-text">{currentScenario.reciprocalNote}</p>
                <button className="about-simulate-btn" onClick={handleSimulateTrade}>
                  {pulseActive ? "⚡ Reciprocal Handshake Synced!" : "Simulate Live Trade Handshake"}
                </button>
              </div>
            </div>


            <div className="about-engine-peer-card">
              <div className="about-engine-peer-header">
                <img
                  src={currentScenario.peerB.avatar}
                  alt={currentScenario.peerB.name}
                  className="about-engine-avatar"
                />
                <div className="about-engine-peer-info">
                  <h4 className="about-engine-peer-name">{currentScenario.peerB.name}</h4>
                  <p className="about-engine-peer-role">{currentScenario.peerB.role}</p>
                  <div className="about-engine-rating-row">
                    <Star size={13} className="about-star-icon" fill="#f59e0b" stroke="none" />
                    <span>{currentScenario.peerB.rating}</span>
                    <span className="about-rating-dot">•</span>
                    <span className="about-rating-trades">{currentScenario.peerB.trades}</span>
                  </div>
                </div>
              </div>

              <div className="about-engine-skills-block">
                <span className="about-skills-block-label">OFFERING (MASTER SKILLS)</span>
                <div className="about-skills-tags-wrap">
                  {currentScenario.peerB.teaches.map((skill, i) => (
                    <span key={i} className="about-skill-tag about-tag-master">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="about-engine-skills-block">
                <span className="about-skills-block-label">SEEKING (APPRENTICE SKILLS)</span>
                <div className="about-skills-tags-wrap">
                  {currentScenario.peerB.wants.map((skill, i) => (
                    <span key={i} className="about-skill-tag about-tag-apprentice">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="about-engine-peer-footer">
                <span className="about-footer-status-pill">{currentScenario.peerB.status}</span>
                <span className="about-footer-verified-badge">
                  <Award size={13} /> {currentScenario.peerB.badge}
                </span>
              </div>
            </div>
          </div>


          <div className="about-engine-pillars-grid">
            <div className="about-pillar-card">
              <div className="about-pillar-icon-box about-icon-orange">
                <Star size={20} />
              </div>
              <h4 className="about-pillar-title">1. Dual Inventory Match</h4>
              <p className="about-pillar-desc">
                Our neural logic searches both sides simultaneously, matching people whose existing skills exactly
                fulfill each other's wishlist. Zero awkward cold outreach.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-icon-box about-icon-purple">
                <Layers size={20} />
              </div>
              <h4 className="about-pillar-title">2. Peer Value Ledger</h4>
              <p className="about-pillar-desc">
                Each trade is tracked transparently. If Marcus spends 1 hr teaching Figma, he earns 1 credit to claim
                1 hr of iOS architecture from Elena without delay.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-icon-box about-icon-teal">
                <ShieldCheck size={20} />
              </div>
              <h4 className="about-pillar-title">3. Community Trust Score</h4>
              <p className="about-pillar-desc">
                Punctuality, prep thoroughness, and session ratings generate an internal reciprocity score.
                High-integrity peers match faster and unlock exclusive perks.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="principles-section" className="about-principles-section">
        <div className="about-section-container">
          <div className="about-principles-header-row">
            <div className="about-principles-left-col">
              <div className="about-principles-tag">CORE TENETS & ETHICAL MANIFESTO</div>
              <h2 className="about-principles-title">
                The Principles That Fuel The Exchange
              </h2>
            </div>
            <div className="about-principles-right-col">
              <p className="about-principles-header-desc">
                Every code commit and feature addition is calibrated toward safeguarding the dignity,
                knowledge ownership, and fairness of peer reciprocity.
              </p>
            </div>
          </div>


          <div className="about-principles-cards-grid">
            {PRINCIPLES.map((principle) => {
              const IconComp = principle.icon;
              return (
                <div
                  key={principle.id}
                  className={`about-principle-card ${principle.colorClass}`}
                  onClick={() => setActiveModalPrinciple(principle)}
                >
                  <div className="about-principle-icon-wrapper">
                    <IconComp size={22} className="principle-icon" />
                  </div>
                  <h3 className="about-principle-name">{principle.title}</h3>
                  <p className="about-principle-text">{principle.description}</p>
                  <button className="about-principle-action-link">
                    <span>{principle.actionText}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      <section id="core-founders" className="about-founders-section">
        <div className="about-section-container">
          <div className="about-section-badge-wrapper">
            <div className="about-section-purple-badge">
              <Users size={13} className="about-sparkle-icon" />
              <span>Founders and Core Contributors</span>
            </div>
          </div>

          <h2 className="about-section-title">
            Built by Builders Who Traded Their Way Here
          </h2>
          <p className="about-section-subtitle">
            We are not Silicon Valley venture tourists disconnected from the real struggle. We built
            Skillor because we lived through the broken gatekeeping of overpriced education and predatory bootcamps.
          </p>


          <div className="about-founders-grid">
            {FOUNDERS.map((founder, i) => (
              <div key={founder.id || i} className="about-founder-card">
                <div className="about-founder-image-wrapper">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="about-founder-photo"
                    loading="lazy"
                  />
                  <div className="about-founder-overlay-badge">
                    <span className="about-badge-dot"></span>
                    <span>{founder.role}</span>
                  </div>
                </div>

                <div className="about-founder-content">
                  <h3 className="about-founder-name">{founder.name}</h3>
                  <p className="about-founder-bio">{founder.bio}</p>

                  {founder.tradesGives && (
                    <div className="about-founder-skills-row">
                      <span className="about-f-skill-heading">TRADES OFFERED:</span>
                      <div className="about-f-skill-pills-wrap">
                        {Array.isArray(founder.tradesGives) ? (
                          founder.tradesGives.map((skill, sIdx) => (
                            <span key={sIdx} className="about-f-skill-pill about-pill-give">{skill}</span>
                          ))
                        ) : (
                          <span className="about-f-skill-pill about-pill-give">{founder.tradesGives}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {founder.skillsCovets && (
                    <div className="about-founder-skills-row">
                      <span className="about-f-skill-heading">SKILLS COVETED / LEARNING:</span>
                      <div className="about-f-skill-pills-wrap">
                        {Array.isArray(founder.skillsCovets) ? (
                          founder.skillsCovets.map((skill, sIdx) => (
                            <span key={sIdx} className="about-f-skill-pill about-pill-covet">{skill}</span>
                          ))
                        ) : (
                          <span className="about-f-skill-pill about-pill-covet">{founder.skillsCovets}</span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="about-founder-socials">
                    {founder.github && (
                      <a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-founder-social-btn"
                        aria-label={`${founder.name}'s GitHub`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-founder-social-btn"
                        aria-label={`${founder.name}'s LinkedIn`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.27a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* <div className="about-milestone-banner">
            <div className="about-milestone-quote-col">
              <p className="about-milestone-quote">
                "In 2024, our first 100 beta members completed 840 reciprocal trades. Today, over 14,000 members prove
                that human generosity and skill sharing beat tuition every single time."
              </p>
            </div>
            <div className="about-milestone-avatars-col">
              <div className="about-avatar-stack">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                  className="about-stack-avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                  className="about-stack-avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                  className="about-stack-avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                  className="about-stack-avatar"
                />
              </div>
              <div className="about-milestone-label-box">
                <span className="about-pulse-indicator"></span>
                <span className="about-milestone-active-text">14,000+ active peers trading daily</span>
              </div> 
             </div> 
          </div> */}
        </div>
      </section>


      <section className="about-cta-section">
        <div className="about-section-container">
          <div className="about-cta-card">

            <div className="about-cta-top-pill">
              <Sparkles size={13} className="about-cta-sparkle" />
              <span>Start Your Reciprocal Education Journey</span>
            </div>


            <h2 className="about-cta-title">
              Ready to join the peer exchange revolution?
            </h2>


            <p className="about-cta-subtitle">
              Create your free exchange profile in 2 minutes. List what you love doing and what you
              want to master, and find your first learning partner today.
            </p>


            <div className="about-cta-buttons-row">
              <button className="about-cta-btn-primary" onClick={handleStartSwapping}>
                <span>Start Swapping for Free</span>
                <ArrowRight size={17} />
              </button>

              <button
                className="about-cta-btn-secondary"
                onClick={() => {
                  if (setActivePage) setActivePage("how-to-work");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <Compass size={17} />
                <span>Explore Community Skills</span>
              </button>
            </div>


            <div className="about-cta-trust-row">
              <div className="about-trust-item">
                <CheckCircle2 size={16} className="about-trust-icon" />
                <span>No Credit Card Required</span>
              </div>
              <div className="about-trust-item">
                <CheckCircle2 size={16} className="about-trust-icon" />
                <span>Zero-Cost Forever Guarantee</span>
              </div>
              <div className="about-trust-item">
                <CheckCircle2 size={16} className="about-trust-icon" />
                <span>100% Free Community Ethos</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {activeModalPrinciple && (
        <div className="about-principle-modal-backdrop" onClick={() => setActiveModalPrinciple(null)}>
          <div className="about-principle-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="about-modal-header">
              <div className="about-modal-title-row">
                <activeModalPrinciple.icon size={24} className="about-modal-icon-title" />
                <h3 className="about-modal-title">{activeModalPrinciple.modalContent.headline}</h3>
              </div>
              <button
                className="about-modal-close-btn"
                onClick={() => setActiveModalPrinciple(null)}
              >
                <X size={18} />
              </button>
            </div>

            <p className="about-modal-lead-desc">{activeModalPrinciple.description}</p>

            <div className="about-modal-points-list">
              {activeModalPrinciple.modalContent.points.map((pt, idx) => (
                <div key={idx} className="about-modal-point-item">
                  <div className="about-modal-point-bullet">
                    <Check size={14} />
                  </div>
                  <span className="about-modal-point-text">{pt}</span>
                </div>
              ))}
            </div>

            <div className="about-modal-footer">
              <button
                className="about-modal-btn-confirm"
                onClick={() => {
                  setActiveModalPrinciple(null);
                  handleStartSwapping();
                }}
              >
                Join Skillor & Honor The Pledge
              </button>
              <button
                className="about-modal-btn-cancel"
                onClick={() => setActiveModalPrinciple(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;