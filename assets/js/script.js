// first, capture the value that is entered by the user when the button is clicked

var buttonEl = document.querySelector("#btn");
var foodNameEl = document.getElementById("food-name").value;

var foodNameEl2 = function getInputValue() {
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("food-name").value;
    
    // Displaying the value
    alert(inputVal);
}

buttonEl.addEventListener("click", foodNameEl2);



// var food = $("#search-form").on("click", "input", function () {
//     var text = $(this)
//         .text()
//         .trim();
//     console.log(text);
// });