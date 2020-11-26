const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/test", (req, res, next) => {
  res.status(200).json({ test: "lol", ko: "ko" });
});

app.use((req, res, next) => {
  res.write("<h1>not found</h1>");
  res.end();
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
