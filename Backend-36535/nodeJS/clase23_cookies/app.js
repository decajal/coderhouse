const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8080;
app.use(cookieParser("Cod3rTeco")); // <firma de la cookie! es muy importante para poder detectarla !
app.use(express.json());

const server = app.listen(PORT, () =>
  console.log(`Server listening on port: ${PORT}`)
);

//Este código es anterior al sdesafio complementario de la clase
// app.get("/set-cookies", (req, res) => {
//   res
//     .cookie("oreo", "Telecom was here !!", { signed: true })
//     .send({ message: "Cookie setted" });
// });

// app.get("/get-cookies", (req, res) => {
//   res.send(req.signedCookies);
// });

// app.get("/clear", (req, res) => {
//   res.clearCookie("oreo").send({ message: "Cookie deleted" });
// });

app.get("/cookies", (req, res) => {
  res.send(req.signedCookies);
});

app.delete("/cookies/:name", (req, res) => {
  res.clearCookie(req.params.name).send({ message: "Galleta eliminada" });
});

app.post("/cookies", (req, res) => {
  let { name, value, expires } = req.body;
  res
    .cookie(name, value, { signed: true, maxAge: expires })
    .send({ message: "Galleta creada" });
});
