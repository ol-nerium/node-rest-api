import express from "express";
// import {
//   getAllContacts,
//   getOneContact,
//   deleteContact,
//   createContact,
//   updateContact,
// } from "../controllers/contactsControllers.js";

import contactsControllers from "../controllers/contactsControllers.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = contactsControllers;

import validateBody from "../helpers/validateBody.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

// validateBody;

// const {
//   getAllContacts,
//   getOneContact,
//   deleteContact,
//   createContact,
//   updateContact,
// } = contactsControllers;

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

export default contactsRouter;
