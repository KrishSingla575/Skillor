import { useState, useEffect, useCallback } from "react";
import "./Request.css";
import {
  ArrowLeftRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  CirclePlus,
  Filter,
  Inbox,
  Handshake,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  CircleX,
  X
} from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

const tabs = [
  { id: "incoming", label: "Incoming" },
  { id: "sent", label: "Sent Proposals" },
  { id: "accepted", label: "Accepted" },
  { id: "closed", label: "Declined & Closed" },
];

function normalizeRequest(request, currentUser) {
  const id = request.id ?? request._id;
  const rawSenderId = request.senderId ?? request.sender?.id ?? request.sender?._id;
  const senderId = rawSenderId && typeof rawSenderId === "object"
    ? rawSenderId.id ?? rawSenderId._id
    : rawSenderId;
  const isSender = senderId != null && String(senderId) === String(currentUser?.id ?? currentUser?._id);
  const rawStatus = String(request.status || "pending").toLowerCase();
  let status = rawStatus;

  if (["pending", "requested"].includes(rawStatus)) status = isSender ? "sent" : "incoming";
  if (["rejected", "declined", "cancelled", "canceled"].includes(rawStatus)) status = "closed";
  if (rawStatus === "completed") status = "completed";
  if (["outgoing"].includes(rawStatus)) status = "sent";

  const peer = isSender ? request.receiver : request.sender;
  const asList = (value) => Array.isArray(value) ? value : value ? [value] : [];

  return {
    ...request,
    id,
    status,
    name: request.name ?? peer?.name ?? "Skillor member",
    username: request.username ?? peer?.username ?? "",
    avatar: request.avatar ?? peer?.avatar ?? (peer?.name || "SM").slice(0, 2).toUpperCase(),
    location: request.location ?? peer?.location ?? "Location not provided",
    rating: request.rating ?? peer?.rating ?? "—",
    availability: request.availability ?? peer?.availability ?? "Availability not provided",
    offeredTitle: request.offeredTitle ?? request.senderSkillTitle ?? "Skill offered",
    requestedTitle: request.requestedTitle ?? request.receiverSkillTitle ?? "Skill requested",
    offeredSkills: asList(request.offeredSkills ?? request.senderSkills),
    requestedSkills: asList(request.requestedSkills ?? request.receiverSkills),
    quote: request.quote ?? request.message ?? "",
    date: request.date ?? request.proposedDate ?? "Date not set",
    time: request.time ?? request.proposedTime ?? "Time not set",
  };
}

export default function ExchangeRequests({ setActivePage, openChat }) {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("incoming");
  const [search, setSearch] = useState("");
  const [minMatch, setMinMatch] = useState("0");
  const [weekendOnly, setWeekendOnly] = useState(false);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [busyRequestId, setBusyRequestId] = useState(null);

  const [selectedMember, setSelectedMember] = useState(null);
  const [showNewProposalModal, setShowNewProposalModal] = useState(false);
  const [directoryUsers, setDirectoryUsers] = useState([]);
  const [newProposal, setNewProposal] = useState({
    receiverId: "",
    offeredTitle: "",
    offeredSkills: "",
    requestedTitle: "",
    requestedSkills: "",
    message: "",
    proposedDate: "",
    proposedTime: "",
  });
  const [submittingProposal, setSubmittingProposal] = useState(false);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await api.requests.getRequests();
      const records = res.requests ?? res.data?.requests;
      if (res.success && Array.isArray(records)) {
        setRequests(records.map((request) => normalizeRequest(request, currentUser)));
      } else {
        setRequests([]);
        setLoadError(res.message || "Requests could not be loaded. Please try again.");
      }
    } catch {
      setRequests([]);
      setLoadError("Could not connect to the server. Check that the backend is running and try again.");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    async function loadDirectory() {
      try {
        const res = await api.users.getUsers();
        const users = res.users ?? res.data?.users;
        if (res.success && Array.isArray(users)) {
          const eligibleUsers = users.filter((user) => String(user.id ?? user._id) !== String(currentUser?.id ?? currentUser?._id));
          setDirectoryUsers(eligibleUsers);
          if (eligibleUsers.length > 0 && !newProposal.receiverId) {
            setNewProposal((prev) => ({ ...prev, receiverId: eligibleUsers[0].id ?? eligibleUsers[0]._id }));
          }
        }
      } catch {
        setNotice("Could not load the member directory. Please try again later.");
      }
    }
    loadDirectory();
  }, [currentUser, newProposal.receiverId]);

  const counts = {
    incoming: requests.filter((r) => r.status === "incoming").length,
    sent: requests.filter((r) => r.status === "sent").length,
    accepted: requests.filter((r) => r.status === "accepted").length,
    closed: requests.filter((r) => ["closed", "completed"].includes(r.status)).length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  const handleAccept = async (id, name) => {
    setBusyRequestId(id);
    try {
      const res = await api.requests.acceptRequest(id);
      if (res.success) {
        await fetchRequests();
        setNotice(`Exchange with ${name} accepted! Live session scheduled.`);
      } else setNotice(res.message || "The request could not be accepted.");
    } catch { setNotice("Could not connect to the server. Please try again."); }
    finally { setBusyRequestId(null); }
  };

  const handleReject = async (id, name) => {
    setBusyRequestId(id);
    try {
      const res = await api.requests.rejectRequest(id);
      if (res.success) {
        await fetchRequests();
        setNotice(`Request from ${name} declined.`);
      } else setNotice(res.message || "The request could not be declined.");
    } catch { setNotice("Could not connect to the server. Please try again."); }
    finally { setBusyRequestId(null); }
  };

  const handleCreateProposalSubmit = async (e) => {
    e.preventDefault();
    if (!newProposal.receiverId) {
      setNotice("Select a peer before sending the proposal.");
      return;
    }

    setSubmittingProposal(true);
    try {
      const res = await api.requests.createRequest({
        receiverId: newProposal.receiverId,
        offeredTitle: newProposal.offeredTitle,
        senderSkills: newProposal.offeredSkills.split(",").map((s) => s.trim()),
        requestedTitle: newProposal.requestedTitle,
        receiverSkills: newProposal.requestedSkills.split(",").map((s) => s.trim()),
        message: newProposal.message,
        proposedDate: newProposal.proposedDate,
        proposedTime: newProposal.proposedTime,
      });

      if (res.success) {
        setNotice("New bilateral swap proposal submitted successfully!");
        setShowNewProposalModal(false);
        await fetchRequests();
        setActiveTab("sent");
      } else {
        setNotice(res.message || "Failed to create proposal.");
      }
    } catch {
      setNotice("Could not connect to the server. Please try again.");
    } finally {
      setSubmittingProposal(false);
    }
  };

  const filteredRequests = requests.filter((request) => {
      const tabMatches = activeTab === "closed"
        ? ["closed", "completed"].includes(request.status)
        : request.status === activeTab;
    const searchText = [
      request.name,
      request.offeredTitle,
      request.requestedTitle,
      ...(request.offeredSkills || []),
      ...(request.requestedSkills || []),
    ]
      .join(" ")
      .toLowerCase();

    const searchMatches = searchText.includes(search.toLowerCase());
    const matchMatches = (request.compatibility || 90) >= Number(minMatch);
    const weekendMatches =
      !weekendOnly ||
      (request.availability && request.availability.toLowerCase().includes("weekend"));

    return tabMatches && searchMatches && matchMatches && weekendMatches;
  });

  return (
    <main className="exchange-page">
      {notice && (
        <div className="exchange-toast" role="status">
          <CheckCircle2 size={17} /> {notice}
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <CircleX size={17} />
          </button>
        </div>
      )}

      <section className="exchange-hero">
        <div className="exchange-hero-heading">
          <div>
            <h1>Exchange Requests</h1>
            <p>
              Review, manage, and coordinate your bilateral skill learning
              proposals and active peer invitations.
            </p>
          </div>

          <div className="exchange-hero-actions">
            <button
              className="exchange-btn exchange-btn-light"
              onClick={() => setActiveTab("sent")}
            >
              <Send size={15} /> Track Sent ({counts.sent})
            </button>
            <button
              className="exchange-btn exchange-btn-primary"
              onClick={() => setShowNewProposalModal(true)}
            >
              <CirclePlus size={15} /> New Swap Proposal
            </button>
          </div>
        </div>

        <div className="exchange-stats-grid">
          <div className="exchange-stat">
            <div className="exchange-stat-info">
              <span className="exchange-stat-label">Pending</span>
              <strong>{counts.incoming}</strong>
              <span className="exchange-stat-subtitle orange">
                Action Required
              </span>
            </div>
            <div className="exchange-stat-icon orange">
              <Mail size={19} />
            </div>
          </div>
          <div className="exchange-stat">
            <div className="exchange-stat-info">
              <span className="exchange-stat-label">Accepted</span>
              <strong>{counts.accepted}</strong>
              <span className="exchange-stat-subtitle teal">
                {counts.accepted} Active Sessions
              </span>
            </div>
            <div className="exchange-stat-icon teal">
              <Handshake size={20} />
            </div>
          </div>
          <div className="exchange-stat">
            <div className="exchange-stat-info">
              <span className="exchange-stat-label">Sent Proposals</span>
              <strong>{counts.sent}</strong>
              <span className="exchange-stat-subtitle purple">
                Awaiting peer reply
              </span>
            </div>
            <div className="exchange-stat-icon purple">
              <Send size={19} />
            </div>
          </div>
          <div className="exchange-stat">
            <div className="exchange-stat-info">
              <span className="exchange-stat-label">Completed Exchanges</span>
              <strong>
                {counts.completed}{" "}
                <small className="exchange-rating">
                  <Star size={12} fill="currentColor" />
                </small>
              </strong>
              <span className="exchange-stat-subtitle slate">
                100% Reciprocal release
              </span>
            </div>
            <div className="exchange-stat-icon slate">
              <Settings size={19} />
            </div>
          </div>
        </div>
      </section>

      <section className="exchange-toolbar">
        <div
          className="exchange-tabs"
          role="tablist"
          aria-label="Request categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`exchange-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span>{counts[tab.id]}</span>
            </button>
          ))}
        </div>

        <div className="exchange-filters">
          <div className="exchange-search">
            <Filter size={14} />
            <input
              type="search"
              placeholder="Filter by peer or skill..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search by peer or skill"
            />
          </div>

          <select
            value={minMatch}
            onChange={(event) => setMinMatch(event.target.value)}
            aria-label="Minimum compatibility"
          >
            <option value="0">Any Match</option>
            <option value="80">80%+ Match</option>
            <option value="90">90%+ Match</option>
            <option value="95">95%+ Match</option>
          </select>

          <button
            className={`exchange-filter-chip ${weekendOnly ? "selected" : ""}`}
            onClick={() => setWeekendOnly((value) => !value)}
          >
            This Weekend
          </button>
        </div>
      </section>

      <section className="exchange-list">
        {loading ? (
          <div className="exchange-empty" role="status">Loading exchange requests…</div>
        ) : loadError ? (
          <div className="exchange-empty" role="alert">
            <Inbox size={34} aria-hidden="true" />
            <h3>Couldn’t load requests</h3>
            <p>{loadError}</p>
            <button className="exchange-btn exchange-btn-light" onClick={fetchRequests}>Try again</button>
          </div>
        ) : filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <article className="exchange-request-card" key={request.id}>
              <div className="exchange-person-row">
                <div className={`exchange-avatar ${request.avatarColor || "peach"}`}>
                  {request.avatar || "SM"}
                  <span
                    className={`exchange-online ${request.online ? "is-online" : ""}`}
                  />
                </div>
                <div className="exchange-person-info">
                  <div className="exchange-person-name">
                    <h3>{request.name}</h3>
                    <span className="exchange-username">
                      {request.username}
                    </span>
                    <span className="exchange-member-badge">
                      <BadgeCheck size={11} /> {request.badge || "VERIFIED TUTOR"}
                    </span>
                  </div>
                  <div className="exchange-person-meta">
                    <span>
                      <MapPin size={12} /> {request.location}
                    </span>
                    <span className="exchange-rating">
                      <Star size={12} /> {request.rating} ({request.swaps || 24}{" "}
                      swaps)
                    </span>
                    <span>
                      <CalendarDays size={12} /> {request.availability}
                    </span>
                  </div>
                </div>
                <div className="exchange-match">
                  <strong>
                    <Sparkles size={13} /> {request.compatibility || 95}%{" "}
                    {request.matchLabel || "Match Synergy"}
                  </strong>
                  <span>Direct 1:1 Reciprocal Pair</span>
                </div>
              </div>

              <div className="exchange-skills-panel">
                <div className="exchange-skill-column">
                  <span className="exchange-skill-label">
                    THEY OFFER TO TEACH <b>Level: Lead / Senior</b>
                  </span>
                  <h4>{request.offeredTitle}</h4>
                  <div className="exchange-tags">
                    {(request.offeredSkills || []).map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="exchange-duration">
                  <span className="exchange-swap-symbol">
                    <ArrowLeftRight size={19} />
                  </span>
                </div>
                <div className="exchange-skill-column requested">
                  <span className="exchange-skill-label">
                    YOUR REQUESTED SKILL <b>YOU TEACH</b>
                  </span>
                  <h4>{request.requestedTitle}</h4>
                  <div className="exchange-tags">
                    {(request.requestedSkills || []).map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="exchange-quote">
                “{request.quote}”
              </blockquote>

              <div className="exchange-card-footer">
                <div className="exchange-proposal-info">
                  <span>
                    <CalendarDays size={13} /> Proposed: {request.date} •{" "}
                    {request.time}
                  </span>
                </div>
                <div className="exchange-actions">
                  {request.status === "incoming" ? (
                    <>
                      <button
                        className="exchange-btn exchange-btn-primary"
                        onClick={() => handleAccept(request.id, request.name)}
                        disabled={busyRequestId === request.id}
                      >
                        <CheckCircle2 size={14} /> {busyRequestId === request.id ? "Saving…" : "Accept Exchange"}
                      </button>
                      <button
                        className="exchange-btn exchange-btn-light"
                        onClick={() => handleReject(request.id, request.name)}
                        disabled={busyRequestId === request.id}
                      >
                        <CircleX size={14} /> Decline
                      </button>
                    </>
                  ) : (
                    <span
                      className={`exchange-status status-${request.status}`}
                    >
                      {request.status === "sent"
                        ? "Awaiting reply"
                        : request.status === "accepted"
                        ? "✓ Accepted & Active"
                        : "Closed"}
                    </span>
                  )}
                  <button
                    className="exchange-icon-btn"
                    aria-label={`Message ${request.name}`}
                    onClick={() => {
                      if (openChat) {
                        openChat();
                      } else if (setActivePage) {
                        setActivePage("messages");
                      }
                    }}
                    title="Open Direct Chat"
                  >
                    <MessageSquare size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="exchange-empty">
            <Inbox size={34} aria-hidden="true" />
            <h3>No requests found</h3>
            <p>Try another tab or change your search and filters.</p>
            <button
              className="exchange-btn exchange-btn-light"
              onClick={() => {
                setSearch("");
                setMinMatch("0");
                setWeekendOnly(false);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {selectedMember && (
        <div
          className="exchange-modal-backdrop"
          onClick={() => setSelectedMember(null)}
        >
          <section
            className="exchange-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exchange-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="exchange-modal-title">{selectedMember.name}</h2>
            <p>
              {selectedMember.username} · {selectedMember.location}
            </p>
            <div className="exchange-modal-detail">
              <strong>{selectedMember.compatibility}% compatibility</strong>
              <p>Offers: {selectedMember.offeredTitle}</p>
              <p>Wants to learn: {selectedMember.requestedTitle}</p>
              <p>{selectedMember.quote}</p>
            </div>
            <div className="exchange-modal-actions">
              <button
                className="exchange-btn exchange-btn-primary full-width"
                onClick={() => {
                  setSelectedMember(null);
                  if (openChat) openChat();
                }}
              >
                Open Chat Conversation
              </button>
              <button
                className="exchange-btn exchange-btn-light"
                onClick={() => setSelectedMember(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}

      {showNewProposalModal && (
        <div
          className="exchange-modal-backdrop"
          onClick={() => setShowNewProposalModal(false)}
        >
          <div
            className="exchange-modal proposal-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="exchange-modal-header">
              <h2>Create New Swap Proposal</h2>
              <button
                type="button"
                className="exchange-modal-close"
                onClick={() => setShowNewProposalModal(false)}
                aria-label="Close proposal form"
              >
                <X size={18} />
              </button>
            </div>

            <p className="exchange-modal-description">
              Select a peer from the directory and specify the reciprocal skills you wish to exchange.
            </p>

            <form onSubmit={handleCreateProposalSubmit}>
              <div className="exchange-form-field">
                <label className="exchange-form-label">
                  Select Peer Partner
                </label>
                <select
                  className="exchange-form-control"
                  value={newProposal.receiverId}
                  onChange={(e) => setNewProposal({ ...newProposal, receiverId: e.target.value })}
                  required
                >
                  <option value="" disabled>Select a peer</option>
                  {directoryUsers.map((u) => (
                    <option key={u.id ?? u._id} value={u.id ?? u._id}>
                      {u.name} ({u.location}) — Teaches: {(u.teaches || []).slice(0, 2).join(", ")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="exchange-form-grid">
                <div className="exchange-form-field">
                  <label className="exchange-form-label">
                    Skill You Offer to Teach
                  </label>
                  <input
                    type="text"
                    className="exchange-form-control"
                    value={newProposal.offeredSkills}
                    onChange={(e) => setNewProposal({ ...newProposal, offeredSkills: e.target.value, offeredTitle: `${e.target.value} Mentorship` })}
                    placeholder="e.g. React, Python"
                    required
                  />
                </div>
                <div className="exchange-form-field">
                  <label className="exchange-form-label">
                    Skill You Wish to Learn
                  </label>
                  <input
                    type="text"
                    className="exchange-form-control"
                    value={newProposal.requestedSkills}
                    onChange={(e) => setNewProposal({ ...newProposal, requestedSkills: e.target.value, requestedTitle: `${e.target.value} Guidance` })}
                    placeholder="e.g. Figma, UI/UX"
                    required
                  />
                </div>
              </div>

              <div className="exchange-form-grid">
                <div className="exchange-form-field">
                  <label className="exchange-form-label">
                    Proposed Day
                  </label>
                  <input
                    type="date"
                    className="exchange-form-control"
                    value={newProposal.proposedDate}
                    onChange={(e) => setNewProposal({ ...newProposal, proposedDate: e.target.value })}
                  />
                </div>
                <div className="exchange-form-field">
                  <label className="exchange-form-label">
                    Proposed Time
                  </label>
                  <input
                    type="time"
                    className="exchange-form-control"
                    value={newProposal.proposedTime}
                    onChange={(e) => setNewProposal({ ...newProposal, proposedTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="exchange-form-field exchange-form-message">
                <label className="exchange-form-label">
                  Proposal Message
                </label>
                <textarea
                  rows={3}
                  className="exchange-form-control"
                  value={newProposal.message}
                  onChange={(e) => setNewProposal({ ...newProposal, message: e.target.value })}
                  required
                />
              </div>

              <div className="exchange-modal-actions proposal-actions">
                <button
                  type="button"
                  className="exchange-btn exchange-btn-light proposal-cancel"
                  onClick={() => setShowNewProposalModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="exchange-btn exchange-btn-primary proposal-submit"
                  disabled={submittingProposal}
                >
                  {submittingProposal ? "Submitting..." : "Send Swap Proposal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
