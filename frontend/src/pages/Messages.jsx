
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Send,
  Calendar,
  Video,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  X,
  MessageSquare,
  Image as ImageIcon
} from "lucide-react";

import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Messages.css";

export default function Messages({
  initialConversationId = null,
  setActivePage
}) {
  const { currentUser } = useAuth();

  // Conversation states
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);

  // Input states
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Schedule session modal
  const [showScheduleModal, setShowScheduleModal] =
    useState(false);

  const [scheduling, setScheduling] = useState(false);

  const [sessionData, setSessionData] = useState({
    skill: "",
    date: "",
    time: "",
    duration: 60
  });

  // Notifications
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  // Refs
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  // =====================================
  // 1. AUTO SCROLL
  // =====================================

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // =====================================
  // 2. FETCH CONVERSATIONS
  // =====================================

  useEffect(() => {
    let cancelled = false;

    const fetchConversations = async () => {
      try {
        setLoading(true);

        const res = await api.chat.getConversations();

        if (cancelled) return;

        if (res.success && res.conversations) {
          setConversations(res.conversations);

          setSelectedConv((previous) => {
            if (
              previous &&
              res.conversations.some(
                (c) => c.id === previous.id
              )
            ) {
              return res.conversations.find(
                (c) => c.id === previous.id
              );
            }

            if (initialConversationId) {
              return (
                res.conversations.find(
                  (c) => c.id === initialConversationId
                ) || res.conversations[0] || null
              );
            }

            return res.conversations[0] || null;
          });
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Conversation error:", err);
          setError("Unable to load conversations.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchConversations();

    return () => {
      cancelled = true;
    };
  }, [initialConversationId]);

  // =====================================
  // 3. FETCH CHAT MESSAGES
  // =====================================

  useEffect(() => {
    if (!selectedConv) {
      setMessages([]);
      return;
    }

    let cancelled = false;

    const fetchMessages = async () => {
      try {
        const res = await api.chat.getMessages(
          selectedConv.id
        );

        if (!cancelled && res.success) {
          setMessages(res.messages || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Message fetching error:", err);
        }
      }
    };

    fetchMessages();

    // Refresh messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [selectedConv?.id]);

  // =====================================
  // 4. IMAGE SELECTION
  // =====================================

  useEffect(() => {
    if (!selectedFile) {
      setImagePreview(null);
      return;
    }

    const previewURL = URL.createObjectURL(selectedFile);

    setImagePreview(previewURL);

    return () => {
      URL.revokeObjectURL(previewURL);
    };
  }, [selectedFile]);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const removeImage = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================
  // 5. SEND TEXT / IMAGE MESSAGE
  // =====================================

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (
      (!inputText.trim() && !selectedFile) ||
      !selectedConv ||
      sending
    ) {
      return;
    }

    const textToSend = inputText.trim();

    // Save current values before clearing input
    const fileToSend = selectedFile;

    // FormData supports text + image
    const formData = new FormData();

    formData.append("text", textToSend);

    if (fileToSend) {
      formData.append("image", fileToSend);
    }

    try {
      setSending(true);
      setError("");

      const res = await api.chat.sendMessage(
        selectedConv.id,
        formData
      );

      if (!res.success || !res.message) {
        throw new Error(
          res.message || "Message could not be sent."
        );
      }

      // Add server response to chat
      setMessages((prev) => {
        if (prev.some((m) => m.id === res.message.id)) {
          return prev;
        }

        return [...prev, res.message];
      });

      // Update conversation preview
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConv.id
            ? {
                ...conv,
                lastMessage:
                  textToSend ||
                  (fileToSend ? "📷 Image" : ""),
                lastMessageTime: new Date().toISOString()
              }
            : conv
        )
      );

      setInputText("");
      removeImage();

    } catch (err) {
      console.error("Send message error:", err);
      setError(err.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  // =====================================
  // 6. SCHEDULE SESSION
  // =====================================

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedConv || scheduling) return;

    try {
      setScheduling(true);
      setError("");

      const res = await api.sessions.createSession({
        learnerId: selectedConv.peerId,
        skill: sessionData.skill,
        date: sessionData.date,
        time: sessionData.time,
        duration: Number(sessionData.duration)
      });

      if (!res.success) {
        throw new Error("Unable to schedule session.");
      }

      const meetingMsg =
        `📅 Live learning session scheduled!\n` +
        `Topic: ${sessionData.skill}\n` +
        `Date: ${sessionData.date}\n` +
        `Time: ${sessionData.time}\n` +
        `Duration: ${sessionData.duration} minutes\n` +
        `Meeting link: ${res.session?.meetingLink || "Will be shared soon."}`;

      const messageRes = await api.chat.sendMessage(
        selectedConv.id,
        (() => {
          const data = new FormData();
          data.append("text", meetingMsg);
          return data;
        })()
      );

      if (messageRes.success && messageRes.message) {
        setMessages((prev) => [
          ...prev,
          messageRes.message
        ]);
      } else {
        // Session is created even if chat notification fails
        console.error("Session created, but notification failed.");
      }

      setShowScheduleModal(false);

      setSessionData({
        skill: "",
        date: "",
        time: "",
        duration: 60
      });

      setNotice("Learning session scheduled successfully!");

      setTimeout(() => setNotice(""), 4000);

    } catch (err) {
      console.error("Scheduling error:", err);
      setError(err.message || "Unable to schedule session.");
    } finally {
      setScheduling(false);
    }
  };

  // =====================================
  // 7. SEARCH CONVERSATIONS
  // =====================================

  const filteredConvs = conversations.filter((conv) =>
    (conv.peerName || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (conv.peerUsername || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =====================================
  // 8. CHECK MESSAGE SENDER
  // =====================================

  const isMyMessage = (msg) => {
    return (
      msg.isMe ||
      String(msg.senderId) === String(currentUser?.id)
    );
  };

  // =====================================
  // 9. FORMAT MESSAGE TIME
  // =====================================

  const formatTime = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // =====================================
  // 10. UI
  // =====================================

  return (
    <div className="messages-page-wrapper">

      {/* Notifications */}

      {notice && (
        <div className="session-toast-notice">
          <CheckCircle2 size={16} />
          <span>{notice}</span>
        </div>
      )}

      {error && (
        <div className="session-toast-notice error">
          <span>{error}</span>
          <button onClick={() => setError("")}>
            <X size={14} />
          </button>
        </div>
      )}

      <div className="messages-layout-container">

        {/* LEFT SIDEBAR */}

        <aside className="chat-sidebar">

          <div className="chat-sidebar-header">

            <div className="chat-sidebar-title-row">
              <h2>Direct Messages</h2>

              <span className="chat-conversations-badge">
                {conversations.length}
              </span>
            </div>

            <div className="chat-search-box">
              <Search size={15} />

              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>

          <div className="chat-conversations-list">

            {loading ? (
              <div className="chat-loading-state">
                <span className="chat-loader-dot" />
                <p>Loading messages...</p>
              </div>
            ) : filteredConvs.length === 0 ? (
              <div className="chat-empty-conversations">
                <MessageSquare size={28} />
                <p>No conversations found</p>
                <small>
                  Connect with peers in Matches to start chatting!
                </small>
              </div>
            ) : (
              filteredConvs.map((conv) => {
                const isSelected =
                  selectedConv?.id === conv.id;

                return (
                  <div
                    key={conv.id}
                    className={`conv-list-item ${
                      isSelected ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedConv(conv);
                      setMessages([]);
                      setError("");
                    }}
                  >

                    <div className="conv-avatar-wrapper">
                      <div className="conv-avatar">
                        {conv.peerAvatar || "👤"}
                      </div>

                      {conv.peerOnline && (
                        <span className="conv-online-dot" />
                      )}
                    </div>

                    <div className="conv-content">

                      <div className="conv-top-line">
                        <span className="conv-peer-name">
                          {conv.peerName}
                        </span>

                        <span className="conv-time">
                          {formatTime(conv.lastMessageTime)}
                        </span>
                      </div>

                      <div className="conv-bottom-line">
                        <p className="conv-preview">
                          {conv.lastMessage || "Start a conversation"}
                        </p>

                        {conv.unreadCount > 0 && (
                          <span className="conv-unread-pill">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </aside>

        {/* RIGHT CHAT SECTION */}

        <main className="chat-thread-container">

          {selectedConv ? (
            <>

              {/* CHAT HEADER */}

              <div className="chat-thread-header">

                <div className="thread-peer-info">

                  <div className="thread-peer-avatar">
                    {selectedConv.peerAvatar || "👤"}
                  </div>

                  <div>
                    <h3>{selectedConv.peerName}</h3>

                    <div className="thread-peer-sub">
                      <span>
                        @{selectedConv.peerUsername || "member"}
                      </span>

                      <span className="thread-status-dot">
                        ●
                      </span>

                      <span className="thread-status-text">
                        {selectedConv.peerOnline
                          ? "Online"
                          : "Recently active"}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="thread-header-actions">

                  <button
                    type="button"
                    className="schedule-session-btn"
                    onClick={() => setShowScheduleModal(true)}
                  >
                    <Calendar size={15} />
                    <span>Schedule Session</span>
                  </button>

                </div>

              </div>

              {/* MESSAGES BODY */}

              <div className="chat-messages-body">

                <div className="chat-encryption-notice">
                  <ShieldCheck size={14} />
                  <span>
                    Direct 1:1 Reciprocal Learning Channel
                  </span>
                </div>

                {messagesLoading ? (
                  <p>Loading messages...</p>
                ) : messages.length === 0 ? (
                  <div className="chat-thread-empty">
                    <Sparkles size={32} />

                    <p>
                      Start your exchange with {selectedConv.peerName}!
                    </p>

                    <small>
                      Coordinate learning goals, shared resources,
                      or session times.
                    </small>
                  </div>
                ) : (

                  messages.map((msg) => {
                    const isMe = isMyMessage(msg);

                    return (
                      <div
                        key={msg.id}
                        className={`chat-bubble-row ${
                          isMe ? "outgoing" : "incoming"
                        }`}
                      >

                        {!isMe && (
                          <div className="bubble-avatar">
                            {selectedConv.peerAvatar || "👤"}
                          </div>
                        )}

                        <div className="bubble-content-block">

                          <div className="chat-bubble">

                            {msg.text && (
                              <p>{msg.text}</p>
                            )}

                            {/* IMAGE MESSAGE */}

                            {(msg.imageUrl || msg.image) && (
                              <div className="message-image-container">
                                <img
                                  src={msg.imageUrl || msg.image}
                                  alt="Shared attachment"
                                  className="message-image"
                                  loading="lazy"
                                />
                              </div>
                            )}

                          </div>

                          <span className="chat-bubble-timestamp">
                            {formatTime(msg.createdAt || msg.time)}
                          </span>

                        </div>

                      </div>
                    );
                  })

                )}

                <div ref={messagesEndRef} />

              </div>

              {/* QUICK SUGGESTIONS */}

              <div className="chat-quick-suggestions">

                <button
                  type="button"
                  onClick={() =>
                    setInputText(
                      "Would you like to schedule our 1-hour swap this weekend?"
                    )
                  }
                >
                  Schedule this weekend?
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setInputText(
                      "Here are the topics I'd love to explore together!"
                    )
                  }
                >
                  Share topics
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setInputText(
                      "Sounds awesome, I am ready whenever you are!"
                    )
                  }
                >
                  Sounds awesome!
                </button>

              </div>

              {/* IMAGE PREVIEW */}

              {imagePreview && (
                <div className="image-preview-bar">

                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="preview-thumb"
                  />

                  <span>
                    {selectedFile?.name || "Image attached"}
                  </span>

                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>

                </div>
              )}

              {/* CHAT INPUT */}

              <form
                className="chat-input-form"
                onSubmit={handleSendMessage}
              >

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  hidden
                />

                <button
                  type="button"
                  className="chat-attach-btn"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={sending}
                  title="Attach image"
                  aria-label="Attach image"
                >
                  <ImageIcon size={19} />
                </button>

                <input
                  type="text"
                  className="chat-text-input"
                  placeholder={`Message ${selectedConv.peerName}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={sending}
                />

                <button
                  type="submit"
                  className="chat-send-btn"
                  disabled={
                    (!inputText.trim() && !selectedFile) || sending
                  }
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>

              </form>

            </>
          ) : (

            <div className="no-conversation-selected">
              <MessageSquare size={48} />
              <h3>Select a conversation</h3>
              <p>
                Choose a peer from the left panel to review
                or send messages.
              </p>
            </div>

          )}

        </main>

      </div>

      {/* SCHEDULE SESSION MODAL */}

      {showScheduleModal && selectedConv && (

        <div
          className="chat-modal-backdrop"
          onClick={() => setShowScheduleModal(false)}
        >

          <div
            className="chat-modal-card"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="chat-modal-close"
              onClick={() => setShowScheduleModal(false)}
            >
              <X size={18} />
            </button>

            <div className="chat-modal-badge">
              <Video size={16} />
              <span>Live Learning Session</span>
            </div>

            <h2>
              Schedule Session with {selectedConv.peerName}
            </h2>

            <p className="chat-modal-subtitle">
              Coordinate your reciprocal 1:1 learning swap.
            </p>

            <form
              onSubmit={handleScheduleSubmit}
              className="chat-modal-form"
            >

              <div className="modal-form-group">
                <label>Focus Skill / Topic</label>

                <input
                  type="text"
                  placeholder="e.g. React, JavaScript"
                  value={sessionData.skill}
                  onChange={(e) =>
                    setSessionData({
                      ...sessionData,
                      skill: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="modal-form-row">

                <div className="modal-form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={sessionData.date}
                    onChange={(e) =>
                      setSessionData({
                        ...sessionData,
                        date: e.target.value
                      })
                    }
                    required
                  />
                </div>

                <div className="modal-form-group">
                  <label>Time</label>

                  <input
                    type="time"
                    value={sessionData.time}
                    onChange={(e) =>
                      setSessionData({
                        ...sessionData,
                        time: e.target.value
                      })
                    }
                    required
                  />
                </div>

              </div>

              <div className="modal-form-group">
                <label>Duration</label>

                <select
                  value={sessionData.duration}
                  onChange={(e) =>
                    setSessionData({
                      ...sessionData,
                      duration: Number(e.target.value)
                    })
                  }
                >
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes</option>
                  <option value={90}>90 Minutes</option>
                </select>
              </div>

              <div className="chat-modal-actions">

                <button
                  type="button"
                  className="chat-modal-btn cancel"
                  onClick={() => setShowScheduleModal(false)}
                  disabled={scheduling}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="chat-modal-btn primary"
                  disabled={scheduling}
                >
                  {scheduling
                    ? "Scheduling..."
                    : "Confirm & Post to Chat"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}