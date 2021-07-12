# Nutrition Finder
This is a team project of Camil Grabowski, Heather Kirkness and Don St. John to create a web application that will return nutritional values for four key nutrition aspects of a searched food name.
- Upon entering a search term and clicking the search button, the app will poll the nutritionix database with an API call that returns associated foods. We select the first entry in the returned array, drill down to the nutrient values that are sent and select values to display for sodium, potassium, carbohydrate and total sugar content.
- Simultaneously, we poll the database at Foodish for associated images of the searched food, which we also have available from nutritionix, and display an image as appropriate.
- We use the Materialize CSS framework for HTML page layout and design, including taking advantage of its built-in grid system to ensure proper responsive display.
