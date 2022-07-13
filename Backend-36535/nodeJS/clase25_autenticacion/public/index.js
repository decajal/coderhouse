console.log("hola mundo");
let submitBtn = document.getElementById("submitButton");
let form = document.getElementById("formRegister");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let sendObject = {};
  let data = new FormData(form);
  data.forEach((value, key) => (sendObject[key] = value));
  console.log(sendObject);

  fetch("/register", {
    method: "POST",
    body: JSON.stringify(sendObject),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((result) => result.json())
    .then(() => location.replace("./pages/login.html"));
});
