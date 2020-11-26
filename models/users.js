const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://senna:senna123456@cluster0.wkkpa.mongodb.net/coderInfo?authSource=admin&replicaSet=atlas-fnstjd-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
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
  const newUser = new User({
    username: username,
    email: email,
    password: password,
  });
  await newUser.save((err, result) => {
    if (err) {
      console.log("ghjkl");
      return;
    } else {
      console.log(result.username);
    }
  });
};

exports.find = async (username) => {
  try {
    const user = await User.findOne({ username: username });

    return user.password;
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.findUserInfo = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (err) {
    console.log(err);
    return;
  }
};
