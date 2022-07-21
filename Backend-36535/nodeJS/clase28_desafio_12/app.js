require("dotenv/config");
const parseArgs = require("minimist");
const app = require("./src/server");

let puerto = 8080; // este es el puerto por defecto
const args = parseArgs(process.argv.slice(2));
if (args.p) {
  //console.log("p: ", args.p);
  if (!isNaN(parseInt(args.p))) {
    //console.log(args.p);
    puerto = parseInt(args.p);
  }
} else if (args.Puerto) {
  //console.log("Puerto: ", args.Puerto);
  if (!isNaN(parseInt(args.Puerto))) {
    puerto = parseInt(args.Puerto);
    //console.log(puerto);
  }
}

app.listen(puerto, () => {
  console.log("Server up on port:", puerto);
});
