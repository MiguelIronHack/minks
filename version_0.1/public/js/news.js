const role = document.getElementById("user").getAttribute("user-role");
const serverUrl = document.getElementById("site-url").content;

if (role === "admin") {
  const deleteButtons = document.querySelectorAll(".btn-delete");
  for (let button of deleteButtons) button.onclick = deleteNews;
  const editButtons = document.querySelectorAll(".btn-edit");
  for (let button of editButtons) button.onclick = editNews;
}
function deleteNews(evt) {
  const newsId = evt.target.parentElement.getAttribute("news-id");
  evt.target.parentElement.remove();
  axios
    .delete(serverUrl + "/api/news/" + newsId)
    .then(res => console.log("Success: ", res))
    .catch(err => console.log("Error ", err));
}

function editNews(evt) {
  evt.target.parentElement
    .querySelectorAll(".editable-message")[0]
    .setAttribute("contenteditable", "true");
  evt.target.parentElement.querySelectorAll(".editable-message")[0].focus();
  evt.target.parentElement.querySelectorAll(
    ".editable-message"
  )[0].onblur = editContent;
}

function editContent(evt) {
  const title = evt.target.parentElement.parentElement
    .querySelector(".card-title")
    .textContent.split(" ")[0];
  const message = evt.target.parentElement.parentElement.querySelector(
    ".editable-message"
  ).textContent;
  const newsId = evt.target.parentElement.parentElement.getAttribute("news-id");

  axios
    .patch(serverUrl + "/api/news/" + newsId, { message, title })
    .then(res => {
      evt.target.parentElement.parentElement.querySelector(
        ".editable-message"
      ).textContent = message;
      evt.target.parentElement.parentElement.querySelector(
        ".card-title"
      ).textContent = title;
    })
    .catch(err => console.log(err));
}
