const Rating = require("../models/Rating");
const Store = require("../models/Store");

exports.submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 to 5" });
    }

    const existing = await Rating.findOne({ where: { userId, storeId } });

    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json({ message: "Rating updated", rating: existing });
    }

    const newRating = await Rating.create({ userId, storeId, rating });

    return res.status(201).json({ message: "Rating submitted", rating: newRating });
  } catch (err) {
    res.status(500).json({ message: "Error submitting rating" });
  }
};

exports.getUserRatings = async (req, res) => {
  try {
    const userId = req.user.id;
    const ratings = await Rating.findAll({
      where: { userId },
      include: ["Store"]
    });

    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: "Error loading user ratings" });
  }
};
