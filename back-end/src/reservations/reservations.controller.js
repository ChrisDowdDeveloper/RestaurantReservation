const service = require("./reservations.service")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list(req.params);
  console.log("backend data " + data)
  res.json({ data })
}

async function create(req, res, next) {
  const created = await service.create(req.body.data)
  res.status(201).json({ data: created });
}

module.exports = {
  list,
  create,
};
