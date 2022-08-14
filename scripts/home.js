"use strict";

//Get element
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const logoutButton = document.getElementById("btn-logout");
const currentUser = getFromStorage("currentUser") || [];
const owner = currentUser.username;

//Check if not yet login
if (!owner) {
  //Display Login model only
  mainContent.innerHTML = "";
} else {
  //Display welcome message & logout button only
  loginModal.innerHTML = "";
  const welcomeMessage = mainContent.querySelector("p");
  welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
}

//Event click logout button
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../pages/login.html";
});
