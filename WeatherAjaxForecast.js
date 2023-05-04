$("#start").on("click", function () {
    getWeather();
});

function getWeather() {

    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?lat=48.8588897&lon=2.3200410217200766&units=metric&appid=13c1eb939d118a04132999b824983237",
        success: function (apiResponse) {
            console.log(apiResponse);
            $("#name").append($(`<p> ${apiResponse} </p>`));

            let arrayOfDates = [];
            let temperatures = [];
            let datesAndTemperatures = [];

            for (i = 0; i < apiResponse.list.length; i++) {
                arrayOfDates.push(apiResponse.list[i].dt_txt);
                temperatures.push(apiResponse.list[i].main.temp);
                let dateAndTemperature = {
                    t: apiResponse.list[i].dt_txt,
                    y: apiResponse.list[i].main.temp
                };

                datesAndTemperatures.push(dateAndTemperature);
            }

            console.log(arrayOfDates);
            console.log(temperatures);
            console.log(datesAndTemperatures);

            var ctx = document.getElementById("examChart").getContext("2d");

            var myChart = new Chart(ctx, {
                type: 'line',
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                        }]
                    }
                },
                data: {
                    labels: arrayOfDates,
                    datasets: [{
                        label: 'Paris',
                        data: datesAndTemperatures,
                        borderWidth: 1
                    }]
                }
            });
        }
    });
}

