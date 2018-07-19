const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");

// Matches with "/api/books"
router.route("/")
  // .get(transactionsController.findAll)
  .get(transactionsController.findAll)
  .get(transactionsController.findFive)
  .post(transactionsController.create);
router.route("/transactions")
  // .get(transactionsController.findAll)
  .get(transactionsController.findAll)
  .post(transactionsController.create);

router.route("/trends")
  // .get(transactionsController.findAll)
  .get(transactionsController.sortQuantity)
  .post(transactionsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(transactionsController.findById)
  .put(transactionsController.update)
  .delete(transactionsController.remove);

module.exports = router;
