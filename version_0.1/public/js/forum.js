const formButton = document.getElementById("form-display");
const form = document.getElementsByClassName("form-group");
const createButton = document.getElementById("create-thread");
const threadNode = document.getElementById("thread-container");
const url = document.getElementById("site-url").content;
console.log(url);
const userId = document.getElementById("user").getAttribute("user-id") || null;
const userName = document.getElementById("user").getAttribute("user-name");
console.log(userName);
formButton.onclick = displayForm;
createButton.onclick = createThread;

if (userId === "none" || userName === "login") {
  createButton.setAttribute("data-toggle", "modal");
  createButton.setAttribute("data-target", "#error-modal");
}

function displayForm() {
  for (let item of form) {
    if (!item.style.display || item.style.display === "none")
      item.style.display = "flex";
    else item.style.display = "none";
  }
}

function createThread(evt) {
  evt.preventDefault();
  if (userId === "none" || userName === "login") return;
  const formTextArea = document.getElementById("form-message");
  const titleElement = document.getElementById("new-post-forum-title");
  const title = titleElement.value;
  const message = formTextArea.value;
  //Get user id from somewhere;
  const ele = document.getElementById("form-category");
  const category = ele.options[ele.selectedIndex].value;

  if (category && message && title) {
    clearInputs([titleElement, formTextArea]);
    axios
      .post(url + "/api/thread/create", {
        owner: userId,
        category,
        message,
        title
      })
      .then(response => {
        let date = moment(response.data.date).format("MMMM Do YYYY, h:mm");
        const threadId = response.data._id;
        appendThread(threadNode, userName, message, title, threadId, date);
        document.querySelector(
          `button[thread-id="${threadId}"]`
        ).onclick = deleteThreadAXIOS;
        console.log(e);
      })
      .catch(err => displayError(err));
  }
}

const buttons = document.querySelectorAll(".btn-danger");
for (let button of buttons) button.onclick = deleteThreadAXIOS;

function deleteThreadAXIOS(evt) {
  const threadId = evt.target.getAttribute("thread-id");
  axios
    .delete(url + "/api/thread/" + threadId)
    .then(res => {
      evt.target.parentElement.parentElement.remove();
    })
    .catch(err => console.log(err));
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

function appendThread(parentNode, userName, message, title, threadId, date) {
  parentNode.insertAdjacentHTML(
    "afterbegin",
    `<div class="card text-white bg-light mx-5 forum-card">
    <a href="/thread/${threadId}"> 
     <h5 class="card-header text-white card-title">${title}</h5>
        </a>
       <div class="card-body">
         <p>${message}</p>
         <p class="badge badge-success card-text">${userName}</p>
         <p class="card-text">${date}</p>
         <button thread-id="${threadId}" class="btn btn-danger">Delete own thread</button>
       </div>
     </div>`
  );
}
