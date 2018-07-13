const router = require("express").Router();
const transactionsRoutes = require("./transactions");

// Book routes
router.use("/api", transactionsRoutes);

module.exports = router;
