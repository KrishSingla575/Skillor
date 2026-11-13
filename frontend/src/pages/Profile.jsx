import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Languages,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  MessageSquare,
  ShieldCheck,
  BookOpen,
  Award
} from 'lucide-react';



import './Profile.css';

export default function Profile({ userId, openChat, setActivePage }) {
  const navigate = (path) => {
    if (path === '/discover') setActivePage?.('matches');
    else if (path === '/chat') setActivePage?.('dashboard');
  };
  const currentUser = null;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');


  const [showProposal, setShowProposal] = useState(false);
  const [proposal, setProposal] = useState({
    offered: '',
    requested: '',
    message: '',
  });

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const idToFetch = userId || (currentUser ? currentUser.id : 'usr_priya');
        const res = await api.users.getUserById(idToFetch);
        if (res.success && res.user) {
          setUser(res.user);
          setProposal({
            offered: res.user.wants?.[0]?.skillName || 'React',
            requested: res.user.teaches?.[0]?.skillName || 'UI/UX Design',
            message: `Hi ${res.user.name}! I would love to connect and exchange complementary skills with you.`,
          });
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId, currentUser]);

  const handleSendProposal = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await api.requests.createRequest({
        receiverId: user.id,
        senderSkills: [proposal.offered],
        receiverSkills: [proposal.requested],
        message: proposal.message,
      });
      if (res.success) {
        setToastMsg(`Proposal sent to ${user.name}!`);
        setShowProposal(false);
        setTimeout(() => setToastMsg(''), 4000);
      } else {
        setToastMsg(res.message || 'Could not send proposal.');
      }
    } catch (e) {
      setToastMsg('Error submitting proposal.');
    }
  };

  const isMyProfile = currentUser && user && String(currentUser.id) === String(user.id);

  if (loading) {
    return (
      <div className="profile-loading-screen">
        <div className="profile-spinner" />
        <p>Loading member profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-not-found">
        <h2>Member Profile Not Found</h2>
        <p>The user profile you are looking for does not exist or has been updated.</p>
        <button type="button" onClick={() => navigate('/discover')} className="profile-btn primary">
          Explore Member Directory
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      {toastMsg && (
        <div className="profile-toast" role="status">
          <CheckCircle2 size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="profile-top-bar">
        <button type="button" className="profile-back-link" onClick={() => navigate('/discover')}>
          <ArrowLeft size={16} />
          <span>Back to Discover</span>
        </button>

        {isMyProfile && (
          <button
            type="button"
            className="profile-btn outline"
            onClick={() => navigate('/profile/edit')}
          >
            Edit My Profile
          </button>
        )}
      </div>

      {/* Header Card */}
      <div className="profile-header-card">
        <div className="profile-header-grid">
          <div className="profile-avatar-large">
            {user.avatar || (user.name ? user.name.slice(0, 2).toUpperCase() : 'SK')}
            {user.online && <span className="profile-online-badge" />}
          </div>

          <div className="profile-info-main">
            <div className="profile-name-row">
              <h1>{user.name}</h1>
              <span className="profile-verified-badge">
                <ShieldCheck size={14} /> Verified Member
              </span>
            </div>

            <span className="profile-username">@{user.username || 'member'}</span>

            <p className="profile-bio-text">{user.bio}</p>

            <div className="profile-meta-chips">
              <span className="meta-chip">
                <MapPin size={13} /> {user.location || 'Remote'}
              </span>
              <span className="meta-chip">
                <Calendar size={13} /> {user.availability || 'Available Weekends'}
              </span>
              <span className="meta-chip">
                <Languages size={13} /> {(user.languages || ['English']).join(', ')}
              </span>
            </div>
          </div>

          {!isMyProfile && (
            <div className="profile-actions-panel">
              <button
                type="button"
                className="profile-btn primary large"
                onClick={() => setShowProposal(true)}
              >
                <Send size={16} />
                <span>Propose Skill Swap</span>
              </button>

              <button
                type="button"
                className="profile-btn outline large"
                onClick={() => {
                  if (openChat) openChat();
                  else navigate('/chat');
                }}
              >
                <MessageSquare size={16} />
                <span>Send Message</span>
              </button>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="profile-stats-strip">
          <div className="profile-stat-box">
            <span className="stat-num">{user.rating || 4.95} ★</span>
            <span className="stat-label">Peer Rating</span>
          </div>

          <div className="profile-stat-box">
            <span className="stat-num">{user.hoursTaught || 24}h</span>
            <span className="stat-label">Hours Taught</span>
          </div>

          <div className="profile-stat-box">
            <span className="stat-num">{user.hoursLearned || 20}h</span>
            <span className="stat-label">Hours Learned</span>
          </div>

          <div className="profile-stat-box">
            <span className="stat-num">{user.reviewsCount || 18}</span>
            <span className="stat-label">Completed Exchanges</span>
          </div>
        </div>
      </div>

      {/* Skills Showcase Grid */}
      <div className="profile-skills-grid">
        {/* Teaching Skills */}
        <div className="profile-section-card">
          <div className="section-card-header">
            <BookOpen size={18} className="icon-teach" />
            <h2>Skills I Can Teach (Mastery)</h2>
          </div>

          <div className="skills-pill-list">
            {(user.teaches || []).length === 0 ? (
              <p className="no-skills-notice">No teaching skills listed yet.</p>
            ) : (
              (user.teaches || []).map((s) => (
                <div
                  key={s.id || s.skillName}
                  className="skill-detailed-pill teach"
                  onClick={() => navigate(`/skills/${encodeURIComponent(s.skillName || s)}`)}
                >
                  <div className="skill-pill-left">
                    <span className="skill-name">{s.skillName || s}</span>
                    <span className="skill-level-tag">{s.level || 'Expert'}</span>
                  </div>
                  <Sparkles size={14} className="sparkle-tag" />
                </div>
              ))
            )}
          </div>
        </div>


        <div className="profile-section-card">
          <div className="section-card-header">
            <Sparkles size={18} className="icon-learn" />
            <h2>Skills I Want to Learn (Goals)</h2>
          </div>

          <div className="skills-pill-list">
            {(user.wants || []).length === 0 ? (
              <p className="no-skills-notice">No learning goals listed yet.</p>
            ) : (
              (user.wants || []).map((s) => (
                <div
                  key={s.id || s.skillName}
                  className="skill-detailed-pill learn"
                  onClick={() => navigate(`/skills/${encodeURIComponent(s.skillName || s)}`)}
                >
                  <div className="skill-pill-left">
                    <span className="skill-name">{s.skillName || s}</span>
                    <span className="skill-level-tag">{s.level || 'Beginner'}</span>
                  </div>
                  <Clock size={14} className="clock-tag" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>


      <div className="profile-section-card" style={{ marginTop: '24px' }}>
        <div className="section-card-header">
          <Award size={18} className="icon-reviews" />
          <h2>Verified Community Reviews ({(user.reviews || []).length})</h2>
        </div>

        <div className="reviews-list">
          {(user.reviews || []).length === 0 ? (
            <p className="no-skills-notice">No peer reviews yet. Complete an exchange to receive verified feedback!</p>
          ) : (
            (user.reviews || []).map((r) => (
              <div key={r.id} className="review-item-card">
                <div className="review-item-top">
                  <div className="reviewer-avatar">{r.reviewerAvatar || 'VM'}</div>
                  <div className="reviewer-meta">
                    <h4>{r.reviewerName || 'Verified Peer'}</h4>
                    <span className="review-date">{new Date(r.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <div className="review-stars">
                    {'★'.repeat(r.rating || 5)}
                  </div>
                </div>
                <p className="review-comment-text">&ldquo;{r.comment}&rdquo;</p>
              </div>
            ))
          )}
        </div>
      </div>


      {showProposal && (
        <div className="profile-modal-backdrop" onClick={() => setShowProposal(false)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Send Swap Proposal to {user.name}</h2>
            <p className="modal-sub">
              Specify what you can teach and what you want to learn from {user.name}.
            </p>

            <form onSubmit={handleSendProposal} className="profile-modal-form">
              <div className="form-group">
                <label>Skill You Offer to Teach</label>
                <input
                  type="text"
                  value={proposal.offered}
                  onChange={(e) => setProposal({ ...proposal, offered: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Skill You Wish to Learn</label>
                <input
                  type="text"
                  value={proposal.requested}
                  onChange={(e) => setProposal({ ...proposal, requested: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows={3}
                  value={proposal.message}
                  onChange={(e) => setProposal({ ...proposal, message: e.target.value })}
                  required
                />
              </div>

              <div className="profile-modal-actions">
                <button
                  type="button"
                  className="profile-btn outline"
                  onClick={() => setShowProposal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="profile-btn primary">
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

