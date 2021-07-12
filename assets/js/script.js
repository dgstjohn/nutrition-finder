var buttonEl = document.querySelector("#btn");
var sodiumValueEl = document.querySelector("#sodium");
var potassiumValueEl = document.querySelector("#potassium");
var carbsValueEl = document.querySelector("#carbs");
var sugarsValueEl = document.querySelector("#sugars");
var displaySearch = document.createElement("h2");
var displaySearchEl = document.querySelector("#search-return");
var responseArray = [];
var localStorageArray = [];
var storageCounter = 1;
var savedSearchesEl = document.querySelector("#saved-searches");
var firstSavedSearchEl = document.getElementById("search1");
var secondSavedSearchEl = document.getElementById("search2");
var thirdSavedSearchEl = document.getElementById("search3");
var fourthSavedSearchEl = document.getElementById("search4");

// makeQuery1 encapsulates the actions for the button click and calls makeQuery2 for the Foodish API
function makeQuery1() {
  // variable to pass into the query string for the search
  var foodname = document.querySelector("#food-name").value.trim();
  // modal call if no value is placed into input box
  if (document.querySelector("#food-name").value === "") {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, options);
    });
  }

  // empty box/bad name if statement goes here, not farther down
  fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${foodname}&detailed=true&branded=false`,
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
      responseArray = data.common;
      console.log(responseArray);
      for (var index = 0; index < responseArray[0].full_nutrients.length; index++) {

        // go thru full nutrients to find index value for that 
        if (responseArray[0].full_nutrients[index].attr_id === 307) {
          var sodiumIndexPoint = responseArray[0].full_nutrients[index].value;
          sodiumValueEl.textContent = sodiumIndexPoint;
        }
        if (responseArray[0].full_nutrients[index].attr_id === 306) {
          var potassiumIndexPoint = responseArray[0].full_nutrients[index].value;
          potassiumValueEl.textContent = potassiumIndexPoint;
        }
        if (responseArray[0].full_nutrients[index].attr_id === 205) {
          var carbsIndexPoint = responseArray[0].full_nutrients[index].value;
          carbsValueEl.textContent = carbsIndexPoint;
        }
        if (responseArray[0].full_nutrients[index].attr_id === 269) {
          var sugarsIndexPoint = responseArray[0].full_nutrients[index].value;
          sugarsValueEl.textContent = sugarsIndexPoint;
        }
      }
      var picDisplay = document.querySelector(
        "#food-container"
      ).innerHTML = `<div class="row"><img src="${responseArray[0].photo.thumb}" style="width:100%"></div>`;
    }
    );
  displaySearch.textContent = foodname;
  displaySearchEl.appendChild(displaySearch);

  // get nutrients info from script and append to displaySearchEl

  var storeIt = {
    id: 'search'+storageCounter,
    name: foodname,
  }
  console.log(storeIt);

localStorage.setItem(JSON.stringify(storeIt.id),JSON.stringify(storeIt.name));
storageCounter++;
makeQuery2();

// localStorage.getItem(JSON.parse("search1"));
// var search1text = document.querySelector("#search1");


};

// fetch request for data from Foodish API

function makeQuery2() {
  // Create a variable called `searchTerm` that will use `document.querySelector()` to target the `id` of the input
  // Use `.value` to capture the value of the input and store it in the variable
  // add toLowerCase method because all Foodish API values are in lower case
  var searchTerm = document.querySelector("#food-name").value.toLowerCase();
  // console.log(searchTerm);
  // Make a `fetch` request concatenating the `searchTerm` to the query URL
  fetch("https://foodish-api.herokuapp.com/api/images/" + searchTerm)
    .then(function (response) {
      // console.log("first.then.response", response);
      return response.json();
    })
    .then(function (results) {
      // console.log("second.then.results", results);
      // console.log("logging image URL", results.image);
      var pictureContainer = document.querySelector("#food-container");
      if (pictureContainer.innerHTML === `<div class="row"><div class="col s3"><img src="https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png"</div></div>`&& results.image !== null) {
        pictureContainer.innerHTML = "";
        document.querySelector(
          "#food-container"
        ).innerHTML = `<div class="row"><img src="${results.image}" style="width:100%"></div>`;
      }
      else {
        document.querySelector(
          "#food-container"
        ).innerHTML = `<div class="row"><img src="../assets/images/notavailable.jpg" style="width:100%"></div>`;
      }
    });
};

buttonEl.addEventListener("click", makeQuery1);