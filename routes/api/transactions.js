const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");

// Matches with "/api/books"
router.route("/api")
  .get(transactionsController.findAll)
  .post(transactionsController.create);

// Matches with "/api/books/:id"
router
  .route("/api/:id")
  .get(transactionsController.findById)
  .put(transactionsController.update)
  .delete(transactionsController.remove);

module.exports = router;