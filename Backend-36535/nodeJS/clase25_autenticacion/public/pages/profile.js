let user;
fetch("/currentUser")
  .then((result) => result.json())
  .then((json) => {
    document.getElementById("username").innerHTML = json.username;
    document.getElementById("address").innerHTML = json.address;
  });
