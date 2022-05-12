/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router
    .route("/:reservation_id/status")
    .put(controller.update)
    .all(methodNotAllowed);

router
    .route("/:reservation_id/edit")
    .put(controller.update)
    .all(methodNotAllowed);

router
    .route("/:reservation_id")
    .all(methodNotAllowed);

router
    .route("/new")
    .all(methodNotAllowed);

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;
