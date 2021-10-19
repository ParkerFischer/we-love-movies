const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");

router.route("/").all(methodNotAllowed);

router
  .route("/:reviewId")
  .delete(controller.destroy)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
