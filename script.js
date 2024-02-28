"use strict";

let existingData;
const cards = document.querySelector(".cards");
const btnAddNew = document.querySelector(".btnAddNew");
const popup = document.querySelector(".popup");
const btnClose = document.getElementById("btnClose");
const submit = document.getElementById("submit");

const progressBar = document.querySelector(".progressBar");
const progressNumber = document.getElementById("progressNumber");
const totalChallenges = document.getElementById("totalChallenges");
const htmlContent = function (content) {
  return `<a href="${content.link}" target=”_blank”>
  <div class="cardContainer">
          <div class="cardImg" style="background-image: url('${
            content.img
          }')"></div>
          <div class="cardDetails">
            <div class="cardTitleSection">
              <div class="cardTitle">${content.nameC}</span></div>
              <div id="priceStatus">${
                content.cost === "free" ? "Free" : "Premium"
              }</div>
            </div>
            <div class="cardDescription">
              ${content.description}
            </div>
            <div class="languages">
              ${content.html ? '<div id="html">HTML</div>' : ""}
              ${content.css ? '<div id="css">CSS</div>' : ""}
              ${
                content.javascript
                  ? '<div id="javascript">Javascript</div>'
                  : ""
              }
            </div>
          </div>
        </div></a>`;
};

const fetchDataAndUpdate = async function () {
  try {
    const response = await fetch("challenges.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    existingData = data;

    // updating progressNumber
    progressNumber.textContent = data.length;

    // Update prpgress bar CSS properties in :root
    document.documentElement.style.setProperty(
      "--progressBarWidth",
      `${Math.floor(
        (100 / Number(totalChallenges.textContent)) * data.length
      )}%`
    );

    data.forEach((element) => {
      cards.insertAdjacentHTML("beforeend", htmlContent(element));
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Open project
cards.addEventListener("click", function (e) {
  console.log(e.target);
});

fetchDataAndUpdate();

// Add New Card
/*
// form elements
const challengeName = document.getElementById("challengeName");
const imgPath = document.getElementById("imgPath");
const cost = document.getElementById("cost");
const htmlBox = document.querySelector("form #html");
const cssBox = document.querySelector("form #css");
const javascriptBox = document.querySelector("form #javascript");
const description = document.getElementById("description");

btnAddNew.addEventListener("click", function () {
  popup.classList.remove("hide");
});

btnClose.addEventListener("click", function () {
  popup.classList.add("hide");
});

const submitData = async function (e) {
  e.preventDefault();

  let newObject = {
    challengeName: challengeName.value,
    img: imgPath.value,
    cost: cost.value,
    description: description.value,
    html: htmlBox.checked,
    css: cssBox.checked,
    javascript: javascriptBox.checked,
  };

  existingData.push(newObject);

  try {
    // Save data to local storage
    localStorage.setItem("challengesData", JSON.stringify(existingData));

    console.log("Data appended successfully!");
  } catch (error) {
    console.error("There was a problem with saving data:", error);
  }

  popup.classList.add("hide");
};

submit.addEventListener("click", submitData);

// Retrieve and render data from local storage on page load
existingData = JSON.parse(localStorage.getItem("challengesData")) || [];
*/
