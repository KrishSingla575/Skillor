import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  MapPin,
  Calendar,
  Languages,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Save,
  Loader2
} from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from '../router/Router';
import { useAuth } from '../context/AuthContext';
import './EditProfile.css';

export default function EditProfile() {
  const navigate = useNavigate();
  const { currentUser, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    experienceLevel: 'Intermediate',
    availability: '',
    languages: '',
    interests: '',
  });
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        experienceLevel: currentUser.experienceLevel || 'Intermediate',
        availability: currentUser.availability || 'Available Weekends',
        languages: Array.isArray(currentUser.languages)
          ? currentUser.languages.join(', ')
          : currentUser.languages || 'English',
        interests: currentUser.interests || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const updates = {
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        experienceLevel: formData.experienceLevel,
        availability: formData.availability.trim(),
        languages: formData.languages.split(',').map((l) => l.trim()).filter(Boolean),
        interests: formData.interests.trim(),
      };

      const res = await api.users.updateProfile(updates);
      if (res.success) {
        await refreshUser();
        setToastMsg('Profile updated successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } else {
        setErrorMsg(res.message || 'Failed to update profile.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-profile-container">
      {toastMsg && (
        <div className="edit-toast" role="status">
          <CheckCircle2 size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="edit-top-row">
        <button type="button" className="edit-back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="edit-card">
        <div className="edit-card-header">
          <div className="edit-badge">
            <User size={14} /> Profile Settings
          </div>
          <h1>Edit Your Skillor Profile</h1>
          <p>
            Keep your profile up to date so the matching engine pairs you with the best complementary learning partners.
          </p>
        </div>

        {errorMsg && (
          <div className="edit-error-box">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              required
            />
          </div>

          <div className="form-group">
            <label>Bio & Philosophy</label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Describe your background, what skills you are eager to master, and what you love teaching others..."
              required
            />
          </div>

          <div className="form-grid-row">
            <div className="form-group">
              <label>Location / Timezone</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA (PST)"
                required
              />
            </div>

            <div className="form-group">
              <label>Experience Level</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert / Staff</option>
              </select>
            </div>
          </div>

          <div className="form-grid-row">
            <div className="form-group">
              <label>Weekly Availability</label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="e.g. Weekdays after 6 PM, Flexible Weekends"
                required
              />
            </div>

            <div className="form-group">
              <label>Languages Spoken (comma separated)</label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="e.g. English, Hindi, Spanish"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Interests & Topics</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g. Microservices, Design Tokens, Generative AI, Video Editing"
            />
          </div>

          <div className="edit-actions">
            <button
              type="button"
              className="edit-btn secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>

            <button type="submit" className="edit-btn primary" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 size={16} className="spin-loader" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

