let submitBtn = document.getElementById("submitButton");
let form = document.getElementById("formLogin");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let sendObject = {};
  let data = new FormData(form);
  data.forEach((value, key) => (sendObject[key] = value));
  console.log(sendObject);

  fetch("/login", {
    method: "POST",
    body: JSON.stringify(sendObject),
    headers: {
      "content-type": "application/json",
    },
  }).then(() => location.replace("./profile.html"));
});
