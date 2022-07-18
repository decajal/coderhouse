require("../connection");
const User = require("../models/User");

async function updateUsers() {
  const user = await User.updateOne(
    { username: "fatz" },
    { password: "contraseñasegura" }
  );
  console.log(user);
}

const someFunction = async () => {
  const user = await User.findOne({ username: "joe" });
  console.log(user);
  user.password = "miNuevaContraseña";
  await user.save();
  console.log(user);
};

const anotherFunction = async () => {
  const user = await User.findOneAndUpdate(
    { username: "clarck" },
    { name: "Gordon Clark" },
    { new: true } // esto para que el datos que nos devuelve sea el actualizado
  );
  console.log(user);
};

//updateUsers();
//someFunction();
anotherFunction();
