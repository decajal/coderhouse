const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

//helpful functions: encrypt password
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    return next();
  }
});

//helpful functions: compare passwords
userSchema.methods.comparePassword = function (plaintText, callback) {
  return callback(null, bcrypt.compareSync(plaintText, this.password));
};

module.exports = mongoose.model("User", userSchema);
