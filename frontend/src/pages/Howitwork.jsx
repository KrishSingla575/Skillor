import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeftRight,
  Play,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Zap,
  Award,
  Users,
  Code2,
  Video,
  ChevronDown,
  Check,
  X,
  DollarSign,
  AlertCircle,
  RefreshCw,
  Layers
} from "lucide-react";
import "./Howitwork.css";

const SIX_STEPS = [
  {
    step: "01",
    tag: "UNBALANCED RISK",
    tagColor: "orange",
    title: "Build Your Dual-Skill Profile",
    description:
      "List what you can teach (your current mastery) and what you want to learn (your growth goals). Add proof and availability, and get live in 3 minutes.",
    note: "Takes 3 minutes to publish",
    noteIcon: Clock,
    type: "profile"
  },
  {
    step: "02",
    tag: "ALGORITHMIC REAL-TIME AUDIT",
    tagColor: "purple",
    title: "Algorithmic Two-Way Matching",
    description:
      "Our bipartite algorithm scans the global directory to find complementary peers where Teaches(A) equals Learns(B) and Teaches(B) equals Learns(A).",
    note: "Zero directional mismatch guarantee",
    noteIcon: Zap,
    type: "bipartite"
  },
  {
    step: "03",
    tag: "MUTUAL ACCEPTANCE",
    tagColor: "teal",
    title: "Mutual Exchange Request",
    description:
      "Propose a balance exchange contract outlining proposed topics, promised session times, and reciprocal goals. Step opens only upon relevant credits.",
    note: "Anti-ghosting guarantee enforced",
    noteIcon: ShieldCheck,
    type: "request"
  },
  {
    step: "04",
    tag: "CO-WORKSPACE",
    tagColor: "purple",
    title: "Integrated Workspace Sync",
    description:
      "Connect via shared screen, chat and code/canvas preview rooms. Integrated stopwatch ticks and tabulates split time to ensure 50/50 balance.",
    note: "In-app audio/screen collaboration",
    noteIcon: Video,
    type: "session"
  },
  {
    step: "05",
    tag: "THE EXCHANGE",
    tagColor: "orange",
    title: "1-for-1 Reciprocal Session",
    description:
      "Conduct your session with 100% mutual respect. 30 minutes dedicated to teaching, 30 minutes dedicated to learning, on alternating weeks.",
    note: "Split 30/30 teaching time",
    noteIcon: Zap,
    type: "protege"
  },
  {
    step: "06",
    tag: "REPUTATION",
    tagColor: "teal",
    title: "Two-Sided Verified Reviews",
    description:
      "Both peers rate punctuality, knowledge utility, and communication. Builds verifiable community reputation, unlocking the Junior-Senior corridor.",
    note: "Portable verifiable proof",
    noteIcon: Award,
    type: "review"
  }
];

const FAQS = [
  {
    q: "Do I have to pay anything to join or swap?",
    a: "Never. Skillor is 100% free and peer-driven. The platform operates on a reciprocal timebank model: '1 hour taught = 1 hour learned'. You never pay for courses, tutoring, or platform access. The only currency is your craft and willingness to share."
  },
  {
    q: "What happens if a peer cancels unfairly or doesn't show up?",
    a: "We enforce a strict anti-ghosting protocol. If a member fails to show without 12-hour prior notice, their account is flagged, matching privileges are temporarily suspended, and their deposit credit is awarded to the waiting peer."
  },
  {
    q: "Can I complete exchanges even if they don't have senior technical skills?",
    a: "Absolutely! Learning isn't limited to senior engineers. Anyone with domain knowledge—from Figma basics and Spanish conversation to copywriting or Git fundamentals—can mentor someone eager to learn those skills."
  },
  {
    q: "How are sessions scheduled across different global time zones?",
    a: "Our system automatically converts your partner's calendar availability into your local time zone. When you accept an exchange, you choose from mutually compatible slots or sync directly to Google Calendar."
  },
  {
    q: "What if I teach a skill but can't find someone teaching what I want immediately?",
    a: "Skillor includes a 1-Way Credit Reserve. If no exact reciprocal match is available right now, your taught session generates an exchange credit that you can redeem anytime with any other verified peer."
  }
];

function HowToWork({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeStepCard, setActiveStepCard] = useState(null);
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simOutputStatus, setSimOutputStatus] = useState("PASS");
  const [simScore, setSimScore] = useState(96);
  const [swapAccepted, setSwapAccepted] = useState(false);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleRunSimulation = () => {
    setIsSimRunning(true);
    setTimeout(() => {
      setIsSimRunning(false);
      setSimScore(98.4);
      setSimOutputStatus("OPTIMAL (98.4%)");
    }, 900);
  };

  const handleStartSwap = () => {
    if (setActivePage) {
      setActivePage("matches");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleExploreDirectory = () => {
    if (setActivePage) {
      setActivePage("home");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="how-page" id="howitwork-root">
      <section className="how-hero" aria-label="How Skillor Works Hero">
        <div className="hero-pill-badge">
          SIMPLE • FAIR • ZERO Charge • THE 6-STEP EXCHANGE BLUEPRINT
        </div>

        <div className="hero-kicker-row">
          <Sparkles size={16} className="kicker-icon" />
          <span>Algorithm to Action / 2-Way Reciprocity Works</span>
        </div>

        <h1 className="how-hero-title">
          How <span className="gradient-orange">Skillor Works</span>
        </h1>

        <p className="how-hero-subtitle">
          Exchange knowledge directly with verified peers. No subscriptions, or
          bootcamps. Instead of paying money for learning, what you receive is a
          simple, accountable 6-step cycle.
        </p>

        <div className="how-cta-group">
          <button
            type="button"
            className="how-btn-primary"
            onClick={handleStartSwap}
            id="start-first-swap-btn"
          >
            <span>Start Your First Swap Free</span>
            <ArrowRight size={17} />
          </button>

          <button
            type="button"
            className="how-btn-secondary"
            onClick={() => setIsDemoOpen(true)}
            id="try-interactive-demo-btn"
          >
            <Play size={16} fill="currentColor" />
            <span>Try Interactive Match Demo</span>
          </button>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box coral">
              <Users size={22} />
            </div>
            <div className="pillar-content">
              <span className="pillar-title">1:1 Sessions</span>
              <span className="pillar-desc">Equal 1-Hour Split</span>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box purple">
              <DollarSign size={22} />
            </div>
            <div className="pillar-content">
              <span className="pillar-title">No Cash Spent</span>
              <span className="pillar-desc">1-Way Credit Engine</span>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box teal">
              <ShieldCheck size={22} />
            </div>
            <div className="pillar-content">
              <span className="pillar-title">Anti-Ghosting</span>
              <span className="pillar-desc">Auto-Lock Protection</span>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box amber">
              <Award size={22} />
            </div>
            <div className="pillar-content">
              <span className="pillar-title">100% Free</span>
              <span className="pillar-desc">All Skill Pairs Eligible</span>
            </div>
          </div>
        </div>
      </section>

      <section className="blueprint-section" aria-label="The Six-Step Blueprint">
        <div className="section-head-flex">
          <div className="section-head-left">
            <span className="section-micro-tag">THE SIX-STEP BLUEPRINT</span>
            <h2 className="section-main-title">
              Step-by-Step Reciprocal Architecture
            </h2>
            <p className="section-description">
              Every exchange is powered by strict two-way alignment and
              give-value-first logic. Here's exactly how each transaction unfolds.
            </p>
          </div>

          <div className="blueprint-legend">
            <div className="legend-item">
              <span className="legend-dot active"></span>
              <span>Step Active</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot completed"></span>
              <span>Completed Step</span>
            </div>
          </div>
        </div>

        <div className="blueprint-grid">
          {SIX_STEPS.map((item, idx) => {
            const NoteIcon = item.noteIcon;
            return (
              <div
                key={item.step}
                className={`blueprint-card ${
                  activeStepCard === idx ? "active-card" : ""
                }`}
                onMouseEnter={() => setActiveStepCard(idx)}
                onMouseLeave={() => setActiveStepCard(null)}
              >
                <div>
                  <div className="card-top-row">
                    <span className="step-badge-number">{item.step}</span>
                    <span className={`card-tag-pill ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="blueprint-card-title">{item.title}</h3>
                  <p className="blueprint-card-text">{item.description}</p>

                  <div className="card-visual-box">
                    {item.type === "profile" && (
                      <div className="mini-profile-preview">
                        <div className="mini-skill-row">
                          <span className="mini-skill-label">
                            <Code2 size={12} /> CAN TEACH
                          </span>
                          <div className="mini-chips-group">
                            <span className="mini-chip purple">Python</span>
                            <span className="mini-chip purple">FastAPI</span>
                            <span className="mini-chip purple">SQL</span>
                            <span className="mini-chip purple">Architecture</span>
                          </div>
                        </div>
                        <div className="mini-skill-row">
                          <span className="mini-skill-label">
                            <Sparkles size={12} /> WANTS TO LEARN
                          </span>
                          <div className="mini-chips-group">
                            <span className="mini-chip teal">Figma Systems</span>
                            <span className="mini-chip teal">
                              Motion Interactions
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.type === "bipartite" && (
                      <div className="mini-bipartite-preview">
                        <div className="bipartite-flow">
                          <div className="peer-node active-a">Peer A (You)</div>
                          <div className="cloud-hub">
                            <ArrowLeftRight size={14} />
                            <span>Bipartite Cloud</span>
                          </div>
                          <div className="peer-node active-b">Peer B (Match)</div>
                        </div>
                        <div className="bipartite-score-row">
                          <span>Equivalence Score:</span>
                          <span className="reciprocity-score-pill">
                            96% Reciprocity
                          </span>
                        </div>
                      </div>
                    )}

                    {item.type === "request" && (
                      <div className="mini-request-preview">
                        <div className="request-title-row">
                          <span className="req-subject">
                            PROPOSED: REACT & FIGMA
                          </span>
                          <span className="req-status-tag">
                            {swapAccepted ? "Accepted" : "Pending"}
                          </span>
                        </div>
                        <p className="req-subtext">
                          Both peers must agree to session guidelines before room
                          opens.
                        </p>
                        <div className="req-buttons-row">
                          <button
                            type="button"
                            className="mini-btn-accept"
                            onClick={() => setSwapAccepted(true)}
                          >
                            {swapAccepted ? "✓ Confirmed" : "Accept Swap"}
                          </button>
                          <button
                            type="button"
                            className="mini-btn-resched"
                            onClick={() => setSwapAccepted(false)}
                          >
                            Reschedule
                          </button>
                        </div>
                      </div>
                    )}

                    {item.type === "session" && (
                      <div className="mini-session-preview">
                        <div className="session-live-bar">
                          <span>Session: 2-way Split (60m)</span>
                          <span className="live-indicator">
                            <span className="live-dot-pulse"></span> LIVE
                          </span>
                        </div>
                        <div className="timer-split-display">
                          00:29:41 to Elena / 00:30:19 to Carlos
                        </div>
                        <div className="mini-launch-row">
                          <div className="launch-pill">Google Meet Sync</div>
                          <div className="launch-pill">To In-App Code Lab</div>
                        </div>
                      </div>
                    )}

                    {item.type === "protege" && (
                      <div className="protege-effect-box">
                        <span className="protege-title">
                          <Zap size={14} /> The Protégé Effect
                        </span>
                        <p className="protege-desc">
                          Proof shows that learners teach faster when explaining
                          concepts to peers compared to passive video courses.
                        </p>
                      </div>
                    )}

                    {item.type === "review" && (
                      <div className="mini-review-preview">
                        <div className="review-author-row">
                          <span className="review-author">
                            Rated by Elena R.
                          </span>
                          <span className="review-badge-verified">
                            ✓ VERIFIED
                          </span>
                        </div>
                        <div className="review-stars">★★★★★</div>
                        <span className="review-quote">
                          "Incredible React mentor! Explained custom hooks in 30
                          mins."
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-bottom-note">
                  <NoteIcon size={14} className="note-icon" />
                  <span>{item.note}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="match-sim-section"
        aria-label="Peer to Peer Match Simulation"
      >
        <div className="sim-section-header">
          <span className="section-micro-tag">
            PEER-TO-PEER MATCH SIMULATION
          </span>
          <h2 className="section-main-title">Live 1-on-1 Swap Architecture</h2>
          <p className="section-description">
            See how two real world mentors match and trade knowledge without
            exchange fees, tuition debt, or paywalls.
          </p>
        </div>

        <div className="sim-container-card">
          <div className="sim-grid-layout">
            <div className="sim-peer-profile">
              <div className="sim-profile-top">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                  alt="Elena Rostova"
                  className="sim-avatar-img"
                />
                <div className="sim-peer-info">
                  <div className="sim-peer-name">
                    <span>Elena Rostova</span>
                    <CheckCircle2 size={16} className="verified-icon-check" />
                  </div>
                  <span className="sim-peer-role">
                    Lead Front-End Engineer @ Wise
                  </span>
                  <span className="sim-peer-loc">London, UK</span>
                  <span className="sim-peer-rating">★ 4.95 (42 exchanges)</span>
                </div>
              </div>

              <div className="sim-section-box">
                <span className="sim-box-title">TEACHES (CURRICULUM TAUGHT)</span>
                <div className="sim-tag-row">
                  <span className="sim-tag-item purple">Cybersecurity</span>
                  <span className="sim-tag-item purple">Linux</span>
                  <span className="sim-tag-item purple">PostgreSQL</span>
                </div>
              </div>

              <div className="sim-section-box">
                <span className="sim-box-title">DESIRES TO LEARN</span>
                <div className="sim-tag-row">
                  <span className="sim-tag-item teal">Figma Tokens</span>
                  <span className="sim-tag-item teal">Design Systems</span>
                </div>
              </div>
            </div>

            <div className="sim-center-connector">
              <div className="match-circle-badge">
                <ArrowLeftRight size={22} />
                <span className="match-score-number">96.4%</span>
                <span className="match-score-label">MATCH</span>
              </div>
              <span className="connector-title">TWO-WAY EQUIVALENCE</span>
              <span className="connector-status-pill">
                1:1 Mutual Exchange Active
              </span>
            </div>

            <div className="sim-peer-profile">
              <div className="sim-profile-top">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Marcus Lind"
                  className="sim-avatar-img"
                />
                <div className="sim-peer-info">
                  <div className="sim-peer-name">
                    <span>Marcus Lind</span>
                    <CheckCircle2 size={16} className="verified-icon-check" />
                  </div>
                  <span className="sim-peer-role">
                    Lead Product Designer @ Klarna
                  </span>
                  <span className="sim-peer-loc">Copenhagen, DK</span>
                  <span className="sim-peer-rating">★ 4.98 (56 exchanges)</span>
                </div>
              </div>

              <div className="sim-section-box">
                <span className="sim-box-title">TEACHES (CURRICULUM TAUGHT)</span>
                <div className="sim-tag-row">
                  <span className="sim-tag-item teal">Design Systems</span>
                  <span className="sim-tag-item teal">Figma Tokens</span>
                  <span className="sim-tag-item teal">Motion Interactions</span>
                </div>
              </div>

              <div className="sim-section-box">
                <span className="sim-box-title">DESIRES TO LEARN</span>
                <div className="sim-tag-row">
                  <span className="sim-tag-item purple">Python Backend</span>
                  <span className="sim-tag-item purple">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sim-bottom-banner">
            <div className="sim-banner-left">
              <DollarSign size={16} className="highlight-green" />
              <span>
                ESTIMATED CAPITAL SAVED:{" "}
                <strong className="highlight-green">$4,250</strong> compared to
                standard bootcamp tutoring
              </span>
            </div>
            <div className="sim-banner-right">
              <CheckCircle2 size={15} />
              <span>CONVERTED FROM PASSIVE TUTORING TO HIGH RETENTION</span>
            </div>
          </div>
        </div>
      </section>

      <section className="algorithm-section" aria-label="Algorithmic Accuracy">
        <div className="algo-grid-layout">
          <div className="algo-left-content">
            <span className="section-micro-tag">ALGORITHMIC ACCURACY</span>
            <h2 className="section-main-title">
              The Math Behind Two-Way Reciprocity
            </h2>
            <p className="section-description">
              Built on a custom matching bipartite algorithm that calculates
              synergy. Rather than one-way tutoring, Skillor finds you the exact
              person who matches both what you teach and what you want to learn.
            </p>

            <div className="algo-feature-list">
              <div className="algo-feature-item">
                <div className="algo-icon-wrap">
                  <Zap size={18} />
                </div>
                <div className="algo-feature-text">
                  <span className="algo-feature-title">
                    Perfect-Harmony Match (100%)
                  </span>
                  <span className="algo-feature-desc">
                    Direct bi-directional match where Teaches(A) == Learns(B) and
                    Teaches(B) == Learns(A). Zero-cost tutor exchange.
                  </span>
                </div>
              </div>

              <div className="algo-feature-item">
                <div className="algo-icon-wrap purple">
                  <Layers size={18} />
                </div>
                <div className="algo-feature-text">
                  <span className="algo-feature-title">
                    Multi-Skill Weighted Scoring
                  </span>
                  <span className="algo-feature-desc">
                    Scores automatically aggregate secondary skills, verified
                    proficiency level delta, and matching calendar availability.
                  </span>
                </div>
              </div>

              <div className="algo-feature-item">
                <div className="algo-icon-wrap teal">
                  <ShieldCheck size={18} />
                </div>
                <div className="algo-feature-text">
                  <span className="algo-feature-title">
                    One-Way Atone Discovery
                  </span>
                  <span className="algo-feature-desc">
                    For obscure or rare skills, users can deposit teach-hours
                    into the community pool and draw back from any tutor later.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="code-terminal-window">
            <div className="code-terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <span className="terminal-filename">bipartite_equi_swap.py</span>
              <button
                type="button"
                className="terminal-run-btn"
                onClick={handleRunSimulation}
              >
                <RefreshCw
                  size={12}
                  className={isSimRunning ? "spin-icon" : ""}
                />
                <span>{isSimRunning ? "Running..." : "Test Matrix"}</span>
              </button>
            </div>

            <div className="code-content-body">
              <div className="code-line">
                <span className="code-kw">def </span>
                <span className="code-fn">calculate_bipartite_harmony</span>
                <span className="code-var">(peer_a, peer_b):</span>
              </div>
              <div className="code-line">
                {"    "}
                <span className="code-var">match_teach = </span>
                <span className="code-fn">intersection</span>
                <span className="code-var">(peer_a.teaches, peer_b.wants)</span>
              </div>
              <div className="code-line">
                {"    "}
                <span className="code-var">match_learn = </span>
                <span className="code-fn">intersection</span>
                <span className="code-var">(peer_a.wants, peer_b.teaches)</span>
              </div>
              <div className="code-line">
                {"    "}
                <span className="code-comment">
                  # Compute dual-direction equivalence ratio
                </span>
              </div>
              <div className="code-line">
                {"    "}
                <span className="code-var">s1 = </span>
                <span className="code-fn">len</span>
                <span className="code-var">(match_teach) / </span>
                <span className="code-fn">max</span>
                <span className="code-var">(</span>
                <span className="code-fn">len</span>
                <span className="code-var">(peer_a.teaches), </span>
                <span className="code-num">1</span>
                <span className="code-var">)</span>
              </div>
              <div className="code-line">
                {"    "}
                <span className="code-var">s2 = </span>
                <span className="code-fn">len</span>
                <span className="code-var">(match_learn) / </span>
                <span className="code-fn">max</span>
                <span className="code-var">(</span>
                <span className="code-fn">len</span>
                <span className="code-var">(peer_b.teaches), </span>
                <span className="code-num">1</span>
                <span className="code-var">)</span>
              </div>
              <div className="code-line">
                {"    "}
                <span className="code-var">harmony_score = (</span>
                <span className="code-num">2</span>
                <span className="code-var"> * s1 * s2) / (s1 + s2)</span>
              </div>
              <div className="code-line">
                {"    "}
                <span className="code-kw">if </span>
                <span className="code-var">harmony_score &gt;= </span>
                <span className="code-num">0.90</span>
                <span className="code-var">:</span>
              </div>
              <div className="code-line">
                {"        "}
                <span className="code-kw">return </span>
                <span className="code-fn">ExchangeContract</span>
                <span className="code-var">(</span>
              </div>
              <div className="code-line">
                {"            "}
                <span className="code-var">status=</span>
                <span className="code-str">"PERFECT_EQUIVALENCE"</span>
                <span className="code-var">,</span>
              </div>
              <div className="code-line">
                {"            "}
                <span className="code-var">score=harmony_score,</span>
              </div>
              <div className="code-line">
                {"            "}
                <span className="code-var">corridor=[match_teach, match_learn]</span>
              </div>
              <div className="code-line">
                {"        "}
                <span className="code-var">)</span>
              </div>
            </div>

            <div className="code-terminal-footer">
              <span className="terminal-status-pass">
                ● RUN SIMULATION: {simOutputStatus}
              </span>
              <span className="terminal-status-matrix">
                {simScore}% PRECISION MATRIX
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="fairness-section" aria-label="Fairness by Design">
        <div className="fairness-header">
          <span className="section-micro-tag">FAIRNESS BY DESIGN</span>
          <h2 className="section-main-title">
            Why Reciprocity Beats Paid Tutoring
          </h2>
          <p className="section-subtitle">
            How Skillor's peer swap engine redefines learning economics.
          </p>
        </div>

        <div className="comparison-grid">

          <div className="comparison-card corporate">
            <div className="comp-card-head">
              <span className="comp-card-title">
                Corporate Tutoring Platforms
              </span>
              <div className="comp-icon-badge red">
                <AlertCircle size={20} />
              </div>
            </div>

            <div className="comp-list">
              <div className="comp-item">
                <X size={18} className="comp-item-icon red" />
                <span className="comp-item-text">
                  <strong>$30 - $120/hr fees</strong> that favor the affluent and
                  lock in passive knowledge
                </span>
              </div>

              <div className="comp-item">
                <X size={18} className="comp-item-icon red" />
                <span className="comp-item-text">
                  <strong>Passive consumption:</strong> you listen without
                  applying or consolidating
                </span>
              </div>

              <div className="comp-item">
                <X size={18} className="comp-item-icon red" />
                <span className="comp-item-text">
                  <strong>Transaction-first dynamics</strong> with zero ongoing
                  peer-post mentoring
                </span>
              </div>

              <div className="comp-item">
                <X size={18} className="comp-item-icon red" />
                <span className="comp-item-text">
                  <strong>Aggressive upselling</strong> for certificate fees and
                  paywalled guarantees
                </span>
              </div>
            </div>
          </div>


          <div className="comparison-card skillor">
            <div className="comp-card-head">
              <span className="comp-card-title">Skillor Peer Exchange</span>
              <div className="comp-icon-badge green">
                <ShieldCheck size={20} />
              </div>
            </div>

            <div className="comp-list">
              <div className="comp-item">
                <Check size={18} className="comp-item-icon green" />
                <span className="comp-item-text">
                  <strong>$0 Forever:</strong> Exchange your mastery, pay with an
                  hour of another peer's mastery
                </span>
              </div>

              <div className="comp-item">
                <Check size={18} className="comp-item-icon green" />
                <span className="comp-item-text">
                  <strong>The Protégé Effect:</strong> Teaching strengthens your
                  own mastery 75% faster
                </span>
              </div>

              <div className="comp-item">
                <Check size={18} className="comp-item-icon green" />
                <span className="comp-item-text">
                  <strong>Symmetrical Respect:</strong> Both participants are
                  simultaneously mentors and students
                </span>
              </div>

              <div className="comp-item">
                <Check size={18} className="comp-item-icon green" />
                <span className="comp-item-text">
                  <strong>Decentralized & Portable:</strong> Build permanent
                  verified credibility badges
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section" aria-label="Frequently Asked Questions">
        <div className="faq-header">
          <span className="section-micro-tag">CLARITY FIRST</span>
          <h2 className="section-main-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Everything you need to know about peer-to-peer exchange rules,
            scheduling, and trust.
          </p>
        </div>

        <div className="faq-accordion-list">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.q} className="faq-card">
                <button
                  type="button"
                  className="faq-trigger-btn"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`faq-chevron ${isOpen ? "open" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="faq-answer-pane">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="how-cta-banner-section"
        aria-label="Join Knowledge Commons"
      >
        <div className="how-cta-banner">
          <span className="banner-micro-tag">JOIN THE KNOWLEDGE COMMONS</span>
          <h2 className="banner-headline">Ready to swap skills, not currency?</h2>
          <p className="banner-subtext">
            Join 24,000+ independent builders, designers, and thinkers swapping
            knowledge every week without spending a dime.
          </p>

          <div className="banner-actions-row">
            <button
              type="button"
              className="banner-btn-white"
              onClick={handleStartSwap}
            >
              <span>Create Free Profile (Takes 3 Mins)</span>
            </button>

            <button
              type="button"
              className="banner-btn-outline"
              onClick={handleExploreDirectory}
            >
              <span>Explore Skill Directory ↗</span>
            </button>
          </div>
        </div>
      </section>


      {isDemoOpen && (
        <div className="demo-modal-overlay" onClick={() => setIsDemoOpen(false)}>
          <div
            className="demo-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsDemoOpen(false)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="modal-header-icon">
              <Play size={24} fill="currentColor" />
            </div>

            <h3 className="modal-title">Interactive Match Demo</h3>
            <p className="modal-desc">
              Experience the 4-stage reciprocal exchange lifecycle in simulated
              real time:
            </p>

            <div className="modal-steps-list">
              <div className="modal-step-item">
                <span className="modal-step-num">1</span>
                <div>
                  <div className="modal-step-title">Specify Dual Ambition</div>
                  <div className="modal-step-sub">
                    You teach React.js ⇄ You seek Figma design systems
                  </div>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">2</span>
                <div>
                  <div className="modal-step-title">Instant Reciprocal Match</div>
                  <div className="modal-step-sub">
                    Elena R. (London) matched at 96.4% complementarity
                  </div>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">3</span>
                <div>
                  <div className="modal-step-title">Time-Bank Escrow Opened</div>
                  <div className="modal-step-sub">
                    Anti-ghosting guarantee locked with calendar sync
                  </div>
                </div>
              </div>

              <div className="modal-step-item">
                <span className="modal-step-num">4</span>
                <div>
                  <div className="modal-step-title">Two-Way Live Split Session</div>
                  <div className="modal-step-sub">
                    30 mins React code lab + 30 mins Figma prototype review
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="how-btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                setIsDemoOpen(false);
                handleStartSwap();
              }}
            >
              <span>Launch Match Finder Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HowToWork;