const generaRandoms = (cant) => {
  maximo = 1000;
  const numRandoms = [];
  for (let i = 0; i < cant; i++) {
    const x = Math.floor(Math.random() * maximo) + 1;
    numRandoms.push(x);
  }

  //  return { ...numRandoms };
  return numRandoms;
};

process.on("message", (cant) => {
  const result = generaRandoms(cant);
  process.send(result);
});
