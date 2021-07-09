// variables for HTML placement
var buttonEl = document.querySelector("#btn");
var section = document.querySelector(".searchDiv");
section.textContent = "test";
var nutrientsContainer = document.querySelector("#nutrients");
// variables for nutrient info aimed at spans
var sodiumValueEl = document.querySelector("#sodium");
var potassiumValueEl = document.querySelector("#potassium");
var carbsValueEl = document.querySelector("#carbs");
var sugarsValueEl = document.querySelector("#sugars");
// loop through first index of returned array to place nutrient info based on index value
var displayData = function (common, foodname) {
  console.log(common);
  console.log(foodname);
  for (i = 0; common.length < 1; index++) {
    var sodiumValue = common[0].full_nutrients[17].value;
    var potassiumValue = common[0].full_nutrients[16].value;
    var carbsValue = common[0].full_nutrients[2].value;
    var sugarsValue = common[0].full_nutrients[10].value;
    sodiumValueEl.textContent = sodiumValue;
    potassiumValueEl.textContent = potassiumValue;
    carbsValueEl.textContent = carbsValue;
    sugarsValueEl.textContent = sugarsValue;
    console.log(sodiumValue, potassiumValue);
  }
};
// fetch request for data
function makeQuery1() {
  section.textContent = "";
  // set value of search term
  var foodname = document.querySelector("#food-name").value.trim();
  // clear any prior instances of h2 from search term return
  var displaySearch = document.createElement("h2");
  displaySearch.textContent = "";
  // API call
  fetch(
    `https://trackapi.nutritionix.com/v2/search/instant?query=${foodname}&detailed=true&branded=false`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-app-id": "28ed598f",
        "x-app-key": "0ac605ceefb60fee2ab1555151d8058f",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayData(data, foodname);
      if (foodname.value === "") {
        alert("You must type in the name of a food!");
        foodname.value = "";
      }
      // display search term as header
      displaySearch.textContent = foodname;
      section.appendChild(displaySearch);
      // console.log(data);
    });
}
// Create a function called `myFunction()`
function makeQuery2() {
  // Create a variable called `searchTerm` that will use `document.querySelector()` to target the `id` of the input
  // Use `.value` to capture the value of the input and store it in the variable
  var searchTerm = document.querySelector("#food-name").value;
  console.log(searchTerm);
  // Make a `fetch` request concatenating the `searchTerm` to the query URL
  fetch("https://foodish-api.herokuapp.com/api/images/" + searchTerm)
    .then(function (response) {
      console.log("first.then.response", response);
      return response.json();
    })
    .then(function (results) {
      console.log("second.then.results", results);
      console.log("logging image URL", results.image);
      if (results.image !== "") {
        document.querySelector(
          "#food-container"
        ).innerHTML = `<div class="row"><div class="col s3"><img src="${results.image}" style="width:100%"></div></div>`;
      } else {
        document.querySelector(
          "#food-container"
        ).innerHTML = `<div class="row"><div class="col s3"><img src="./assets/images/notavailable.jpg" style="width:100%"></div></div>`;
      }
    });
  // Clear the search bar after the food is searched
  document.getElementById("food-name").value = "";
}
buttonEl.addEventListener("click", makeQuery1);
buttonEl.addEventListener("click", makeQuery2);