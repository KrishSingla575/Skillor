const db = require('../config/db');

exports.getConversations = async (req, res) => {
  try {
    const currentUserId = req.user ? req.user.id : 'usr_narendar';
    const conversations = db.getCollection('conversations').filter(
      (c) => c.participants && c.participants.includes(currentUserId)
    );

    const populated = conversations.map((conv) => {
      const peerId = conv.participants.find((id) => id !== currentUserId) || conv.participants[0];
      const peer = db.findById('users', peerId) || {
        id: peerId,
        name: 'Community Member',
        username: 'member',
        avatar: 'CM',
        role: 'Learner',
      };

      const messages = db.find('messages', { conversationId: conv.id });
      // Sort messages to get the last one
      messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      const lastMsg = messages[messages.length - 1];

      const unreadCount = messages.filter(
        (m) => m.senderId !== currentUserId && !m.read
      ).length;

      return {
        id: conv.id,
        participants: conv.participants,
        peerId: peer.id,
        peerName: peer.name,
        peerUsername: peer.username,
        peerAvatar: peer.avatar || peer.name.slice(0, 2).toUpperCase(),
        peerRole: peer.role,
        peerOnline: true,
        lastMessage: lastMsg ? lastMsg.text : 'Conversation started',
        lastMessageTime: lastMsg ? lastMsg.createdAt : conv.updatedAt || conv.createdAt,
        unreadCount,
      };
    });

    // Sort newest last message first
    populated.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

    return res.json({
      success: true,
      count: populated.length,
      conversations: populated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const currentUserId = req.user ? req.user.id : 'usr_narendar';
    const { conversationId } = req.params;

    const messages = db.find('messages', { conversationId });

    // Mark messages sent to current user as read
    messages.forEach((m) => {
      if (m.senderId !== currentUserId && !m.read) {
        db.update('messages', m.id, { read: true });
        m.read = true;
      }
    });

    // Sort ascending by time
    messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return res.json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const currentUserId = req.user ? req.user.id : 'usr_narendar';
    const { conversationId } = req.params;
    const text = req.body.text || req.body.message || '';
    const mediaUrl = req.body.mediaUrl || null;

    if (!text && !mediaUrl) {
      return res.status(400).json({ success: false, message: 'Message text or media is required.' });
    }

    const conversation = db.findById('conversations', conversationId);
    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found.' });
    }

    const newMessage = db.insert('messages', {
      conversationId,
      senderId: currentUserId,
      text: text.trim(),
      mediaUrl,
      read: false,
    });

    db.update('conversations', conversationId, {
      updatedAt: new Date().toISOString(),
    });

    return res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.startConversation = async (req, res) => {
  try {
    const currentUserId = req.user ? req.user.id : 'usr_narendar';
    const { peerId, initialMessage } = req.body;

    if (!peerId) {
      return res.status(400).json({ success: false, message: 'Peer ID is required.' });
    }

    // Check if conversation exists
    let conv = db.getCollection('conversations').find(
      (c) =>
        c.participants &&
        c.participants.includes(currentUserId) &&
        c.participants.includes(peerId)
    );

    if (!conv) {
      conv = db.insert('conversations', {
        participants: [currentUserId, peerId],
        updatedAt: new Date().toISOString(),
      });
    }

    if (initialMessage && initialMessage.trim()) {
      db.insert('messages', {
        conversationId: conv.id,
        senderId: currentUserId,
        text: initialMessage.trim(),
        read: false,
      });
    }

    return res.json({
      success: true,
      conversation: conv,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
