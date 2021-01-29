// import modules and packages
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// create express app
const app = express();

// connect app to middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route files
app.use(require("./routes"));
app.use(require("./middleware/error"));

// export app to http server ('./bin/www')
module.exports = app;
