const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware
const VALID_FIELDS = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

//Validating if reservation is made on Tuesday, In the past, or if the reservation was made before or after closing time
function timeDateValid(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const day = new Date(reservation_date).getUTCDay();
  const today = new Date();
  const reservationDate = new Date(reservation_date);
  if (day === 2) {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays",
    });
  }
  if (today > reservationDate) {
    return next({
      status: 400,
      message: "Reservation must be future dates only",
    });
  }
  if (reservation_time < "10:30" || reservation_time > "21:30") {
    return next({
      status: 400,
      message: "reservation_time must be between 10:30am and 9:30pm",
    });
  } else return next();
}

//Validating that the submitted form has data
function formHasInput(req, res, next) {
  const { data = {} } = req.body;
  try {
    VALID_FIELDS.forEach((fields) => {
      if (!data[fields]) {
        const error = new Error(`A '${fields}' is required.`);
        error.status = 400;
        throw error;
      }
    });
    next();
  } catch (error) {
    next(error);
  }
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservations = await service.read(reservation_id);
  const reserve = reservations[0];
  if (reserve) {
    res.locals.reservation = reserve;
    return next();
  }
  next({
    status: 404,
    message: `${reservation_id} not found`,
  });
}

async function statusIsBooked(req, res, next) {
  const { status } = req.body.data;
  if (!status || status === "booked") {
    return next();
  } else {
    return next({
      status: 400,
      message:
        "reservation status cannot be finished or seated",
    });
  }
}

//Validating if the requested reservation has at least 1 person
function peopleIsValid(req, res, next) {
  const people = req.body.data.people;
  const partySize = Number.isInteger(people);
  if (people > 0 && partySize) {
    return next();
  }
  return next({
    status: 400,
    message: `people size must be greater than 1`,
  });
}

//Validating if the reservation date is correctly formatted
function dateIsValid(req, res, next) {
  const date = req.body.data.reservation_date;
  const reservationDate = Date.parse(date);

  if (reservationDate) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_date is not a valid date.`,
  });
}

//Validating if the reservation time is correctly formatted
function timeIsValid(req, res, next) {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  if (!timeRegex.test(time)) {
    return next({
      status: 400,
      message: `reservation_time is not a valid time`,
    });
  }
  return next();
}

//Making sure the status is a valid status
function statusIsValid(req, res, next) {
  const { status } = req.body.data;
  const acceptableStatus = ["booked", "seated", "finished", "cancelled"];
  if (acceptableStatus.includes(status)) {
    return next();
  } else {
    return next({
      status: 400,
      message:
        "Status cannot be unknown",
    });
  }
}

//Validating that the reservation can be be updated by checking for a finished status
async function isStatusFinished(req, res, next) {
  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: "a `finished` status cannot be updated",
    });
  }
  return next();
}

//CRUDL
async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else if (mobile_number) {
    const data = await service.listByPhone(mobile_number);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

async function create(req, res) {
  const { data } = req.body;
  const created = await service.create(data);
  res.status(201).json({ data: created });
}

async function read(req, res) {
  const { reservation_id } = req.params;
  const response = await service.read(reservation_id);
  const data = response[0];
  res.json({ data });
}

async function updateStatus(req, res) {
  const { status } = req.body.data;
  const { reservation_id } = req.params;
  const data = await service.updateStatus(status, reservation_id);
  res.status(200).json({ data });
}

async function update(req, res, next) {
  const { reservation_id } = req.params;
  const updated = { ...req.body.data };
  const data = await service.update(updated, reservation_id);
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    formHasInput,
    statusIsBooked,
    timeDateValid,
    dateIsValid,
    peopleIsValid,
    timeIsValid,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusIsValid,
    isStatusFinished,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    formHasInput,
    timeDateValid,
    dateIsValid,
    peopleIsValid,
    timeIsValid,
    asyncErrorBoundary(update),
  ],
};