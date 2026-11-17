import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Lock,
  Moon,
  Trash2,
  CheckCircle2,
  Save,
  Globe,
  Sliders,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../router/Router';
import './Settings.css';

export default function Settings() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState('');

  const [notifications, setNotifications] = useState({
    proposals: true,
    messages: true,
    sessionReminders: true,
    weeklyRecap: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showOnlineStatus: true,
    allowDirectMessages: true,
  });

  const [matchingPrefs, setMatchingPrefs] = useState({
    minCompatibility: 80,
    twoWayOnly: true,
    sameTimezone: false,
  });

  const handleSave = (section) => {
    setToastMsg(`${section} preferences saved!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="settings-page-container">
      {toastMsg && (
        <div className="settings-toast" role="status">
          <CheckCircle2 size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="settings-wrapper">
        <header className="settings-header">
          <div className="settings-badge">
            <SettingsIcon size={14} /> System Preferences
          </div>
          <h1>Account & Platform Settings</h1>
          <p>
            Configure your exchange notifications, matching algorithm filters, and privacy controls.
          </p>
        </header>

        <div className="settings-sections-list">
          {/* Notification Preferences */}
          <div className="settings-card">
            <div className="settings-card-title">
              <Bell size={20} className="icon-purple" />
              <div>
                <h2>Notification Preferences</h2>
                <p>Choose when and how Skillor alerts you regarding exchanges.</p>
              </div>
            </div>

            <div className="settings-toggle-list">
              <label className="toggle-row">
                <div>
                  <strong>New Exchange Proposals</strong>
                  <p>Get notified immediately when a peer proposes a reciprocal skill swap.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.proposals}
                  onChange={(e) =>
                    setNotifications({ ...notifications, proposals: e.target.checked })
                  }
                />
              </label>

              <label className="toggle-row">
                <div>
                  <strong>Chat Messages</strong>
                  <p>Receive alerts for incoming messages and schedule coordination.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.messages}
                  onChange={(e) =>
                    setNotifications({ ...notifications, messages: e.target.checked })
                  }
                />
              </label>

              <label className="toggle-row">
                <div>
                  <strong>Session Countdown Reminders</strong>
                  <p>Remind me 15 minutes before a live peer session begins.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.sessionReminders}
                  onChange={(e) =>
                    setNotifications({ ...notifications, sessionReminders: e.target.checked })
                  }
                />
              </label>
            </div>

            <button
              type="button"
              className="save-section-btn"
              onClick={() => handleSave('Notification')}
            >
              <Save size={15} /> Save Notification Settings
            </button>
          </div>

          {/* Privacy & Visibility */}
          <div className="settings-card">
            <div className="settings-card-title">
              <Shield size={20} className="icon-green" />
              <div>
                <h2>Privacy & Directory Visibility</h2>
                <p>Control who can discover your skills and see your online status.</p>
              </div>
            </div>

            <div className="settings-toggle-list">
              <label className="toggle-row">
                <div>
                  <strong>Public Directory Listing</strong>
                  <p>Display your profile in the Discover directory and recommended matches.</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacy.profileVisible}
                  onChange={(e) =>
                    setPrivacy({ ...privacy, profileVisible: e.target.checked })
                  }
                />
              </label>

              <label className="toggle-row">
                <div>
                  <strong>Show Online Indicator</strong>
                  <p>Allow peers to see when you are active and available for sessions.</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacy.showOnlineStatus}
                  onChange={(e) =>
                    setPrivacy({ ...privacy, showOnlineStatus: e.target.checked })
                  }
                />
              </label>
            </div>

            <button
              type="button"
              className="save-section-btn"
              onClick={() => handleSave('Privacy')}
            >
              <Save size={15} /> Save Privacy Settings
            </button>
          </div>

          {/* Algorithm Preferences */}
          <div className="settings-card">
            <div className="settings-card-title">
              <Sliders size={20} className="icon-blue" />
              <div>
                <h2>Matching Algorithm Calibration</h2>
                <p>Fine-tune the bipartite recommendation engine for your goals.</p>
              </div>
            </div>

            <div className="settings-form-block">
              <div className="slider-row">
                <div className="slider-label">
                  <strong>Minimum Compatibility Threshold</strong>
                  <span>{matchingPrefs.minCompatibility}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={matchingPrefs.minCompatibility}
                  onChange={(e) =>
                    setMatchingPrefs({
                      ...matchingPrefs,
                      minCompatibility: Number(e.target.value),
                    })
                  }
                />
              </div>

              <label className="toggle-row" style={{ marginTop: '16px' }}>
                <div>
                  <strong>Strict 1:1 Reciprocal Pairs Only</strong>
                  <p>Only recommend peers where both teach and learn skills overlap completely.</p>
                </div>
                <input
                  type="checkbox"
                  checked={matchingPrefs.twoWayOnly}
                  onChange={(e) =>
                    setMatchingPrefs({ ...matchingPrefs, twoWayOnly: e.target.checked })
                  }
                />
              </label>
            </div>

            <button
              type="button"
              className="save-section-btn"
              onClick={() => handleSave('Matching algorithm')}
            >
              <Save size={15} /> Save Match Preferences
            </button>
          </div>

          {/* Account Session Actions */}
          <div className="settings-card danger-card">
            <div className="settings-card-title">
              <Lock size={20} className="icon-red" />
              <div>
                <h2>Account & Session Security</h2>
                <p>Manage your login session or sign out across all devices.</p>
              </div>
            </div>

            <div className="danger-actions-row">
              <button
                type="button"
                className="danger-btn outline"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Sign Out of Skillor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
