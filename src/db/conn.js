const mongoose = require("mongoose");

const url = process.env.DATABASEURL;

mongoose
  .connect(url)
  .then(() => {
    console.log("Mongodb connection is working!!");
  })
  .catch((err) => {
    console.log("connection failed!! ", err.message);
  });
