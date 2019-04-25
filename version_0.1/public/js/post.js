const postButton = document.getElementById("create-post");
const userId = document.getElementById("user").getAttribute("user-id");
const serverUrl = document.getElementById("site-url").content;
const threadID = document.getElementById("topic").getAttribute("thread-id");
const threadWrapper = document.getElementById("thread-wrapper");
const userName = document.getElementById("user").textContent;

if (userName.trim() == "login") {
  postButton.setAttribute("data-toggle", "modal");
  postButton.setAttribute("data-target", "#error-modal");
}

function postMessage() {
  document.getElementById;
  if (userName.trim() == "login") return;
  const formTextArea = document.getElementById("post-message");
  const message = formTextArea.value;
  axios
    .post(serverUrl + "/api/post/create", {
      owner: userId,
      message: message,
      threadId: threadID
    })
    .then(result => createPostHTML(threadWrapper, userName, message))
    .catch(err => console.log(err));
}

postButton.onclick = postMessage;

function createPostHTML(node, name, message) {
  node.insertAdjacentHTML(
    "beforeend",
    `<div class="card m-5">
 <div class="card-body">
   <h5 class="badge badge-success card-title">${name}</h5>
   <p class="card-text">${message}</p>
   <h6 class="card-subtitle mb-2 text-muted"></h6>
   <p class="card-text"></p>
 </div>
 </div>`
  );
}
