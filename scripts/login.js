"use strict";

//Load user data from local storage
const KEY = "USER_ARRAY";
const userArr = getFromStorage(KEY) || [];

//Select elements
const loginButton = document.getElementById("btn-submit");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
let login;

//event click Login button
loginButton.addEventListener("click", () => {
  login = true;
  inputValidate();
  if (login) window.location.href = "../index.html";
});

function inputValidate() {
  //Get inputed values
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  //validate input
  if (usernameValue === "")
    setErrorMessage(username, "*Username cannot be blank");
  else setSuccess(username);

  if (passwordValue === "")
    setErrorMessage(password, "*Password cannot be blank");
  else {
    setErrorMessage(password, "*Username or Password is not correct");
    userArr.forEach((obj) => {
      if (usernameValue === obj.username && passwordValue === obj.password) {
        setSuccess(password);
        login = true;
      }
    });
  }

  //Save current user to storage
  if (login) {
    userArr.forEach((obj, i) => {
      if (usernameValue === obj.username) {
        const currentUser = userArr[i];
        saveToStorage("currentUser", currentUser);
      }
    });
  }
}

//If inputed NG -> Show error & add error class
function setErrorMessage(inputField, message) {
  const formControl = inputField.parentElement;
  formControl.querySelector("small").innerText = message;
  formControl.classList = "col-sm-9 error";
  login = false;
}

//If inputed OK -> Add success class
function setSuccess(inputField) {
  inputField.parentElement.classList = "col-sm-9 success";
}
