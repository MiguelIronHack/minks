const createAdminBtn = document.getElementById("create-admin");
const serverUrl = document.getElementById("site-url").content;
const toggleAdminForm = document.getElementById("admin-add");
const adminForm = document.getElementById("admin-form");
const toggleInstrumentForm = document.getElementById("instrument-add");
const instrumentForm = document.getElementById("instrument-form");
const toggleNewsForm = document.getElementById("news-add");
const newsForm = document.getElementById("news-form");
const adminList = document.getElementById("admin-list");
//LISTENERS
toggleAdminForm.onclick = showAdminForm;
toggleInstrumentForm.onclick = showInstrumentForm;
toggleNewsForm.onclick = showNewsForm;
createAdminBtn.onclick = createAdmin;

const createNewsBtn = document.getElementById("create-news");

createNewsBtn.onclick = postNews;

function postNews(evt) {
  evt.preventDefault();
  const newsTitle = document.getElementById("news-title").value;
  const newsMessage = document.getElementById("news-message").value;

  axios
    .post(serverUrl + "/api/news/create", { newsTitle, newsMessage })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

function showNewsForm() {
  newsForm.classList.toggle("hide");
}
function showAdminForm() {
  adminForm.classList.toggle("hide");
}
function showInstrumentForm() {
  instrumentForm.classList.toggle("hide");
}

function createAdmin() {
  const password = document.getElementById("password-input").value;
  const email = document.getElementById("email-input").value;
  const userName = document.getElementById("username-input").value;
  console.log(password, email, userName);
  if (!password || !email || !userName) {
    return;
  }
  axios
    .post(serverUrl + "/api/user/create", { password, userName, email })
    .then(res => appendAdminHTML(adminList, userName, email, "admin"))
    .catch(err => console.log(err));
}

function appendAdminHTML(node, username, email, role) {
  node.insertAdjacentHTML(
    "beforeend",
    `      <tr>
  <td>${username}</td>
  <td>${email}</td>
  <td>${role}</td>
  <td id="delete-post-btn">
  <span class="delete-post-btn">
  <i class="fas fa-times"></i>
  </span>
  </td>
</tr>`
  );
}
