const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
mongoose.connect(
  "mongodb+srv://senna:senna123456@cluster0.wkkpa.mongodb.net/ImgurClone?authSource=admin&replicaSet=atlas-fnstjd-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

exports.registerUser = async (username, email, password) => {
  try {
    let user = await User.findOne({ username: username });
    if (user) {
      return { found: true, message: "username already exists" };
    }
    user = await User.findOne({ email: email });
    if (user) {
      return { found: true, message: "email already registered" };
    }
  } catch (err) {
    console.log(err);
    return { found: true, message: "Some error occured" };
  }

  try {
    passW = await bcrypt.hash(password, 10);
    let newUser = new User({
      username: username,
      email: email,
      password: passW,
    });

    await newUser.save();
    console.log("user created");
    return { found: false, message: "User Created" };
  } catch (err) {
    console.log(err);
    return { found: true, message: "Some error occured" };
  }
};

// exports.find = async (username) => {
//   try {
//     const user = await User.findOne({ username: username });

//     return user.password;
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// };

// exports.findUserInfo = async (username) => {
//   try {
//     const user = await User.findOnconst mongoose = require("mongoose");
