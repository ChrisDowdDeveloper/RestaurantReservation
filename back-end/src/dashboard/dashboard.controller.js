const service = require("./dashboard.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    console.log(req.query)
    const data = await service.getReservationByDate(daySelected);
    console.log("data here " + data)
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
}