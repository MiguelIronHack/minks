const createAdminBtn = document.getElementById("create-admin");
const serverUrl = document.getElementById("site-url").content;
createAdminBtn.onclick = createAdmin;

const toggleAdminForm = document.getElementById("admin-add");
const adminForm = document.getElementById("admin-form");

toggleAdminForm.onclick = showForm;
// const toggleInstrumentForm =
// const toggleNewsForm =
function showForm() {
  adminForm.classList.toggle("hide");
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
