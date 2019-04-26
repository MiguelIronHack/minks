const role = document.getElementById("user").getAttribute("user-role");
if (role === "admin") {
  const deleteButtons = document.querySelectorAll(".btn-delete");
  for (let button of deleteButtons) button.onclick = deleteNews;
}

function deleteNews(evt) {
  evt.target.parentElement.remove();
}
