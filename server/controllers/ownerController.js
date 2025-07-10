const { Store, Rating, User } = require("../models");

exports.getStoreRatings = async (req, res) => {
  try {
    // Find the store owned by this user
    const store = await Store.findOne({ where: { ownerId: req.user.id } });

    if (!store) {
      return res.status(404).json({ message: "Store not found for this owner" });
    }

    // Get ratings with user info
    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      include: [{ model: User, attributes: ["name", "email"] }],
    });

    res.json({
      store: {
        name: store.name,
        address: store.address,
        rating: store.rating,
      },
      ratings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
