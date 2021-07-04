var userFormEl = document.querySelector("#user-form");
var itemEl = document.querySelector("#item");
var getItem = function () {
    fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${itemEl}`,
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
            console.log(response);
        })
        .then(function (data) {
            console.log(data);
        });
}
var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);
};


userFormEl.addEventListener("submit", formSubmitHandler);