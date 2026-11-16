
import { useEffect, useState } from "react";
import {
  CalendarDays,
  CirclePlus,
  Clock3,
  UserRound,
  Video,
  X,
  RefreshCw,
  CheckCircle2,
  Ban,
} from "lucide-react";

import { api } from "../services/api";
import "./Sessions.css";

const today = new Date().toLocaleDateString("en-CA");

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [members, setMembers] = useState([]);

  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    learnerId: "",
    skill: "",
    date: "",
    time: "",
    duration: "60",
  });

  // Fetch sessions from PostgreSQL backend
  const fetchSessions = async () => {
    setLoading(true);

    try {
      const response = await api.sessions.getSessions();

      if (!response.success) {
        throw new Error(response.message || "Unable to load sessions");
      }

      setSessions(
        response.sessions ||
        response.data?.sessions ||
        []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch learning partners
  const fetchMembers = async () => {
    try {
      const response = await api.users.getUsers();

      const users =
        response.users ||
        response.data?.users ||
        [];

      if (response.success) {
        setMembers(users);
      }
    } catch (err) {
      console.error("Members error:", err);
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchMembers();
  }, []);

  const getStatus = (session) => {
    const status = (session.status || "scheduled").toLowerCase();

    if (status === "completed") return "completed";
    if (status === "cancelled" || status === "canceled") return "cancelled";

    return "upcoming";
  };

  const upcoming = sessions.filter(
    (s) => getStatus(s) === "upcoming"
  );

  const completed = sessions.filter(
    (s) => getStatus(s) === "completed"
  );

  const filteredSessions =
    activeTab === "upcoming"
      ? upcoming
      : activeTab === "completed"
        ? completed
        : sessions;

  // Schedule new session
  const handleSchedule = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await api.sessions.createSession({
        learnerId: form.learnerId,
        skill: form.skill.trim(),
        date: form.date,
        time: form.time,
        duration: Number(form.duration),
      });

      if (!response.success) {
        throw new Error(response.message || "Scheduling failed");
      }

      setShowModal(false);

      setNotice("Session scheduled successfully!");

      setForm({
        learnerId: "",
        skill: "",
        date: "",
        time: "",
        duration: "60",
      });

      await fetchSessions();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Complete or cancel session
  const handleAction = async (id, action) => {
    try {
      const response =
        action === "complete"
          ? await api.sessions.completeSession(id)
          : await api.sessions.cancelSession(id);

      if (!response.success) {
        throw new Error(response.message);
      }

      setNotice(
        action === "complete"
          ? "Session completed successfully!"
          : "Session cancelled successfully!"
      );

      await fetchSessions();
    } catch (err) {
      setNotice(err.message || "Something went wrong");
    }
  };

  const getPartnerName = (session) => {
    return (
      session.partner?.name ||
      session.teacher?.name ||
      session.learner?.name ||
      session.partnerName ||
      session.teacherName ||
      session.learnerName ||
      "Skillor Member"
    );
  };

  const getSessionDate = (session) => {
    const value = session.date || session.scheduled_date;

    if (!value) return "Date not available";

    const date = new Date(`${String(value).slice(0, 10)}T12:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="sessions-page">

      {/* Header */}
      <header className="sessions-header">

        <div className="sessions-eyebrow">
          <CalendarDays size={16} />
          Reciprocal Timebank Schedule
        </div>

        <h1>Learning & Teaching Sessions</h1>

        <p>
          Track your scheduled 1:1 sessions, launch live
          encrypted video rooms, and log completed
          reciprocal hours.
        </p>

        <button
          className="sessions-primary-button"
          onClick={() => {
            setError("");
            setShowModal(true);
          }}
        >
          <CirclePlus size={18} />
          Schedule New Session
        </button>

      </header>

      {/* Notification */}
      {notice && (
        <div className="sessions-notice">
          {notice}
          <button onClick={() => setNotice("")}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <nav className="sessions-tabs">

        {[
          ["upcoming", "Upcoming Sessions", upcoming.length],
          ["completed", "Completed Sessions", completed.length],
          ["all", "All Sessions", sessions.length],
        ].map(([id, label, count]) => (

          <button
            key={id}
            className={`sessions-tab ${
              activeTab === id ? "is-active" : ""
            }`}
            onClick={() => setActiveTab(id)}
          >
            {label} ({count})
          </button>

        ))}

      </nav>

      {/* Loading */}
      {loading ? (

        <div className="sessions-state">
          <RefreshCw className="sessions-spinner" size={30} />
          <p>Loading sessions...</p>
        </div>

      ) : error && sessions.length === 0 ? (

        <div className="sessions-state sessions-error">
          <p>{error}</p>

          <button
            className="sessions-secondary-button"
            onClick={fetchSessions}
          >
            Try Again
          </button>
        </div>

      ) : filteredSessions.length === 0 ? (

        /* Empty state */
        <div className="sessions-empty">

          <CalendarDays size={42} />

          <h2>
            {activeTab === "completed"
              ? "No completed sessions found"
              : activeTab === "all"
                ? "No sessions found"
                : "No upcoming sessions found"}
          </h2>

          <p>
            Coordinate an exchange in Requests or Matches
            to schedule a live learning session.
          </p>

          <button
            className="sessions-secondary-button"
            onClick={() => setShowModal(true)}
          >
            View / Schedule Sessions
          </button>

        </div>

      ) : (

        /* Sessions List */
        <section className="sessions-list">

          {filteredSessions.map((session) => {

            const id = session.id || session._id;
            const status = getStatus(session);

            return (

              <article className="session-card" key={id}>

                <div>

                  <span
                    className={`session-status ${
                      status === "completed"
                        ? "is-completed"
                        : status === "cancelled"
                          ? "is-cancelled"
                          : ""
                    }`}
                  >
                    {status}
                  </span>

                  <h2>
                    {session.skill || session.topic}
                  </h2>

                  <div className="session-card-details">

                    <span>
                      <UserRound size={16} />
                      {getPartnerName(session)}
                    </span>

                    <span>
                      <CalendarDays size={16} />
                      {getSessionDate(session)}
                    </span>

                    <span>
                      <Clock3 size={16} />
                      {session.time || session.scheduled_time || "Time not set"}
                      {" · "}
                      {session.duration || 60} minutes
                    </span>

                  </div>

                </div>

                {status === "upcoming" && (

                  <div className="session-card-actions">

                    {(session.meetingUrl || session.meeting_url) && (
                      <a
                        className="sessions-primary-button"
                        href={session.meetingUrl || session.meeting_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Video size={16} />
                        Join Session
                      </a>
                    )}

                    <button
                      className="sessions-secondary-button"
                      onClick={() => handleAction(id, "complete")}
                    >
                      <CheckCircle2 size={16} />
                      Complete
                    </button>

                    <button
                      className="sessions-secondary-button"
                      onClick={() => handleAction(id, "cancel")}
                    >
                      <Ban size={16} />
                      Cancel
                    </button>

                  </div>

                )}

              </article>

            );
          })}

        </section>

      )}

      {/* Schedule Modal */}
      {showModal && (

        <div className="sessions-modal-backdrop">

          <section className="sessions-modal">

            <button
              className="sessions-modal-close"
              onClick={() => setShowModal(false)}
            >
              <X size={22} />
            </button>

            <div className="sessions-eyebrow">
              <Video size={16} />
              Live Learning Session
            </div>

            <h2>Schedule a new session</h2>

            <p className="sessions-modal-description">
              Coordinate your reciprocal 1:1 learning swap.
            </p>

            <form
              className="sessions-form"
              onSubmit={handleSchedule}
            >

              <label>
                Skill partner

                <select
                  value={form.learnerId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      learnerId: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select a partner</option>

                  {members.map((member) => (
                    <option
                      key={member.id || member._id}
                      value={member.id || member._id}
                    >
                      {member.name}
                    </option>
                  ))}

                </select>
              </label>

              <label>
                Focus skill or topic

                <input
                  type="text"
                  placeholder="e.g. React, Python"
                  maxLength={120}
                  value={form.skill}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      skill: e.target.value,
                    })
                  }
                  required
                />
              </label>

              <div className="sessions-form-row">

                <label>
                  Date

                  <input
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Time

                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        time: e.target.value,
                      })
                    }
                    required
                  />
                </label>

              </div>

              <label>
                Duration

                <select
                  className="sessions-form-duration"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration: e.target.value,
                    })
                  }
                >
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </label>

              {error && (
                <p className="sessions-form-error">
                  {error}
                </p>
              )}

              <div className="sessions-form-actions">

                <button
                  type="button"
                  className="sessions-secondary-button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="sessions-primary-button"
                  disabled={submitting}
                >
                  {submitting
                    ? "Scheduling..."
                    : "Schedule Session"}
                </button>

              </div>

            </form>

          </section>

        </div>

      )}

    </main>
  );
}
