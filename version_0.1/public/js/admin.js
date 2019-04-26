const createAdminBtn = document.getElementById("create-admin");
const serverUrl = document.getElementById("site-url").content;
createAdminBtn.onclick = createAdmin;

const toggleAdminForm = document.getElementById("admin-add");
const adminForm = document.getElementById("admin-form");
const toggleInstrumentForm = document.getElementById("instrument-add");
const instrumentForm = document.getElementById("instrument-form");
const toggleNewsForm = document.getElementById("news-add");
const newsForm = document.getElementById("news-form");
toggleAdminForm.onclick = showAdminForm;
toggleInstrumentForm.onclick = showInstrumentForm;
toggleNewsForm = showNewsForm;

function showNEWSForm() {
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
    console.log("me");
    return;
  }
  axios
    .post(serverUrl + "/api/user/create", { password, userName, email })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
