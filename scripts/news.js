"use strict";

//Get elements
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNumEl = document.getElementById("page-num");

//Variable
let totalPage;
let page = 1;
let getPagesize;

//Get user data from storage
const currentUser = getFromStorage("currentUser") || [];
const owner = currentUser.username;

//Check login
if (owner) {
  //Generate News
  const user = parseUser(currentUser);
  const pageSize = currentUser.pageSize || 20;
  getPagesize = pageSize;
  const category = currentUser.category || "general";
  user.getNews(category, pageSize, page);

  //Hide Previous Button
  if (page === 1) btnPrev.parentElement.classList.add("hidden");

  //Event click Next Button
  btnNext.addEventListener("click", () => {
    if (page < totalPage) {
      //Display Previous button
      btnPrev.parentElement.classList.remove("hidden");
      page += 1;
      //Load News on new page
      user.getNews(category, pageSize, page);
    }
  });

  //Event click Previou Button
  btnPrev.addEventListener("click", () => {
    if (page > 1) {
      btnNext.parentElement.classList.remove("hidden");
      if (page === 2) btnPrev.parentElement.classList.add("hidden");
      page -= 1;
      user.getNews(category, pageSize, page);
    }
  });
} else alert("Please log in");

//Function render News
const renderNews = function (data) {
  //Get property from getNews data
  const articlesArr = data.articles;
  const numOfArticles = articlesArr.length;
  totalPage = Math.ceil(data.totalResults / getPagesize);

  //Display current page/total page
  pageNumEl.textContent = `${page}/${totalPage}`;

  //Hide Next Button if no news can be returned on next page
  if (page >= totalPage) {
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
              <p class="card-text">${
                data.articles[index].description ||
                "Description Is Not Available"
              }</p>
              <a href="${
                data.articles[index].url
              }" target="_blank" rel="noopener noreferrer"
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
