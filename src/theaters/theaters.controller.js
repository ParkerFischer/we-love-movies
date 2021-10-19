const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function listMoviesShowing(req, res) {
  const data = await service.listMoviesShowing();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listMoviesShowing: asyncErrorBoundary(listMoviesShowing),
};
