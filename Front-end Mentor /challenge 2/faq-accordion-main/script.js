"use strict";

const question = document.querySelectorAll(".questions");

// console.log(question);

question.forEach((btn) => {
  btn.addEventListener("click", function () {
    const description = this.nextElementSibling;
    const plus = this.querySelector(".icon-plus");
    const minus = this.querySelector(".icon-minus");

    if (description.style.maxHeight) {
      description.style.maxHeight = null;
      plus.style.display = "block";
      minus.style.display = "none";
    } else {
      description.style.maxHeight = description.scrollHeight + "px";
      plus.style.display = "none";
      minus.style.display = "block";
    }
  });
});
