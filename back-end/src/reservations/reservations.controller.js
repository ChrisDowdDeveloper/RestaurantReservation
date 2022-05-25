const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
 async function list(req, res) {
  if (req.query.mobile_number) {
    res.json({ data: await service.listByNumber(req.query.mobile_number) });
  } else {
    res.json({ data: await service.list(req.query.date) });
  }
}


async function create(req, res, next) {
  const created = await service.create(req.body.data)
  res.status(201).json({ data: created });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create,
};
