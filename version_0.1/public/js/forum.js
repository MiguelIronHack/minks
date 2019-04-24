const formButton = document.getElementById("form-display");
const form = document.getElementsByClassName("form-group");
const createButton = document.getElementById("create-thread");
const url = "http://localhost:3434";

formButton.onclick = displayForm;
createButton.onclick = createThread;

//It took me more time than expected
//The page rendering will be done client side and server side
// Server side > Rendering the first part of the data
// Client side we need a templating function for all the html Markup
// To dynamically display html elements

function displayForm() {
  for (let item of form) {
    if (!item.style.display || item.style.display === "none")
      item.style.display = "block";
    else item.style.display = "none";
  }
}

function createThread(evt) {
  evt.preventDefault();
  const formTextArea = document.getElementById("form-message");
  const titleElement = document.getElementById("new-post-forum-title");
  const title = titleElement.value;
  const message = formTextArea.value;
  //Get user id from somewhere;
  const ele = document.getElementById("form-category");
  const category = ele.options[ele.selectedIndex].value;
  //Action to display error messages if the message is empty
  //return if requirements are not met
  if (category && message && title) {
    clearInputs([titleElement, formTextArea]);
    axios
      .post("api/thread/create", { category, message, title })
      .then(response => displaySuccess())
      .catch(err => displayError(err));
  }
}
function getThreads(page, count) {
  axios
    .get(url + "/api/thread/all" + `/${page}/${count}`)
    .then(response => displaySuccess())
    .catch(err => displayError(err));
}

function clearInputs(elements) {
  for (let ele of elements) ele.value = "";
}
function displaySuccess() {
  console.log("Success");
}
function displayError(dbMessage) {
  console.log("There was and error: ", dbMessage);
}
