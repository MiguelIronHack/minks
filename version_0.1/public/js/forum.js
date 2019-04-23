const formButton = document.getElementById("form-display");
const form = document.getElementsByClassName("form-group");
const createButton = document.getElementById("create-thread");
const url = "http://localhost:3434";
formButton.onclick = displayForm;
createButton.onclick = createThread;

function displayForm() {
  for (let item of form) {
    if (!item.style.display || item.style.display === "none")
      item.style.display = "block";
    else item.style.display = "none";
  }
}

function createThread() {
  const message = document.getElementById("");
  axios
    .post("/create")
    .then()
    .catch();
}

function clearInputs() {}
