"use strict";

//Create class User
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }

  //Function get news using API
  async getNews(category, pageSize, page) {
    const news = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=390211eb014b41a887862713c18c0036`
    );
    const data = await news.json();
    console.log(data);
    renderNews(data);
  }

  //Function search news using API
  async searchNews(keyword, pageSize, page) {
    const news = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${pageSize}&page=${page}&apiKey=390211eb014b41a887862713c18c0036`
    );
    const data = await news.json();
    console.log(data);
    renderNews(data);
  }
}
//Convert Object to Intance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );

  return user;
}
