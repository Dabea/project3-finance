const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");

// Matches with "/api/books"
router.route("/")
  // .get(transactionsController.findAll)
  .get(transactionsController.findFive)
  .post(transactionsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(transactionsController.findById)
  .put(transactionsController.update)
  .delete(transactionsController.remove);

module.exports = router;
