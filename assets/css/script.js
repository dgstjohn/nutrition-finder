// Create a function called `myFunction()`
function myFunction() {
    // Create a variable called `searchTerm` that will use `document.querySelector()` to target the `id` of the input
    // Use `.value` to capture the value of the input and store it in the variable
    var searchTerm = document.querySelector('#searchTerm').value;
  console.log(searchTerm)
    // Make a `fetch` request concatenating the `searchTerm` to the query URL
    fetch('https://foodish-api.herokuapp.com/api/images/' + searchTerm)
      .then(function(response) {
        console.log("first.then.response",response)
        return response.json()
      })
      .then(function(results) {
        console.log("second.then.results",results)
        console.log("logging image URL", results.image)
        var img = document.createElement("img")
        img.setAttribute("src",results.image)
        document.querySelector("#food-container").append(img)
      })
    }