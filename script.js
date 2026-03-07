//login function

const login = () => {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const login = document.getElementById("login");

  login.addEventListener("click", () => {
    const userValue = username.value.trim();
    const passValue = password.value.trim();
    //empty check
    if (userValue === "" || passValue === "") {
      alert("Username and Password required!");
      return;
    }
    //username check
    if (userValue !== "admin") {
      alert("Invalid Username");
      return;
    }
    //password check
    if (passValue !== "admin123") {
      alert("Invalid Password");
      return;
    }
    // redirect to main page
    window.location.href = "index.html";

    // empty input filed
    username.value = "";
    password.value = "";
  });
};
// call login funcation
login();
