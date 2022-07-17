const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const api = require("./operation/api");
// to use json formata data
app.use(express.json());

// to create and connect the database
const mongoose = require("mongoose");
// const { json } = require("express");
mongoose
  .connect("mongodb://localhost:27017/mongoose1")
  .then((res) => {
    console.log("Database is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// to connect with router
app.use("/api", api);
app.get("*", (req, res) => {
  res.json({
    message: "404 page not found",
  });
});

const ErrorHandler = (err, req, res, next) => {
  const ErrorMessage = {
    message: err.message || err || "something went wrong",
    status: err.status || 400,
  };
  res.status(err.status || 400);
  res.json(ErrorMessage);
};
app.use(ErrorHandler);

app.listen(port, (err) => {
  if (err) {
    console.log("error in serve");
  }
  console.log("Server listent port :" + port);
});
