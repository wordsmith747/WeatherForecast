# AJAX and JQuery pages consuming OpenWeather APIs

- This repository showcases OpenWeather API and displays the weather data in a chart.
- In order to run the functions you will an account with OpenWeather https://openweathermap.org/api and you need to use your personal API key in the web service URLs.
- The project consists of two parts: WeatherAjax and WeatherAjaxForecast.

## WeatherAjax.js
- The WeatherAjax.js retrives weather parameters such as the temperature and the wind speed in the given city and populates a table with those values to be displayed after clicking the start button.


![Weather_Table_C](https://user-images.githubusercontent.com/89709407/236700754-4753f7fa-b479-4a8b-b3e5-a760958c6e0f.png)

![Weather_Table_C](Sample images/Weather_Table_Cards.png)



## WeatherAjaxForecast.js

- The WeatherAjaxForecast retrives the temperature data collected every three hours in a given city. The temperature data is then assigned to the variables used by the Chart.js library in order to display them on a line chart. 


![Weather_Chart_C](https://user-images.githubusercontent.com/89709407/236700458-5de5355f-6bd8-46e3-b88f-b8b00ea2d903.png)

## Future features
- A dropdown list with the city names to retrive the weather parameters from.
- A seperate API call to retrieve the weather parameters based on input city.
