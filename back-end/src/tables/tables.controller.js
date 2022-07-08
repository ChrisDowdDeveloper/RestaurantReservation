const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

// Middleware
VALID_FIELDS = ["table_name", "capacity"];

//Checking if the form has the data
function formHasData(req, res, next) {
    const data = req.body.data;
    if (data) return next();
    else
        return next({
            status: 400,
            message: "All fields need valid input",
        });
}

//Checking if the form has a reservation seated at it
function hasReservation(req, res, next) {
    const { reservation_id } = req.body.data;
    if (reservation_id) {
        return next();
    }
    next({
        status: 400,
        message: "reservation_id is required",
    });
}

async function tableExists(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (table) {
        res.locals.table = table;
        return next();
    }
    next({
        status: 404,
        message: `Table ${table_id} does not exist`,
    });
}

//Validating that a reservation trying to be seated is valid
async function reservationExists(req, res, next) {
    const { reservation_id } = req.body.data;
    const reservations = await reservationsService.read(reservation_id);
    const reservation = reservations[0];
    if (reservation) {
        res.locals.reservation = reservation;
        return next();
    } else
        return next({
            status: 404,
            message: `${reservation_id} does not exist`,
        });
}

function tableNameIsValid(req, res, next) {
    const { table_name } = req.body.data;
    if (table_name && table_name.length >= 2) {
        return next();
    } else
        return next({
            status: 400,
            message: "table_name must be 2 characters or more",
        });
}

async function partySizeIsValid(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (res.locals.reservation.people > Number(table.capacity)) {
        return next({
            status: 400,
            message: "Table capacity is too small for reservation size",
        });
    }
    next();
}

//Validating that the table is not occupied
async function isOccupied(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (table.reservation_id === null) {
        return next();
    }
    next({
        status: 400,
        message: "This table is already occupied",
    });
}

//Validating that the table is occupied and can be cleared
async function isFree(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (table.reservation_id === null) {
        return next({
            status: 400,
            message: "Table is not occupied",
        });
    }
    return next();
}

function capacityIsValid(req, res, next) {
    const { capacity } = req.body.data;
    if (capacity && typeof capacity === "number" && Number(capacity) > 0) {
        return next();
    } else
        return next({
            status: 400,
            message: "capacity must be a number larger than 0",
        });
}

async function reservationIsSeated(req, res, next) {
    if (res.locals.reservation.status === "seated") {
        return next({
            status: 400,
            message: "This reservation is already seated",
        });
    } else return next();
}

// CRUDL

async function list(req, res, next) {
    const data = await service.list();
    res.json({ data });
}

async function create(req, res, next) {
    const newTable = req.body.data;
    const data = await service.create(newTable);
    res.status(201).json({ data });
}

async function update(req, res) {
    const { table_id } = req.params;
    const { reservation_id } = req.body.data;
    const data = await service.update(reservation_id, table_id);
    res.status(200).json({ data });
}

async function finishTable(req, res, next) {
    const { table_id, reservation_id } = res.locals.table;
    const data = await service.finishTable(reservation_id, table_id);
    res.status(200).json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        formHasData,
        tableNameIsValid,
        capacityIsValid,
        asyncErrorBoundary(create),
    ],
    update: [
        formHasData,
        hasReservation,
        asyncErrorBoundary(reservationExists),
        reservationIsSeated,
        asyncErrorBoundary(partySizeIsValid),
        asyncErrorBoundary(isOccupied),
        asyncErrorBoundary(update),
    ],
    finishTable: [
        tableExists,
        isFree,
        asyncErrorBoundary(finishTable),
    ],
};