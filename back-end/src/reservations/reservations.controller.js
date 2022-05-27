const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");
const { prependOnceListener } = require("../db/connection");

/**
  Validator function for the create function
*/

function hasValidProperties(req, res, next) {
  const { data: { first_name, last_name, mobile_number } = {} } = req.body;
  if (!first_name || first_name.length < 0) {
    return next({
      status: 400,
      message: "first_name"
    })
  }
  if (!last_name || last_name.length < 0) {
    return next({
      status: 400,
      message: "last_name"
    })
  }
  if (!mobile_number || mobile_number.length == 0) {
    return next({
      status: 400,
      message: "mobile_number"
    })
  }
  return next()
}

function validDateProperty(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  let today = new Date().toISOString().slice(0, 10)

  if (new Date(reservation_date).getDay() === 1) {
    return next({
      status: 400,
      message: "closed"
    })
  }
  if (!reservation_date || isNaN(new Date(reservation_date))) {
    return next({
      status: 400,
      message: "reservation_date"
    })
  }
  if (reservation_date < today) {
    return next({
      status: 400,
      message: "future"
    })
  }
  return next()
}

function validPeopleProperty(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (!people) {
    return next({
      status: 400,
      message: "people doesnt exist"
    })
  }
  if (people <= 0) {
    return next({
      status: 400,
      message: "people size is not right"
    })
  }
  if (typeof people !== 'number') {
    return next({
      status: 400,
      message: "people isnt a number"
    })
  }
  return next();
}

function validateReservationTime(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  const timePattern = /^[0-9]{2}:[0-9]{2}?(:[0-9]{2})$/;
  let today = new Date();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let currentTime = `${hour}:${minutes}`;

  if (!reservation_time || timePattern.test(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time"
    })
  }

  if (reservation_time > "21:30") {
    return next({
      status: 400,
      message: "reservation_time after 9:30pm"
    })
  }

  if (reservation_time < "10:30") {
    return next({
      status: 400,
      message: "reservation_time before 10:30am"
    })
  }

  if (reservation_time < currentTime) {
    return next({
      status: 400,
      message: "reservation_time is before current time"
    })
  }
  return next();
}

/**
 * List handler for reservation resources
 */

async function list(req, res) {
  let reservationDate = req.query.date
  let reservations = await service.list(reservationDate)
  res.json({ data: reservations });
}

async function create(req, res, next) {
  const created = await service.create(req.body.data)
  res.status(201).json({ data: created });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasValidProperties,
    validDateProperty,
    validPeopleProperty,
    validateReservationTime,
    asyncErrorBoundary(create)],
};
