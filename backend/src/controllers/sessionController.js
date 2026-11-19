const db = require('../config/db');

exports.getSessions = async (req, res) => {
  try {
    const currentUserId = req.user ? req.user.id : 'usr_narendar';
    const { status } = req.query;

    let sessions = db.getCollection('sessions').filter(
      (s) => s.teacherId === currentUserId || s.learnerId === currentUserId
    );

    if (status && status !== 'all') {
      sessions = sessions.filter((s) => s.status.toLowerCase() === status.toLowerCase());
    }

    const populated = sessions.map((s) => {
      const isTeacher = s.teacherId === currentUserId;
      const partnerId = isTeacher ? s.learnerId : s.teacherId;
      const partner = db.findById('users', partnerId);

      return {
        ...s,
        isTeacher,
        partner: partner
          ? {
              id: partner.id,
              name: partner.name,
              username: partner.username,
              avatar: partner.avatar,
              role: partner.role,
              rating: partner.rating,
              location: partner.location,
            }
          : { id: partnerId, name: 'Partner' },
      };
    });

    // Sort by date ascending (soonest first)
    populated.sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`));

    return res.json({
      success: true,
      count: populated.length,
      sessions: populated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createSession = async (req, res) => {
  try {
    const currentUserId = req.user ? req.user.id : 'usr_narendar';
    const {
      partnerId,
      skill,
      date,
      time,
      duration = 60,
      meetingLink,
      notes,
      exchangeId,
      asTeacher = true,
    } = req.body;

    if (!partnerId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Partner ID, date, and time are required to schedule a session.',
      });
    }

    const teacherId = asTeacher ? currentUserId : partnerId;
    const learnerId = asTeacher ? partnerId : currentUserId;

    const roomId = `room-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const finalMeetingLink = meetingLink || `https://meet.skillor.io/${roomId}`;

    const newSession = db.insert('sessions', {
      exchangeId: exchangeId || null,
      teacherId,
      learnerId,
      skill: skill || 'Peer Skill Exchange',
      date,
      time,
      duration: Number(duration),
      meetingLink: finalMeetingLink,
      notes: notes || '1-on-1 collaborative interactive learning session.',
      status: 'scheduled',
    });

    return res.status(201).json({
      success: true,
      message: 'Session successfully scheduled!',
      session: newSession,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = db.findById('sessions', id);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    const allowed = ['date', 'time', 'status', 'meetingLink', 'notes', 'duration'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updated = db.update('sessions', id, updates);

    // If marked completed, increment hours for both teacher and learner
    if (updates.status === 'completed' && session.status !== 'completed') {
      const hours = (updated.duration || 60) / 60;
      [session.teacherId, session.learnerId].forEach((uid) => {
        const u = db.findById('users', uid);
        if (u) {
          db.update('users', uid, {
            sessionsCompleted: (u.sessionsCompleted || 0) + 1,
            hoursExchanged: Math.round(((u.hoursExchanged || 0) + hours) * 10) / 10,
          });
        }
      });
    }

    return res.json({
      success: true,
      message: 'Session updated successfully.',
      session: updated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.delete('sessions', id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    return res.json({
      success: true,
      message: 'Session cancelled and removed.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
