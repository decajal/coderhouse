const parseArgs = require("minimist");
const express = require("express");

let puerto = 8080;
const args = parseArgs(process.argv.slice(2));
console.log("Argumentos:", process.argv.slice(2).length);
process.argv.slice(2).forEach((element) => {
  console.log(element);
});
if (args.p) {
  //console.log("p: ", args.p);
  if (!isNaN(args.p)) {
    puerto = parseInt(args.p);
    console.log(puerto);
  }
} else if (args.Puerto) {
  //console.log("Puerto: ", args.Puerto);
  if (!isNaN(args.Puerto)) {
    puerto = parseInt(args.Puerto);
    console.log(puerto);
  }
}
if (args.Puerto) console.log("Puerto: ", args.Puerto);

const app = express();

//const port = 8080;
app.listen(puerto, () => console.log(`Server up on port: ${puerto}`));
