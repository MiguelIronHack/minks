const postButton = document.getElementById("create-post");
const userId = document.getElementById("user").getAttribute("user-id");
const serverUrl = document.getElementById("site-url").content;
const threadID = document.getElementById("topic").getAttribute("thread-id");

console.log(serverUrl);

function postMessage() {
  const formTextArea = document.getElementById("post-message");
  const message = formTextArea.value;
  console.log("message: ", message, "user id ", userId);
  axios
    .post(serverUrl + "/api/post/create", {
      owner: userId,
      message: message,
      threadId: threadID
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

postButton.onclick = postMessage;
