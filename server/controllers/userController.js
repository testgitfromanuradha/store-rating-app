// controllers/userController.js
const { Store, Rating } = require("../models");

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();

    const ratings = await Rating.findAll({
      where: { userId: req.user.id },
    });

    // Add userRating to each store
    const storesWithUserRatings = stores.map((store) => {
      const userRating = ratings.find((r) => r.storeId === store.id);
      return {
        ...store.dataValues,
        userRating: userRating ? userRating.rating : null,
      };
    });

    res.json(storesWithUserRatings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;

  try {
    const existing = await Rating.findOne({ where: { storeId, userId } });

    if (existing) {
      existing.rating = rating;
      await existing.save();
    } else {
      await Rating.create({ storeId, userId, rating });
    }

    // Recalculate store average
    const allRatings = await Rating.findAll({ where: { storeId } });
    const avg =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

    await Store.update({ rating: avg.toFixed(2) }, { where: { id: storeId } });

    res.json({ message: "Rating submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
