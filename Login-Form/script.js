function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username.length < 4) {
    alert("Username must be at least 4 characters long");
    return false;
  } else if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return false;
  } else {
    alert("Login successfully");
    return true;
  }
}
