"use strict";

const reviewNumber = document.querySelector(".reviewNumber");
const number = document.querySelectorAll(".number");
const btn = document.querySelector(".btn");
const formSection = document.querySelector(".form");
const thankYouSection = document.querySelector(".thankYou");
const selectingText = document.getElementById("selectingText");
let selection;
reviewNumber.addEventListener("click", function (e) {
  if (e.target.classList == "number") {
    number.forEach(function (element) {
      element.classList.remove("selected");
    });

    e.target.classList.add("selected");
    selection = e.target.textContent;
  }
});

btn.addEventListener("click", function () {
  if (selection !== undefined) {
    formSection.classList.add("display");
    thankYouSection.classList.remove("display");
    selectingText.textContent = selection;
  }
});
