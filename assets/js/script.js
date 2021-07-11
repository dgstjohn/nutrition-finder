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



// makeQuery1 just encapsulates the actions for the button click
function makeQuery1() {
  // clear input box
  // variable to pass into the query string for the search
  var foodname = document.querySelector("#food-name").value.trim();
  if (foodname.value = "") {
    alert("You must type in the name of a food!");
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
    }
    );
  displaySearch.textContent = foodname;
  displaySearchEl.appendChild(displaySearch);

  var storeIt = {
    id: 'search'+storageCounter,
    name: foodname,
  }
  console.log(storeIt);

localStorage.setItem(JSON.stringify(storeIt.id),JSON.stringify(storeIt));
storageCounter++;
};


buttonEl.addEventListener("click", makeQuery1);
 
localStorage.getItem(JSON.parse("search1"));