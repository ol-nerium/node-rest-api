const express = require("express");

const ctrl = require("../../controllers/booksControllers");

const router = express.Router();

const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.add);

router.put("/:id", validateBody(addSchema), ctrl.updateById);

router.delete("/:id", ctrl.deleteById);

module.exports = router;
