const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const fs = require("fs");

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

const spacesEndpoint = new AWS.Endpoint("fra1.digitaloceanspaces.com");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "7KUEZUCBADS76QQE2QCP",
  secretAccessKey: "YWG1wlMvpGMUtPuMf9bqBkYDGEPdTWPR/0BiA6Njc2U",
});

//to download an image

// var params = {
//   Bucket: "myspacelol",
//   Key: "lol.png",
// };

// s3.getObject(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   else fs.writeFileSync("./hello.png", data.Body);
// });
//to download an image

//to upload an image to a server

// var params = {
//   Bucket: "myspacelol",
//   Key: "namewater.png",
//   Body: fs.readFileSync("./io.png"),
//   ACL: "public-read",
// };

// s3.putObject(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });

//to upload image to spaces

//to create a bucket

// var params = {
//   Bucket: "somespacenamelol",
// };
// s3.createBucket(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });

// const file = fs.readFileSync(__dirname + "/logo192.png");
// s3.putObjet(
//   { Bucket: "myspacelol", Key: "lol.png", Body: file, ACL: "public" },
//   (err, data) => {
//     if (err) return console.log(err);
//     console.log("Your file has been uploaded successfully!", data);
//   }
// );

// to create a bucket
/*
aws.config.update({
  accessKeyId: "spacesKey",
  secretAccessKey: "HBMUKQLL2SPGF5MFAFXC",
});
const spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

YWG1wlMvpGMUtPuMf9bqBkYDGEPdTWPR/0BiA6Njc2U
7KUEZUCBADS76QQE2QCP
*/

// app.put("/upload", (req, res, next) => {
//   console.log(req.files);
// var params = {
//   Bucket: "myspacelol",
//   Key: "hello.png",
//   Body: req.files,
//   ACL: "public-read",
// };

// s3.putObject(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });
// });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "myspacelol",
    acl: "public-read",
    key: function (request, file, cb) {
      // console.log(file);
      cb(null, file.originalname);
    },
  }),
}).array("lol", 1);

app.post("/upload", function (request, response, next) {
  upload(request, response, function (error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("File uploaded successfully.");
  });
});

// app.post("/upload", upload.single("lol"), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log(req.file);
//   var params = {
//     Bucket: "myspacelol",
//     Key: "hello.png",
//     Body: fs.readFileSync(`./${req.file.path}`),
//     ACL: "public-read",
//   };
//   s3.putObject(params, function (err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log(data);
//   });
// });

app.use("/test", (req, res, next) => {
  res.status(200).json({ test: "lol", ko: "ko" });
});
app.use("/error", (req, res, next) => {
  res.status(200).json({ message: "error" });
});
app.use("/success", (req, res, err) => {
  res.status(200).json({ message: "Done" });
});
app.use((req, res, next) => {
  res.write("<h1>not found</h1>");
  res.end();
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
//https://myspacelol.fra1.digitaloceanspaces.com/namewater.png
