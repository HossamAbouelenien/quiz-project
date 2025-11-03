// get elements
var form = document.getElementById("form");
var firstName = document.getElementById("firstname");
var lastName = document.getElementById("lastname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var passwordTwo = document.getElementById("re-password");

// is valid varibles

var isFirstNameValid = false;
var isLastNameValid = false;
var isEmailValid = false;
var isPasswordValid = false;
var isPasswordTwoValid = false;

// prevent and check inputs
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkInputs();
});

// check input for validtion  and using regex
function checkInputs() {
  var firstNameRegex = new RegExp("^[a-zA-Z0-9_-]{3,16}$");
  var lastNameRegex = new RegExp("^[a-zA-Z0-9_-]{3,16}$");
  var emailRegex = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
  );
  var passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
  );

  //   check firstname
  if (!firstNameRegex.test(firstName.value)) {
    setError(firstName, "Enter valid name "); //set error style
  } else {
    setSuccess(firstName); // set success style
    isFirstNameValid = true;
  }

  //   check lastname
  if (!lastNameRegex.test(lastName.value)) {
    setError(lastName, "Enter valid name ");
  } else {
    setSuccess(lastName);
    isLastNameValid = true;
  }

  //   check email
  if (!emailRegex.test(email.value)) {
    setError(email, "enter valid email (example@___.com)");
  } else {
    setSuccess(email);
    isEmailValid = true;
  }

  // check password

  if (!passwordRegex.test(password.value)) {
    setError(password, "enter valid password (Example#22)");
  } else {
    setSuccess(password);
    isPasswordValid = true;
  }

  //   check re-password
  if (passwordTwo.value !== password.value) {
    setError(passwordTwo, "passwords donot match");
  } else if (passwordTwo.value === "") {
    setError(passwordTwo, "password cannot be blank");
  } else {
    setSuccess(passwordTwo);
    isPasswordTwoValid = true;
  }

  // after validtion now set values in local storage

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordTwoValid
  ) {
    storeInLocalStorage(email.value, password.value); // function to set values
    window.location.href = "log-in.html";
  }
}

// function to change style for error
function setError(input, msg) {
  var divPar = input.parentElement;
  var span = divPar.querySelector("span");

  span.innerHTML = msg;
  span.style.visibility = "visible";

  divPar.classList.remove("success");
  divPar.classList.add("error");
}

// function to change style for success
function setSuccess(input) {
  var divPar2 = input.parentElement;
  divPar2.querySelector("span").style.visibility = "hidden";

  divPar2.classList.remove("error");
  divPar2.classList.add("success");
}

// store values in local storage

function storeInLocalStorage(emailValue, passwordValue) {
  window.localStorage.setItem("email", emailValue);
  window.localStorage.setItem("password", passwordValue);
}
