const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service")

/**
 Table Validation
*/

function hasValidProperties(req, res, next) {
    const { data: { table_name, capacity } = {} } = req.body;
    if (!table_name || table_name.length < 2) {
        return next({
            status: 400,
            message: "table_name"
        })
    }
    if (!capacity || capacity === NaN || capacity < 1) {
        return next({
            status: 400,
            message: "capacity"
        })
    }
    return next();
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
    const data = await service.list();
    res.json({ data })
}

async function create(req, res, next) {
    const created = await service.create(req.body.data)
    res.status(201).json({ data: created });
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [hasValidProperties, asyncErrorBoundary(create)],
};
