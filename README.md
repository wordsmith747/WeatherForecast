# AJAX and JQuery pages consuming OpenWeather APIs

- This repository showcases OpenWeather API and displays the weather data in a chart.
- In order to run the functions you will an account with OpenWeather https://openweathermap.org/api and you need to use your personal API key in the web service URLs.
- The project consists of two parts: WeatherAjax and WeatherAjaxForecast.

## WeatherAjax.js
- The WeatherAjax.js retrives weather parameters such as the temperature and the wind speed in the given city and populates a table with those values to be displayed
after clicking the start button.

## WeatherAjaxForecast.js

- The WeatherAjaxForecast retrives the temperature data collected every three hours in a given city. The temperature data is then assigned to the variables used by the Chart.js library in order to display them on a line chart. 
