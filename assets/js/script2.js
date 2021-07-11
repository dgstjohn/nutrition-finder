var buttonEl = document.querySelector("#btn");


// fetch request for data from Foodish API
function makeQuery2() {
  // Create a variable called `searchTerm` that will use `document.querySelector()` to target the `id` of the input
  // Use `.value` to capture the value of the input and store it in the variable
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
      if (results.image !== null) {
        document.querySelector(
          "#food-container"
        ).innerHTML = `<div class="row"><div class="col s3"><img src="${results.image}" style="width:100%"></div></div>`;
      }
      else {
        document.querySelector(
          "#food-container"
        ).innerHTML = `<div class="row"><div class="col s3"><img src="https://dgstjohn.github.io/nutrition-finder/assets/images/notavailable.jpg" style="width:100%"></div></div>`;
      }
    });
};

buttonEl.addEventListener("click", makeQuery2);