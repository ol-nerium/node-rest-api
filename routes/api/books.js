const express = require("express");
const joi = require("joi");

const books = require("../../models/books");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await books.getAll();
    res.json(result);

    // if (!result) {
    //   throw HttpError(404, "Not found");
    // }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await books.getById(id);

    if (!result) {
      // return res.status(404).json({ message: "Not found" });

      // const error = new Error("Not found");
      // error.status = 404;

      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({
    //   message,
    // });
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await books.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await books.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.deleteById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    // res.status(204).send(); // тіло відповіді не має сенсу, з 204 статусом відправки не буде
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
