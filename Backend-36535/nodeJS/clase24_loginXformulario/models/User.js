require("dotenv/config");
//const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//const collectionsMongo = "dbUsers";
//const uri = path.join(process.env.MONGO_URI, collectionsMongo); // con esto me da error
//const uri = process.env.MONGO_URI + "/" + process.env.MONGO_COLLECTION;
const uri = process.env.MONGO_ATLAS;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "name is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
});

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

schema.methods.comparePWD = (password, hash) => {
  const result = bcrypt.compareSync(password, hash);
  return result;
};

module.exports = mongoose.model("User", schema);
