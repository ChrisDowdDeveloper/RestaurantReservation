/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router.route("/reservations/:reservation_date")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;
