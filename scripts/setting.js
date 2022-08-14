"use strict";

//Get element
const pageSizeEl = document.getElementById("input-page-size");
const categoryEl = document.getElementById("input-category");
const submitBtn = document.getElementById("btn-submit");

//Get user data
const currentUser = getFromStorage("currentUser") || [];
const owner = currentUser.username;
const user = parseUser(currentUser);

//Display current setting
pageSizeEl.value = currentUser.pageSize || "";
let getCategory = currentUser.category || "general";
const catergoryFirstLetter = getCategory[0].toUpperCase();
const categoryRemainLetters = getCategory.slice(1);
const category = catergoryFirstLetter.concat(categoryRemainLetters);
categoryEl.value = category;

//Event click Submit button
submitBtn.addEventListener("click", () => {
  //save setting if user loged in
  if (owner) {
    //Get value
    const pageSize = pageSizeEl.value;
    const category = categoryEl.value.toLowerCase();
    //validate
    if (pageSize !== "") {
      user.pageSize = pageSize;
      user.category = category;
      console.log(user);
      saveToStorage("currentUser", user);
    } else alert("Please set number of News per page");
  } else alert("Please log in");
});
