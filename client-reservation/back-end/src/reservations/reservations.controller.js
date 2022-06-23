const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasOnlyValidProperties = require("../errors/hasOnlyValidProperties");

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]

const VALID_PROPERTIES = [
  ...REQUIRED_PROPERTIES,
  "status",
  "reservation_id",
  "created_at",
  "updated_at",
]

// Validation Middleware--checks that reservation date has been correctly sent
function dateIsValid(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = Date.parse(reservation_date);
  if (date && date > 0) {
    return next();
  } else {
    return next({
      status: 400,
      message: `reservation_date field formatted incorrectly: ${reservation_date}.`,
    });
  }
}

// Validation Middleware--checks that reservation time has been corrently sent
function timeIsValid(req, res, next) {
  const { reservation_time } = req.body.data;
  const regex = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]");
  if (regex.test(reservation_time)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `reservation_time field formatted incorrectly: ${reservation_time}`,
    });
  }
}

// Validation Middleware--checks that the value of people is a number
function peopleIsNumber(req, res, next) {
  let people = req.body.data.people;
  if (typeof people === "number") {
    return next()
  }
  next({
    status: 400,
    message: "people"
  })
}

// Validation Middleware--checks that the reservation date & reservation time have not passed
function notInPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const reservation = new Date(`${reservation_date} PDT`).setHours(reservation_time.substring(0, 2), reservation_time.substring(3));
  const now = Date.now();
  if (reservation > now) {
    return next();
  } else {
    return next({
      status: 400,
      message: "Reservation must be in the future.",
    });
  }
}


// Validation Middleware--checks that the reservation date is not on a Tuesday
function notTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = new Date(reservation_date);
  const day = date.getUTCDay();
  if (day === 2) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesday.",
    });
  } else {
    return next();
  }
}


// Validation Middleware--checks that the reservation time is during hours of operation
function whenOpen(req, res, next) {
  const { reservation_time } = req.body.data;
  const openTime = 1030;
  const closeTime = 2130;
  const reservation = reservation_time.substring(0, 2) + reservation_time.substring(3);
  if (reservation > openTime && reservation < closeTime) {
    return next();
  } else {
    return next({
      status: 400,
      message: "Reservations are only allowed between 10:30am and 9:30pm",
    });
  }
}

// Validation Middleware--checks if the reservation status is set to "booked" by default
function statusBooked(req, res, next) {
  const { status } = req.body.data;
  if (status) {
    if (status === "booked") {
      return next();
    } else {
      return next({
        status: 400,
        message: `status cannot be set to ${status} when creating a new reservation.`,
      });
    }
  } else {
    return next();
  }
}



// Validation Middleware--checks the request query 
// if query is date, check that the selected date has reservations that aren't finished
// if query is mobile_number, look for reservations matching that number
async function byDateOrPhone(req, res, next) {
  const { date, mobile_number } = req.query;
  if (date) {
    const reservations = await service.list(date);
    if (reservations.length) {
      res.locals.data = reservations;
      return next();
    } else {
      return next({
        status: 404,
        message: `There are currently no pending reservations for ${date}`,
      });
    }
  }
  if (mobile_number) {
    const reservation = await service.find(mobile_number);
    res.locals.data = reservation;
    return next();
  }
}

// Validation Middleware--checks if reservation id exists
async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  if (data) {
    res.locals.reservation = data;
    return next();
  } else {
    return next({
      status: 404,
      message: `reservation_id: ${reservation_id} does not exist.`
    });
  }
}

// Validation Middleware--checks that the status type is valid
function statusIsValid(req, res, next) {
  const { status } = req.body.data;
  const validValues = ["booked", "seated", "finished", "cancelled"];
  if (validValues.includes(status)) {
    res.locals.status = status;
    return next();
  } else {
    return next({
      status: 400,
      message: `invalid status: ${status}. Status must be one of these options: ${validValues.join(", ")}`,
    });
  }
}

// Validation Middleware--checks that status is not finished
function statusIsNotFinished(req, res, next) {
  const { reservation } = res.locals;
  if (reservation.status === "finished") {
    return next({
      status: 400,
      message: "A finished reservation cannot be updated.",
    });
  } else {
    return next();
  }
}


// list the reservations
function list(req, res) {
  const { data } = res.locals;
  res.json({ data: data });
}

// creates a reservation
async function create(req, res) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation });
}

// reads a reservation
function read(req, res) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

// updates a reservation status
async function updateStatus(req, res) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  await service.statusUpdate(reservation_id, status);
  res.json({ data: { status } });
}

// updates a reservation
async function updateReservation(req, res) {
  const { reservation } = res.locals;
  const { data } = req.body;
  const updatedReservationData = {
    ...reservation,
    ...data,
  }
  await service.update(updatedReservationData);
  res.json({ data: data });
}

module.exports = {
  list: [
    asyncErrorBoundary(byDateOrPhone),
    list,
  ],
  create: [
    hasProperties(...REQUIRED_PROPERTIES),
    hasOnlyValidProperties(...VALID_PROPERTIES),
    dateIsValid,
    timeIsValid,
    peopleIsNumber,
    notTuesday,
    notInPast,
    whenOpen,
    statusBooked,
    asyncErrorBoundary(create),
  ],
  read: [
    asyncErrorBoundary(reservationExists),
    read,
  ],
  updateStatus: [
    hasProperties("status"),
    hasOnlyValidProperties("status"),
    asyncErrorBoundary(reservationExists),
    statusIsValid,
    statusIsNotFinished,
    asyncErrorBoundary(updateStatus),
  ],
  updateReservation: [
    hasProperties(...REQUIRED_PROPERTIES),
    hasOnlyValidProperties(...VALID_PROPERTIES),
    asyncErrorBoundary(reservationExists),
    dateIsValid,
    timeIsValid,
    peopleIsNumber,
    notTuesday,
    notInPast,
    whenOpen,
    asyncErrorBoundary(updateReservation),
  ]
};