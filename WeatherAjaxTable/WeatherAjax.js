function registerButtonHandler(){

    $("#start").on("click", function () {
    getWeather();
});
}

// $("#start").on("click", function () {
//     getWeather();
// });

let delayMilliseconds = 1000;

function insertPopulatedRow(weatherParameterName, weatherParameterValue, isLastItem = false) {
    $("#weatherTableBody").append($(`<tr style="display:none">
                <th scope="row" style="text-align:left">${weatherParameterName}</th>
                <td>${weatherParameterValue}</td>
            </tr> `));

    if (isLastItem) {
        $("#weatherTableBody").children().last().delay(delayMilliseconds).fadeIn(2000, function () {
            $("#start").prop('disabled', true);
        });
    }
    else {
        $("#weatherTableBody").children().last().delay(delayMilliseconds).fadeIn(2000);
    }
    delayMilliseconds += 1000;
}

function getWeather() {

    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?lat=48.8588897&lon=2.3200410217200766&units=metric&lang=pl&appid=13c1eb939d118a04132999b824983237",
        success: function (apiResponse) {
            console.log(apiResponse);
            $("#name").append($(`<p> ${apiResponse.name} </p>`));

            insertPopulatedRow("temperature", apiResponse.main.temp);

            insertPopulatedRow("wind gust", apiResponse.wind.gust);
            insertPopulatedRow("wind speed", apiResponse.wind.speed);
            insertPopulatedRow("perceived temperature", apiResponse.main.feels_like);

            insertPopulatedRow("country code", apiResponse.sys.country);
            insertPopulatedRow("id", apiResponse.sys.id);
            insertPopulatedRow("sunrise", apiResponse.sys.sunrise);

            //Pass an additional parameter to indicate this is the last row
            insertPopulatedRow("sunset", apiResponse.sys.sunset, true);
        }
    });
}
