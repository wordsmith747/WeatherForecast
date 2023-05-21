// Definition of the registerButtonHandler function which calls getWeather function triggered by the "Start" button.

function registerButtonHandler() {

    $("#start").on("click", function () {
        getWeather();

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

//Send GET request to a weather API.
//If the request is successful, log the parameters in the console.
function getWeather() {

    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?lat=48.8588897&lon=2.3200410217200766&units=metric&lang=pl&appid=13c1eb939d118a04132999b824983237",
        success: function (apiResponse) {
            console.log(apiResponse);

            //Retrieve weather parameters from the API response and display them next to their respective descriptive names.

            insertPopulatedRow("temperature", apiResponse.main.temp);
            insertPopulatedRow("wind gust", apiResponse.wind.gust);
            insertPopulatedRow("wind speed", apiResponse.wind.speed);
            insertPopulatedRow("perceived temperature", apiResponse.main.feels_like);
            insertPopulatedRow("country code", apiResponse.sys.country);
            // insertPopulatedRow("id", apiResponse.sys.id);
            // insertPopulatedRow("sunrise", apiResponse.sys.sunrise);
            //  insertPopulatedRow("icon", apiResponse.weather[0].icon);
            //Pass an additional parameter to indicate this is the last row to be inserted.

            let formattedSunriseTime = TimeConverter(apiResponse.sys.sunrise);
            insertPopulatedRow("sunrise", formattedSunriseTime);

           // insertPopulatedRow("sunset", apiResponse.sys.sunset, true);

            let formattedSunsetTime = TimeConverter(apiResponse.sys.sunset)
            insertPopulatedRow("sunset", formattedSunsetTime, true);

            retriveWeatherIcon(apiResponse.weather[0].icon);
            displayTemperature(apiResponse.main.temp);
            //Introducing the local variable that takes the value of the TimeConverter function after it has executed.


            //retriveWeatherIcon("10" + "d");
            //document.getElementById("weatherIcon").style.visibility = "visible";

        }

    });


}





