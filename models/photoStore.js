const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://senna:senna123456@cluster0.wkkpa.mongodb.net/ImgurClone?authSource=admin&replicaSet=atlas-fnstjd-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

const imgStoreSchema = new mongoose.Schema({
  url: String,
  name: String,
  description: String,
  topic: String,
  tags: [String],
});

const Img = mongoose.model("Img", imgStoreSchema);

exports.registerImg = async (url, name, description, topic, tags) => {
  const newImg = new Img({
    url: url,
    name: name,
    description: description,
    topic: topic,
    tags: tags.split(","),
  });
  await newImg.save((err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Img saved succesfully");
    }
  });
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
//     const user = await User.findOne({ username: username });
//     return user;
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// };
