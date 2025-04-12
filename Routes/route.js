const express = require("express");
const routes = express.Router();

const adminCtl = require("../Controller/contactController");

routes.post("/contact", adminCtl.contact);
routes.get("/adminDashboard", adminCtl.adminDashboard);
routes.delete('/adminDashboard/:id', adminCtl.deleteContact); // Delete a specific contact by ID
routes.delete('/adminDashboard', adminCtl.deleteContacts); // Delete multiple contacts

module.exports = routes;
