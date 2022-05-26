const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");

/**
  Validator function for the create function
*/

function hasValidProperties(req, res, next) {
  const { data: { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = {} } = req.body
  const timePattern = /^[0-9]{2}:[0-9]{2}?(:[0-9]{2})$/;
  if(!first_name || first_name.length < 0) {
    return next({
      status: 400,
      message: "first_name"
    })
  }
  if(!last_name || last_name.length < 0) {
    return next({
      status: 400,
      message: "last_name"
    }) 
  }
  if(!mobile_number || mobile_number.length == 0) {
    return next({
      status: 400,
      message: "mobile_number"
    })
  }
  if(!reservation_date || new Date(reservation_date) === NaN) {
    return next({
      status: 400,
      message: "reservation_date"
    })
  }
  if(!reservation_time || reservation_time == !timePattern) {
    return next({
      status: 400,
      message: "reservation_time"
    })
  }
  if(people === NaN) {
    return next({
      status: 400,
      message: "people"
    })
  }
  if(!people || people <= 0 || people  === NaN) {
    return next({
      status: 400,
      message: "people"
    })
  }
  return next()
}

function validateReservationTime(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  if(reservation_time > "21:30") {
    return next({
      status: 400,
      message: "reservation_time"
    })
  }
  if(reservation_time < "09:30") {
    return next({
      status: 400,
      message: "reservation_time"
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
  create: [hasValidProperties, validateReservationTime, asyncErrorBoundary(create)],
};
