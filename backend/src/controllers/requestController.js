const db = require('../config/db');

exports.getRequests = async (req, res) => {
  try {
    const currentUserId = req.user ? req.user.id : 'usr_narendar';
    const { status } = req.query;

    let requests = db.getCollection('exchangeRequests').filter(
      (r) => r.senderId === currentUserId || r.receiverId === currentUserId
    );

    if (status && status !== 'all') {
      requests = requests.filter((r) => r.status.toLowerCase() === status.toLowerCase());
    }

    // Populate sender and receiver objects
    const populated = requests.map((r) => {
      const sender = db.findById('users', r.senderId);
      const receiver = db.findById('users', r.receiverId);

      const isIncoming = r.receiverId === currentUserId;

      return {
        ...r,
        isIncoming,
        sender: sender
          ? {
              id: sender.id,
              name: sender.name,
              username: sender.username,
              avatar: sender.avatar,
              role: sender.role,
              rating: sender.rating,
              location: sender.location,
            }
          : { id: r.senderId, name: 'Unknown User' },
        receiver: receiver
          ? {
              id: receiver.id,
              name: receiver.name,
              username: receiver.username,
              avatar: receiver.avatar,
              role: receiver.role,
              rating: receiver.rating,
              location: receiver.location,
            }
          : { id: r.receiverId, name: 'Unknown User' },
      };
    });

    // Sort by createdAt descending
    populated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.json({
      success: true,
      count: populated.length,
      requests: populated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const senderId = req.user ? req.user.id : 'usr_narendar';
    const {
      receiverId,
      peerId,
      targetUserId,
      proposedTeachSkill,
      requestedLearnSkill,
      message,
    } = req.body;

    const actualReceiverId = receiverId || peerId || targetUserId;
    if (!actualReceiverId) {
      return res.status(400).json({ success: false, message: 'Recipient is required.' });
    }

    if (actualReceiverId === senderId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot send an exchange request to yourself.',
      });
    }

    // Check for existing pending request
    const existing = db.findOne('exchangeRequests', {
      senderId,
      receiverId: actualReceiverId,
      status: 'pending',
    });

    if (existing) {
      return res.json({
        success: true,
        message: 'Exchange request already pending.',
        request: existing,
      });
    }

    const newRequest = db.insert('exchangeRequests', {
      senderId,
      receiverId: actualReceiverId,
      proposedTeachSkill: proposedTeachSkill || 'Full-Stack Development',
      requestedLearnSkill: requestedLearnSkill || 'UI/UX Design',
      message: message || 'Hi! I would love to connect and exchange learning sessions with you on Skillor.',
      status: 'pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Exchange request sent successfully!',
      request: newRequest,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = db.findById('exchangeRequests', id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }

    const updated = db.update('exchangeRequests', id, { status: 'accepted' });

    // Create or locate conversation between the two users
    let conv = db.getCollection('conversations').find(
      (c) =>
        c.participants &&
        c.participants.includes(request.senderId) &&
        c.participants.includes(request.receiverId)
    );

    if (!conv) {
      conv = db.insert('conversations', {
        participants: [request.senderId, request.receiverId],
        updatedAt: new Date().toISOString(),
      });
    }

    // Insert auto greeting message
    db.insert('messages', {
      conversationId: conv.id,
      senderId: request.receiverId,
      text: `Exchange proposal accepted! Let's schedule our first session: "${request.proposedTeachSkill}" <-> "${request.requestedLearnSkill}".`,
      createdAt: new Date().toISOString(),
      read: false,
    });

    return res.json({
      success: true,
      message: 'Exchange request accepted! Chat unlocked.',
      request: updated,
      conversationId: conv.id,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = db.findById('exchangeRequests', id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }

    const updated = db.update('exchangeRequests', id, { status: 'rejected' });
    return res.json({
      success: true,
      message: 'Exchange request rejected.',
      request: updated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.completeRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = db.findById('exchangeRequests', id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }

    const updated = db.update('exchangeRequests', id, { status: 'completed' });

    // Update sessions count and hours for both users
    [request.senderId, request.receiverId].forEach((uid) => {
      const u = db.findById('users', uid);
      if (u) {
        db.update('users', uid, {
          sessionsCompleted: (u.sessionsCompleted || 0) + 1,
          hoursExchanged: (u.hoursExchanged || 0) + 1.5,
        });
      }
    });

    return res.json({
      success: true,
      message: 'Exchange completed successfully! Leave a peer review to help the community.',
      request: updated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
