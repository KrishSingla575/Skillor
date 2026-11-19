const db = require('../config/db');

exports.getUsers = async (req, res) => {
  try {
    const { search, skill, level, availability } = req.query;
    let users = db.getCollection('users').map(({ password, ...u }) => u);

    // Filter out current user if authenticated
    if (req.user) {
      users = users.filter((u) => u.id !== req.user.id);
    }

    if (search) {
      const q = search.toLowerCase();
      users = users.filter((u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        (u.bio && u.bio.toLowerCase().includes(q)) ||
        (u.teaches && u.teaches.some((s) => s.toLowerCase().includes(q))) ||
        (u.wants && u.wants.some((s) => s.toLowerCase().includes(q)))
      );
    }

    if (skill) {
      const sLower = skill.toLowerCase();
      users = users.filter((u) =>
        (u.teaches && u.teaches.some((s) => s.toLowerCase().includes(sLower))) ||
        (u.wants && u.wants.some((s) => s.toLowerCase().includes(sLower)))
      );
    }

    if (availability) {
      users = users.filter((u) =>
        u.availability && u.availability.includes(availability)
      );
    }

    return res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = db.findById('users', id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { password, ...safeUser } = user;
    const userReviews = db.find('reviews', { revieweeId: id });
    const userSkills = db.find('userSkills', { userId: id });

    return res.json({
      success: true,
      user: {
        ...safeUser,
        userSkills,
        reviews: userReviews,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const allowed = [
      'name', 'bio', 'location', 'role', 'avatar',
      'teaches', 'wants', 'availability', 'modes', 'languages',
    ];

    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = db.update('users', req.user.id, updates);

    // Sync userSkills collection if teaches or wants were updated
    if (updates.teaches || updates.wants) {
      db.deleteMany('userSkills', { userId: req.user.id });
      (updatedUser.teaches || []).forEach((skillName) => {
        db.insert('userSkills', {
          userId: req.user.id,
          skillName,
          type: 'teach',
          level: 'Intermediate',
          experienceYears: 2,
        });
      });
      (updatedUser.wants || []).forEach((skillName) => {
        db.insert('userSkills', {
          userId: req.user.id,
          skillName,
          type: 'learn',
          level: 'Beginner',
          experienceYears: 0,
        });
      });
    }

    const { password, ...safeUser } = updatedUser;
    return res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: safeUser,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'usr_narendar';
    const skills = db.find('userSkills', { userId });

    const teaching = skills
      .filter((s) => s.type === 'teach')
      .map((s) => ({ name: s.skillName, level: s.level || 'Intermediate' }));

    const learning = skills
      .filter((s) => s.type === 'learn')
      .map((s) => ({ name: s.skillName, level: s.level || 'Beginner' }));

    return res.json({
      success: true,
      portfolio: {
        teaching,
        learning,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
