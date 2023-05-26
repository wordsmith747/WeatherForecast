// Definition of the registerButtonHandler function which calls getWeather function triggered by the "start" button.
// Definition of JQuery function which calls getCityName function triggered by the "sumbit" button.

function registerButtonHandler() {

    // $("#start").on("click", function () {
    //     getWeather();

    // });

    $("#submit").on("click", function () {
        getCityName();

    });

}


let delayMilliseconds = 1000;

// Definition of the insertPopulatedRow function.
// It creates the table with each row containing the parameter name and the paramater value.
// The last parameter is a Boolean which checks whether the row is the last one.

function insertPopulatedRow(weatherParameterName, weatherParameterValue, isLastItem = false) {
    $("#weatherTableBody").append($(`<tr style="display:none">
    <th scope="row" style="text-align:left">${weatherParameterName}</th>
    <td>${weatherParameterValue}</td>
    </tr> `));

    //If statement checking whether the inserted row is the last item in the collection.
    if (isLastItem) {
        $("#weatherTableBody").children().last().delay(delayMilliseconds).fadeIn(2000, function () {
            //Jquery finds the button and disables it.
            $("#start").prop('disabled', true);
            document.getElementById("weatherIcon").style.visibility = "visible";

        });


    }
    else {
        $("#weatherTableBody").children().last().delay(delayMilliseconds).fadeIn(2000);
    }
    delayMilliseconds += 1000;
}

function retriveWeatherIcon(weatherIconCode) {
    let iconcode = weatherIconCode;

    let iconurl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";
    $('#weatherIcon').attr('src', iconurl);
}

function displayTemperature(locationTemperature) {
    let temperatureRounded = Math.round(locationTemperature);
    $("#temperature").append(`${temperatureRounded}°C`);
    // document.getElementById("temperature").style.visibility = "visible";
    // $("#weatherTableBody").children().last().delay(delayMilliseconds).fadeIn(2000);
    $("#temperature").delay(delayMilliseconds + 2000).fadeIn(2000);
}
// Definition of the TimeConverter function.
// The function converts the time expressed in seconds into a user friendly format.
//The function uses two approaches to convert the time.

function TimeConverter(unixTimeStamp) {
    let date = new Date(unixTimeStamp * 1000);
    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    //Logging in the time converted by means of concatination and extraction of the two last digits of the strings.
    console.log(formattedTime);

    //Logging in the time converted with the built-in function.
    console.log(date.toLocaleTimeString());
    return formattedTime;
}
// The function clears the table,
// hides the previous icon, 
// flushes the contents of the "temperature" pargraph,
// hides the paragraph.

function resetWeatherData() {
    $("#weatherTableBody").empty();
    delayMilliseconds = 0;
    document.getElementById("weatherIcon").style.visibility = "hidden";
    $("#temperature").empty();
    $("#temperature").hide();

}

// Definiton of the displayLocation function.
// The function accepts 5 arguments which will be embedded in a card.
function displayLocation(locationName, countryCode, state, latitude, longitude) {
    //JQuery function selects the element with the given id and appends a card to it.

    // Adding an onclick attribute with a functin call getWeather and passing two variables as arguments to display the specific parameters.
    $("#locationContainer").append($(`
<div class="col">
    <div class="card h-100">
        <div class="card-body">
        <h5 class="card-title"><strong>${locationName}</strong></h5>
        <p class="card-text">${state} ${countryCode}<br/></p>
            <a onclick="getWeather(${latitude},${longitude});" href="#" class="btn btn-primary">Select ${locationName}, ${countryCode}</a>
      </div>
    </div>
</div>
`))
        ;

    // $("#locationContainer").delay(5000).fadeIn(2000);
}

//Send GET request to a weather API.
//If the request is successful, log the parameters in the console.
function getWeather(latitude, longitude) {

    resetWeatherData();

    $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=de&appid=13c1eb939d118a04132999b824983237`,
        success: function (apiResponse) {
            console.log(apiResponse);

            //Retrieve weather parameters from the API response and display them next to their respective descriptive names.

            insertPopulatedRow("Temperature", apiResponse.main.temp);
            //insertPopulatedRow("wind gust", apiResponse.wind.gust);
            insertPopulatedRow("Perceived temperature", apiResponse.main.feels_like);
            insertPopulatedRow("Wind speed", apiResponse.wind.speed);

            insertPopulatedRow("Country", apiResponse.sys.country);
            insertPopulatedRow("Location", apiResponse.name);
            insertPopulatedRow("Latitude", apiResponse.coord.lat + "°");
            insertPopulatedRow("Longitude", apiResponse.coord.lon + "°")
            // insertPopulatedRow("id", apiResponse.sys.id);
            // insertPopulatedRow("sunrise", apiResponse.sys.sunrise);
            //  insertPopulatedRow("icon", apiResponse.weather[0].icon);
            //Pass an additional parameter to indicate this is the last row to be inserted.

            let formattedSunriseTime = TimeConverter(apiResponse.sys.sunrise);
            insertPopulatedRow("Sunrise", formattedSunriseTime);

            // insertPopulatedRow("sunset", apiResponse.sys.sunset, true);

            let formattedSunsetTime = TimeConverter(apiResponse.sys.sunset)
            insertPopulatedRow("Sunset", formattedSunsetTime, true);

            retriveWeatherIcon(apiResponse.weather[0].icon);
            displayTemperature(apiResponse.main.temp);
            //Introducing the local variable that takes the value of the TimeConverter function after it has executed.
            //retriveWeatherIcon("10" + "d");
            //document.getElementById("weatherIcon").style.visibility = "visible";
        }

    });

}


function getCityName() {
    // userInputText retrives the value typed in by the user.
    let userInputText = $("#locationInput").val();
    console.log(userInputText);


    // Ajax function that calls an API with the city name provided by the user.
    $.ajax({
        type: "GET",
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${userInputText}&limit=5&appid=13c1eb939d118a04132999b824983237`,
        success: function (apiResponseCityLookUp) {


            $("#locationContainer").hide();

            //Jquery function that flushes the error message.
            $("#noLocationsFoundError").empty();

            if (apiResponseCityLookUp.length === 0) {


                $("#noLocationsFoundError").append($(`
                <div class="col">
                    <div class="card h-100 text-bg-warning">
                        <div class="card-body">
                        <h5 class="card-title">The name doesn't exist in our database</h5>
                        <p class="card-text">"No locations found. Please have another go!"</p>
                      </div>
                    </div>
                </div>
                `));

            }

            // At least one city is returned.
            else {
                // $("#noLocationsFoundError").prepend();
                console.log(apiResponseCityLookUp.length);

                //  Selects the element to switch its visibility off.

                //Jquery function that clears the data of the previous API call.
                $("#locationContainer").empty();
                //Jquery that applies some animation to the API response.
                $("#locationContainer").delay(100).fadeIn(2000);

                //For loop displaying the paramaters based on the city names array.
                for (let index = 0; index < apiResponseCityLookUp.length; index++) {

                    displayLocation(apiResponseCityLookUp[index].name,
                        apiResponseCityLookUp[index].country,
                        apiResponseCityLookUp[index].state,
                        apiResponseCityLookUp[index].lat,
                        apiResponseCityLookUp[index].lon);

                }

            }
        }
    });

}

