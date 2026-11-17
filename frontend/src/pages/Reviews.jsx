import React, { useState, useEffect } from 'react';
import {
  Star,
  Award,
  CheckCircle2,
  Send,
  MessageSquare,
  ShieldCheck,
  ThumbsUp,
  User,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Reviews.css';

export default function Reviews() {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [peers, setPeers] = useState([]);
  const [activeTab, setActiveTab] = useState('received'); // 'received' | 'give'
  const [toastMsg, setToastMsg] = useState('');
  const [loading, setLoading] = useState(true);

  // New review form
  const [reviewForm, setReviewForm] = useState({
    revieweeId: '',
    rating: 5,
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      setLoading(true);
      try {
        const userId = currentUser ? currentUser.id : 'usr_narendar';
        const [reviewsRes, usersRes] = await Promise.all([
          api.reviews.getUserReviews(userId),
          api.users.getUsers(),
        ]);

        if (reviewsRes.success && reviewsRes.reviews) {
          setReviews(reviewsRes.reviews);
        }
        if (usersRes.success && usersRes.users) {
          setPeers(usersRes.users);
          if (usersRes.users.length > 0) {
            setReviewForm((prev) => ({ ...prev, revieweeId: usersRes.users[0].id }));
          }
        }
      } catch (err) {
        console.warn('Error loading reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, [currentUser]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.revieweeId || !reviewForm.comment.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.reviews.createReview({
        revieweeId: reviewForm.revieweeId,
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
      });

      if (res.success) {
        setToastMsg('Verified peer review submitted successfully!');
        setReviewForm({ revieweeId: peers[0]?.id || '', rating: 5, comment: '' });
        setActiveTab('received');
        setTimeout(() => setToastMsg(''), 4000);
      } else {
        setToastMsg(res.message || 'Could not submit review.');
      }
    } catch (err) {
      setToastMsg('Error submitting review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reviews-page-container">
      {toastMsg && (
        <div className="reviews-toast" role="status">
          <CheckCircle2 size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Hero */}
      <section className="reviews-hero">
        <div className="reviews-hero-content">
          <span className="reviews-badge">
            <Award size={14} /> Verified Peer Reputation
          </span>
          <h1>Peer Ratings & Reviews</h1>
          <p>
            Every rating on Skillor is tied to a real, completed bilateral exchange session. Genuine peer feedback builds your community standing.
          </p>
        </div>

        {/* Aggregate Stats */}
        <div className="reviews-stats-summary">
          <div className="stat-big-box">
            <span className="big-rating">{currentUser?.rating || '4.96'}</span>
            <div className="stars-row">
              {'★★★★★'}
            </div>
            <span className="rating-sub">Overall Trust Score</span>
          </div>

          <div className="stat-metric-box">
            <strong>100%</strong>
            <span>Verified 1:1 Sessions</span>
          </div>

          <div className="stat-metric-box">
            <strong>{currentUser?.reviewsCount || 38}</strong>
            <span>Peer Endorsements</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="reviews-tabs-bar">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'received' ? 'active' : ''}`}
          onClick={() => setActiveTab('received')}
        >
          Community Reviews ({reviews.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'give' ? 'active' : ''}`}
          onClick={() => setActiveTab('give')}
        >
          + Write a Peer Review
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'received' ? (
        <div className="reviews-list-grid">
          {reviews.length === 0 ? (
            <div className="reviews-empty">
              <Award size={40} />
              <h3>No reviews recorded yet</h3>
              <p>Complete your first skill session to receive verified peer reviews.</p>
            </div>
          ) : (
            reviews.map((r) => (
              <div className="review-card-full" key={r.id}>
                <div className="review-card-top">
                  <div className="reviewer-avatar-box">
                    {r.reviewerAvatar || 'VP'}
                  </div>

                  <div className="reviewer-info">
                    <h4>{r.reviewerName || 'Verified Peer'}</h4>
                    <span className="review-verified-tag">
                      <ShieldCheck size={12} /> Verified Exchange
                    </span>
                  </div>

                  <div className="review-stars-box">
                    {'★'.repeat(r.rating || 5)}
                  </div>
                </div>

                <blockquote className="review-text-quote">
                  &ldquo;{r.comment}&rdquo;
                </blockquote>

                <div className="review-card-footer">
                  <span className="review-timestamp">
                    {new Date(r.createdAt || Date.now()).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="review-helpful-chip">
                    <ThumbsUp size={12} /> Helpful Feedback
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="write-review-container">
          <div className="write-review-card">
            <h2>Leave a Verified Peer Review</h2>
            <p>
              Share constructive, thoughtful feedback about your learning or teaching partner.
            </p>

            <form onSubmit={handleSubmitReview} className="write-review-form">
              <div className="form-group">
                <label>Select Peer Partner</label>
                <select
                  value={reviewForm.revieweeId}
                  onChange={(e) => setReviewForm({ ...reviewForm, revieweeId: e.target.value })}
                  required
                >
                  {peers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Star Rating</label>
                <div className="rating-selector">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`star-select-btn ${reviewForm.rating === num ? 'selected' : ''}`}
                      onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                    >
                      <Star size={18} fill={reviewForm.rating >= num ? '#FBBF24' : 'none'} color="#FBBF24" />
                      <span>{num} Star{num > 1 ? 's' : ''}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Review & Compliments</label>
                <textarea
                  rows={4}
                  placeholder="What was great about the session? How did your peer explain difficult concepts or listen to your guidance?"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-review-btn"
                disabled={submitting || !reviewForm.comment.trim()}
              >
                <Send size={16} />
                <span>{submitting ? 'Submitting Review...' : 'Publish Verified Review'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

