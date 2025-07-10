const Rating = require("../models/Rating");
const Store = require("../models/Store");
const User = require("../models/User");

exports.getMyStoreRatings = async (req, res) => {
  try {
    const storeOwnerEmail = req.user.email;

    // Step 1: Get the store owned by this user
    const store = await Store.findOne({ where: { email: storeOwnerEmail } });

    if (!store) {
      return res.status(404).json({ message: "Store not found for this owner" });
    }

    // Step 2: Get all ratings for that store, include user info
    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      include: [
        {
          model: User,
          attributes: ["name", "email", "address"]
        }
      ]
    });

    res.json({
      storeName: store.name,
      averageRating: store.rating,
      ratedBy: ratings
    });

  } catch (err) {
    res.status(500).json({ message: "Error loading store ratings" });
  }
};
