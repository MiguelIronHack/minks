const formButton = document.getElementById("form-display");
const form = document.getElementsByClassName("form-group");
const createButton = document.getElementById("create-thread");
const threadNode = document.getElementById("thread-container");
const url = document.getElementById("site-url").content;

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
      item.style.display = "flex";
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
  const userId = document.getElementById("username").getAttribute("user-id");
  const userName = document.getElementById("username").textContent.trim();

  //Action to display error messages if the message is empty
  //return if requirements are not met
  if (category && message && title) {
    clearInputs([titleElement, formTextArea]);
    axios
      .post("api/thread/create", { owner: userId, category, message, title })
      .then(response => {
        appendThread(threadNode, userName, message, title);
      })
      .catch(err => displayError(err));
  }
}

function getThreads(page, count) {
  axios
    .get(url + "/api/thread/all")
    .then(response => displaySuccess(response))
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

function appendThread(parentNode, userName, message, title) {
  parentNode.insertAdjacentHTML(
    "afterbegin",
    `<div class="card text-white bg-light mx-5 forum-card">
    <a> 
     <h5 class="card-header text-white card-title">hffhf</h5>
        </a>
       <div class="card-body">
         <p>${message}</p>
         <p class="badge badge-success card-text">${userName}</p>
       </div>
     </div>`
  );
}
