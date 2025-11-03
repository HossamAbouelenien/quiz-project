var myForm = document.getElementById("form");
var myEmail = document.getElementById("email");
var myPassword = document.getElementById("password");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (checkInputs()) {
    window.location.href = "quiz.html";
  }
});

function checkInputs() {
  var isMyEmailValid = false;
  var isMyPasswordValid = false;

  if (myEmail.value.trim() !== window.localStorage.getItem("email")) {
    setError();
  } else {
    isMyEmailValid = true;
  }

  if (myPassword.value.trim() !== window.localStorage.getItem("password")) {
    setError();
  } else {
    isMyPasswordValid = true;
  }

  return isMyEmailValid && isMyPasswordValid;
}

function setError() {
  var error = document.getElementById("errorMSG");
  error.style.visibility = "visible";
}
