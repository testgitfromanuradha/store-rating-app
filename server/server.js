const app = require("./app");
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);
const ownerRoutes = require("./routes/ownerRoutes");
app.use("/owner", ownerRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
