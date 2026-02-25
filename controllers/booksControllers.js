const books = require("../models/books");
const { HttpError, ctrlWrapper } = require("../helpers");
const validateBody = require("../middlewares");
// const addSchema = require("../schemas");

const getAll = async (req, res, next) => {
  const result = await books.getAll();
  res.json(result);
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  const result = await books.getById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  // validateBody(addSchema);
  const result = await books.add(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  // validateBody(addSchema);
  const { id } = req.params;
  const result = await books.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await books.deleteById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
