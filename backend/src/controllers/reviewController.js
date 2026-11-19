const db = require('../config/db');

exports.createReview = async (req, res) => {
  try {
    const reviewerId = req.user ? req.user.id : 'usr_narendar';
    const { revieweeId, rating, comment, skill, tags } = req.body;

    if (!revieweeId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Reviewee ID, rating, and feedback comment are required.',
      });
    }

    if (reviewerId === revieweeId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot write a review for yourself.',
      });
    }

    const reviewee = db.findById('users', revieweeId);
    if (!reviewee) {
      return res.status(404).json({ success: false, message: 'Reviewee not found.' });
    }

    const newReview = db.insert('reviews', {
      reviewerId,
      revieweeId,
      rating: Number(rating),
      comment: comment.trim(),
      skill: skill || (reviewee.teaches && reviewee.teaches[0]) || 'General Exchange',
      tags: tags || ['Helpful Peer', 'Recommended'],
    });

    // Recalculate reviewee rating
    const allReviewsForUser = db.find('reviews', { revieweeId });
    const avgRating =
      allReviewsForUser.reduce((acc, r) => acc + (r.rating || 5), 0) /
      allReviewsForUser.length;

    db.update('users', revieweeId, {
      rating: Math.round(avgRating * 100) / 100,
      reviewsCount: allReviewsForUser.length,
    });

    return res.status(201).json({
      success: true,
      message: 'Verified peer review published!',
      review: newReview,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = db.find('reviews', { revieweeId: userId });

    const populated = reviews.map((r) => {
      const reviewer = db.findById('users', r.reviewerId);
      return {
        ...r,
        reviewer: reviewer
          ? {
              id: reviewer.id,
              name: reviewer.name,
              username: reviewer.username,
              avatar: reviewer.avatar,
              role: reviewer.role,
            }
          : { id: r.reviewerId, name: 'Verified Peer', avatar: 'VP' },
      };
    });

    // Sort newest first
    populated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const avgRating =
      reviews.length > 0
        ? Math.round(
            (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) * 10
          ) / 10
        : 5.0;

    return res.json({
      success: true,
      count: populated.length,
      averageRating: avgRating,
      reviews: populated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
