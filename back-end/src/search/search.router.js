const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./search.controller");

router
    .route("/:reservation_id/status")
    .put(controller.update)

router
    .route("/:reservation_id/edit")
    .put(controller.update)

router
    .route("/new")
    .all(methodNotAllowed);

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;