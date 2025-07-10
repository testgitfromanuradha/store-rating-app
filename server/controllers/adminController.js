const User = require("../models/User");
const Store = require("../models/Store");

// Add user (admin or normal)
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};

// Add Store
exports.addStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.create({ name, email, address });
    res.status(201).json({ message: "Store added", store });
  } catch (err) {
    res.status(500).json({ message: "Error adding store" });
  }
};

// Dashboard summary
exports.getDashboard = async (req, res) => {
  try {
    const userCount = await User.count();
    const storeCount = await Store.count();
    const ratingCount = 0; // Will change later after adding ratings

    res.json({
      totalUsers: userCount,
      totalStores: storeCount,
      totalRatings: ratingCount
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading dashboard" });
  }
};

// View all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "address", "role"]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error loading users" });
  }
};

// View all stores
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      attributes: ["id", "name", "email", "address", "rating"]
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: "Error loading stores" });
  }
};
