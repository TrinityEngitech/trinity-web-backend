const express = require("express");
const routes = express.Router();

const adminCtl = require("../Controller/contactController");
const passport = require("passport");

routes.post("/login",  adminCtl.login)
routes.get("/logout", adminCtl.logout)


routes.post("/contact", passport.checkAuthentication, adminCtl.contact);
routes.get("/adminDashboard", passport.checkAuthentication, adminCtl.adminDashboard);
routes.post("/addAdmin", passport.checkAuthentication, adminCtl.addAdmin);
routes.get("/viewAdmin", passport.checkAuthentication, adminCtl.viewAdmin);
routes.get("/profile", passport.checkAuthentication,  adminCtl.profile);



module.exports = routes;
