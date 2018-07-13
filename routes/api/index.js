const router = require("express").Router();
const transactionsRoutes = require("./transactions");

// Book routes
router.use("/", transactionsRoutes);

module.exports = router;
