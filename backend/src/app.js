const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const testRouter = require("./routes");

app.use("/", testRouter);
module.exports = app;
