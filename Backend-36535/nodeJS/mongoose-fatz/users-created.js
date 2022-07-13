require("./connection");
const User = require("./models/User");

async function createUsers() {
  const user1 = new User({
    username: "donna",
    password: "12345",
  });

  const user2 = new User({
    username: "cameron",
    password: "12345",
  });

  await user1.save();
  await user2.save();
}

createUsers();
