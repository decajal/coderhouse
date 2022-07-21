const { fork } = require("child_process");

const getInfo = (req, res) => {
  const argsInput = process.argv.slice(2);
  const platformSO = process.platform;
  const nodeVersion = process.version;
  const memRSS = process.memoryUsage().rss;
  const pathEjecucion = process.execPath;
  const idProceso = process.pid;
  const pathProyecto = process.cwd();

  res.render("info", {
    argsInput,
    platformSO,
    nodeVersion,
    memRSS,
    idProceso,
    pathProyecto,
    pathEjecucion,
  });
};

const getRandoms = (req, res) => {
  const repeticiones = req.query.cant || 100000000;
  console.log("Repeticiones:", repeticiones);
  const numerosFork = fork("./src/controllers/randoms.js");

  numerosFork.on("message", (result) => {
    return res.status(200).send(result);
  });

  numerosFork.send(repeticiones); // la cantidad de iteraciones
};

module.exports = { getInfo, getRandoms };
