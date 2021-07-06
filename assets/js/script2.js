// The user sees a search form, inviting them to enter a search term into a form 
// to find a food and get information on its nutrients.
// They type it in and click the "Find Your Food" submit button;
// this triggers the first formHandlerSubmit function.
// The formHandlerSubmit must run before we can have a value to insert into the API fetch() request. 
// It is there to get that value, period.


var buttonEl = document.querySelector("#btn");

var food = function getValue() {
  var inputEl = document.getElementById("food-name").value;
  // inputEl.trim() = inputEl; // rewrite this function in JQuery
  return inputEl;
}

buttonEl.addEventListener("click", food);

function makeQuery1() {
  var foodname = document.querySelector("input[name='food-name'].value");
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
      console.log(data);
    });
};

makeQuery1();
console.log(nameQuery1);


// console.dir(document);

// 4. We save that value into a variable, insert the variable into the fetch() request to the nutritionix API and make that request. (The request is async. Do we need to pause the script somehow to wait for those results?)
// 5. nutritionix (theoretically) sends back a JSON object with the data from that request.
// 6. We parse the JSON into an array, loop through the array for the first (number of) choices, insert those choices into divs set up to catch those and display those choices to narrow the search. These are also clickable, so a second form handler is needed.
// 7. The user clicks on one of those; the event listener for the second form handler calls a function for the button clicked to insert that term into a second API fetch() to nutritionix.
// 8. nutritionix (theoretically) returns the data from the second fetch() as a JSON object, which we then parse to turn into an array; we then display chosen results into a div written to catch the nutrient values.
// 9. While the fetch() for the first nutritionix is running, we also run a fetch() to Foodish on the same term. Then we take the value through an if statement:
// --if there is an image value, we insert that into a div set up to display the image. If that is null:
// --else if to check the nutritionix result for a photo. If there is an image value for the hi-res, we display that in the div. If that is also null:
// --else to display a placeholder image basically saying "Sorry, no pictures of (this food are available today."
