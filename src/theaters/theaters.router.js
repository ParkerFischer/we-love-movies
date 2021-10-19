const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./theaters.controller");

router.route("/").get(controller.listMoviesShowing).all(methodNotAllowed);

module.exports = router;
