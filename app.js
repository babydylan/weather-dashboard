


$(function () {

    var apiKey = "241a1d026b3b76063a0e137b8c9c8362"
    var today = new Date();
    var date = (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();

    function fetchWeatherForCity(city) {
        var queryUrl =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=imperial&appid=" +
            apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (data) {
            console.log(data);

            $(".city-name").text(data.name + " " + "(" + date + ")");
            $(".temp").text("Temperature: " + Math.round(data.main.temp) + "°F");
            $(".wind-speed").text("Wind Speed: " + data.wind.speed + " mph");
            $(".humidity").text("Humidity: " + data.main.humidity + " %");


            var iconUrl =
                "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

            var iconImg = $("<img>").attr({
                src: iconUrl,
                alt: data.weather[0].description,
            });

            $(".weather-icon").append(iconImg);
        });
    };

    // function fetchFiveDay(city) {
    //     var fiveDayUrl =
    //         "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

    //     // var iconUrl =
    //     //     "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

    //     // var iconImg = $("<img>").attr({
    //     //     src: iconUrl,
    //     //     alt: data.weather[0].description,
    //     // });
        
    //     $.ajax({
    //          url: fiveDayUrl,
    //         method: "GET",
    //     }).then(function (response) {
    //         console.log(response);
        
    //     for (var i = 3; i < response.list.length; i + 8) {
    //       var pre5Row = $(".preview");
    //       pre5Row.attr("style", "display: none;")
    //       var row5 = $(".forecast-5");
    //       var divCol = $("<div>").addClass("col-lg-2 smcard");
    //       divCol.attr("style", "width: 9rem;");
    //       row5.append(divCol);
    //       var card = $("<div>").addClass("card");
    //       card.attr("style", "width: 18rem;");
    //       divCol.append(card);
    //       var  cardBod = $("<div>").addClass("card-body").appendTo(card);
    //     //var weatherIcn =$("<div>").addClass("sm-weather-icon").appendTo(cardBod);
    //     //var smDate =$("<h5>").addClass("card-title sm-date").appendTo(cardBod);
    //       var  smTemp =$("<p>").addClass("card-text sm-temp").appendTo(cardBod);
    //       var  smHumid =$("<p>").addClass("card-text sm-humidity").appendTo(cardBod);
    //       smHumid.text(response.list.length);
    //       smTemp.text("Temp: " + response.list[i].main.temp + "°F");
    //       smHumid.text("Humidity: " + response.list[i].humidity + "%");
            
    //     };


    //     });
    // }

    $(document).on("click", ".city", function () {

        var city = $(this).attr("data-city");

        fetchWeatherForCity(city);
        fetchFiveDay(city);
    });


    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        var city = $("#search-input").val().trim();

        if (city === "") {
            return;
        };

        var cityList = $(".city-list");
        var newBtn = $("<button>");
        newBtn.attr("type", "button");
        newBtn.addClass("list-group-item list-group-item-action");
        newBtn.text(city);
        cityList.append(newBtn);
        fetchWeatherForCity(city);
        fetchFiveDay(city);
    });

});