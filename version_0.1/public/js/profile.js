const delBtn = document.querySelectorAll(".delete-post-btn");
const url = document.getElementById("site-url").content;

for (let i of delBtn) {
  i.onclick = deleteRow;
}

function deleteRow() {
  const rowId = this.parentElement.parentElement.children[0].getAttribute(
    "thread-id"
  );
  axios
    .delete(url + "/api/thread/" + rowId)
    .then(this.parentElement.parentElement.remove())
    .catch(err => console.log(err));
}
