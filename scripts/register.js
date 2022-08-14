"use strict";

//Load user data from local storage
const KEY = "USER_ARRAY";
const userArr = getFromStorage(KEY) || [];

//Select input elements
const registerButton = document.getElementById("btn-submit");
const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-password-confirm");
const input = Array.from(document.querySelectorAll("input"));
let register;

//event click Register button
registerButton.addEventListener("click", () => {
  register = true;
  inputValidate();
  if (register) {
    alert("Registered successfully! Go to login page.");
    window.location.href = "../pages/login.html";
  }
});

function inputValidate() {
  //Get inputed values
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  //validate input
  if (firstNameValue === "") {
    setErrorMessage(firstName, "*Required");
  } else {
    setSuccess(firstName);
  }

  if (lastNameValue === "") {
    setErrorMessage(lastName, "*Required");
  } else {
    setSuccess(lastName);
  }

  if (usernameValue === "") {
    setErrorMessage(username, "*Username cannot be blank");
  } else {
    setSuccess(username);
    userArr.forEach((obj) => {
      if (usernameValue === obj.username)
        setErrorMessage(username, "*This Username is not available");
    });
  }

  if (passwordValue.length < 9) {
    setErrorMessage(password, "*Password must be more than 8 characters");
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === "") {
    setErrorMessage(confirmPassword, "*Please input password again");
  } else if (confirmPasswordValue !== passwordValue) {
    setErrorMessage(confirmPassword, "Password does not match");
  } else {
    setSuccess(confirmPassword);
  }

  //create instance and save to storage
  if (register) {
    const user = new User(
      firstNameValue,
      lastNameValue,
      usernameValue,
      passwordValue
    );
    console.log(user);
    userArr.push(user);
    saveToStorage(KEY, userArr);
    resetInput();
  }
}

//If inputed NG -> Show error & add error class
function setErrorMessage(inputField, message) {
  const formControl = inputField.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.classList.add("error");
  formControl.classList.remove("success");
  register = false;
}

//If inputed OK -> Add success class
function setSuccess(inputField) {
  const formControl = inputField.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
}

//Reset input
function resetInput() {
  input.forEach((ele) => {
    ele.value = "";
  });
}
