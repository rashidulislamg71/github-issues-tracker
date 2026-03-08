//login function
const loginSystem = () => {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const login = document.getElementById("login");

  login.addEventListener("click", () => {
    const userValue = username.value.trim();
    const passValue = password.value.trim();

    if (!userValue || !passValue) {
      alert("Username and Password required!");
      return;
    }

    if (userValue === "admin" && passValue === "admin123") {
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid username or password");
    }

    username.userValue = " ";
    password.userValue = " ";
  });
};

document.addEventListener("DOMContentLoaded", loginSystem);
