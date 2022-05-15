const service = require("./reservations.service")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list();
  res.json({ data })
}

await function create(req, res, next) {
  const created = await service.create(req.body.data)
  res.status(201).json({ data: created });
}

module.exports = {
  list,
  create,
};
