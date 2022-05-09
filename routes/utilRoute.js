const express = require("express");
const { createAdmin } = require("../controllers/admin");

const utilRoute = express.Router();

utilRoute.post("/", createAdmin);

module.exports = utilRoute;