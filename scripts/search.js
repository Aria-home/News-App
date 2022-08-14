"use strict";

//Get element
const searchBtn = document.getElementById("btn-submit");
const inputQueryEl = document.getElementById("input-query");
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNumEl = document.getElementById("page-num");

//Get user data from storage
const currentUser = getFromStorage("currentUser") || [];
const owner = currentUser.username;
const user = parseUser(currentUser);
const pageSize = currentUser.pageSize || 20;
let isSearch = false;
let page = 1;

//Get keyword from input value
let keyword = inputQueryEl.value;

//Even click search Button
searchBtn.addEventListener("click", () => {
  //Check login
  if (owner) {
    //Check input
    keyword = inputQueryEl.value;
    if (keyword !== "") {
      isSearch = true;
      //Reset display of Next and Previous Buttons and page number
      btnPrev.parentElement.classList.add("hidden");
      btnNext.parentElement.classList.remove("hidden");
      page = 1;
      //Render News
      user.searchNews(keyword, pageSize, page);
    } else alert("Please input keyword");
  } else alert("Please log in");
});

//Event click Next Button
btnNext.addEventListener("click", () => {
  if (isSearch) {
    //Display Previous button
    btnPrev.parentElement.classList.remove("hidden");
    page += 1;
    //Load News on new page
    user.searchNews(keyword, pageSize, page);
  }
});

//Event click Previou Button
btnPrev.addEventListener("click", () => {
  if (isSearch && page > 1) {
    btnNext.parentElement.classList.remove("hidden");
    if (page === 2) btnPrev.parentElement.classList.add("hidden");
    page -= 1;
    //Load News on new page
    console.log(keyword);
    user.searchNews(keyword, pageSize, page);
  }
});

//Function render News
const renderNews = function (data) {
  //Get property from getNews data
  const articlesArr = data.articles;
  const numOfArticles = articlesArr.length;
  const totalPage = Math.ceil(data.totalResults / pageSize);

  //Display current page/total page
  pageNumEl.textContent = `${page}/${totalPage}`;

  //Hide Next Button if no news can be returned on next page
  if (page === totalPage) {
    //Hide next button
    btnNext.parentElement.classList.add("hidden");
  }

  //Render News if articlesArr is not empty
  if (numOfArticles > 0) {
    //Delete previous content
    newsContainer.innerHTML = "";
    //Render News
    articlesArr.forEach((__, index) => {
      const html = `
      <div class="card flex-row flex-wrap">
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                src="${data.articles[index].urlToImage}"
                class="card-img"
                alt="${data.articles[index].title}"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${data.articles[index].title}</h5>
                <p class="card-text">${data.articles[index].description}</p>
                <a href="${data.articles[index].url}" target="_blank" rel="noopener noreferrer"
                  class="btn btn-primary">View</a>
              </div>
            </div>
          </div>
        </div>
      </div> `;
      newsContainer.insertAdjacentHTML("beforeend", html);
    });
  }
};
