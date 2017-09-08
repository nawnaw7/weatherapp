
$(window).on('load', function () {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
      
            var url = 'https://api.darksky.net/forecast/08fe70f4acbb5f48981535f29ee9a4d8/'+ lat + ',' + lon + '?callback=?';
      
            $.getJSON(url, getForecast);
            $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyDDFZmBU6s4WfuTU1abbslOKnRlNqVkQ98", function(googleLocation) {
                $("#city").text(googleLocation.results[3].formatted_address);
            });
        });
      
    } else {
        alert("Browser doesn't support geolocation!");
    }
});

// Real time and date
var now = new Date();
var minutes = now.getMinutes();

if (minutes < 10) {
    minutes = "0" + minutes;
};

$('#date').html(now.toDateString());
$('#time').html(now.getHours() + ":" + minutes);

// Temperature Conversion
var tempConvert = function(temp) {
    return Math.round((temp - 32) * 5/9);
}


// FORECAST
var getForecast = function(data) {
    console.log(data);
    
    // Click events on buttons (toggle data between C and F)
    $('#label-C').on('click', function () {
        $('#cur-wind').html(Math.round(data.currently.windSpeed * 1.6));
        $('#cur-deg').html(tempConvert(data.currently.temperature));
        $('.deg-toggle').html('C');
        $('.speed-toggle').html('kph');
        if ($('#label-F').hasClass('active')) {
            $('#label-F').removeClass('active');
            $('#label-C').addClass('active');
        }
        hourlyForecast();
        tomorrowForecast();
        thirdForecast();
        fourthForecast();
    }); 
    
    $('#label-F').on('click', function () {    
        $('#cur-wind').html(Math.round(data.currently.windSpeed));
        $('#cur-deg').html(Math.round(data.currently.temperature));
        $('.deg-toggle').html('F');
        $('.speed-toggle').html('mph');
        if ($('#label-C').hasClass('active')) {
            $('#label-C').removeClass('active');
            $('#label-F').addClass('active');
        }
        hourlyForecast();
        tomorrowForecast();
        thirdForecast();
        fourthForecast();
    });
   
   
    // Main today forecast
    $('#cur-summary').html(data.currently.summary);
    $('.full-width-image').css({'background': 'url(' + pictures(data.currently.icon) + ') no-repeat center center fixed', 'background-size': 'cover'});
    $('#cur-humid').html(Math.round(data.currently.humidity * 100));
    $('#today-icon').attr('class', iconClasses(data.currently.icon));
    $('#cur-deg').html(tempConvert(data.currently.temperature));
    
    
    // Hourly forecast
    var hourlyForecast = function() {
        var hourlyData = data.hourly.data;
        var hourlyArr = [];

        for (var i = 1; i < hourlyData.length; i += 4) {
            hourlyArr.push(hourlyData[i]);
        }

        for (i = 0; i < hourlyArr.length; i++) {
            $('#hourly-icon-' + i).addClass(iconClasses(hourlyArr[i].icon));

            var date = new Date(hourlyArr[i].time * 1000);
            $('#hourly-time-' + i).html(date.getHours() + ':00');

            if ($('#label-C').hasClass('active')) {
                $('#hourly-deg-' + i).html(tempConvert(hourlyArr[i].temperature));
            } else {
                $('#hourly-deg-' + i).html(Math.round(hourlyArr[i].temperature));
            }
        }
    }
    hourlyForecast();
    
    
    // Tomorrow forecast
    var tomorrowForecast = function() {
        $('#tomorrow-humid').html(Math.round(data.daily.data[1].humidity * 100));
        $('#tomorrow-icon').attr('class', iconClasses(data.daily.data[1].icon));
        $('#tomorrow-summary').html(data.daily.data[1].summary);
        $('#tomorrow-cloud').html(Math.round(data.daily.data[1].cloudCover * 100));
        $('#tomorrow-rain').html(Math.round(data.daily.data[1].precipProbability * 100));
        
        if ($('#label-C').hasClass('active')) {
            $('#tomorrow-wind').html(Math.round(data.daily.data[1].windSpeed * 1.6));
            $('#tomorrow-deg-max').html(tempConvert(data.daily.data[1].temperatureMax));
            $('#tomorrow-deg-min').html(tempConvert(data.daily.data[1].temperatureMin));
            $('#tomorrow-real-max').html(tempConvert(data.daily.data[1].apparentTemperatureMax));
            $('#tomorrow-real-min').html(tempConvert(data.daily.data[1].apparentTemperatureMin));
        } else {
            $('#tomorrow-wind').html(Math.round(data.daily.data[1].windSpeed));
            $('#tomorrow-deg-max').html(Math.round(data.daily.data[1].temperatureMax));
            $('#tomorrow-deg-min').html(Math.round(data.daily.data[1].temperatureMin));
            $('#tomorrow-real-max').html(Math.round(data.daily.data[1].apparentTemperatureMax));
            $('#tomorrow-real-min').html(Math.round(data.daily.data[1].apparentTemperatureMin));
        }
    }
    tomorrowForecast();
    
    
    // Third forecast
    var thirdForecast = function() {
        $('#third-humid').html(Math.round(data.daily.data[2].humidity * 100));
        $('#third-icon').attr('class', iconClasses(data.daily.data[2].icon));
        $('#third-summary').html(data.daily.data[2].summary);
        $('#third-cloud').html(Math.round(data.daily.data[2].cloudCover * 100));
        $('#third-rain').html(Math.round(data.daily.data[2].precipProbability * 100));
        
        if ($('#label-C').hasClass('active')) {
            $('#third-wind').html(Math.round(data.daily.data[2].windSpeed * 1.6));
            $('#third-deg-max').html(tempConvert(data.daily.data[2].temperatureMax));
            $('#third-deg-min').html(tempConvert(data.daily.data[2].temperatureMin));
            $('#third-real-max').html(tempConvert(data.daily.data[2].apparentTemperatureMax));
            $('#third-real-min').html(tempConvert(data.daily.data[2].apparentTemperatureMin));
        } else {
            $('#third-wind').html(Math.round(data.daily.data[2].windSpeed));
            $('#third-deg-max').html(Math.round(data.daily.data[2].temperatureMax));
            $('#third-deg-min').html(Math.round(data.daily.data[2].temperatureMin));
            $('#third-real-max').html(Math.round(data.daily.data[2].apparentTemperatureMax));
            $('#third-real-min').html(Math.round(data.daily.data[2].apparentTemperatureMin));
        }
    }
    thirdForecast();
    
    
    // Fourth forecast
    var fourthForecast = function() {
        $('#fourth-humid').html(Math.round(data.daily.data[3].humidity * 100));
        $('#fourth-icon').attr('class', iconClasses(data.daily.data[3].icon));
        $('#fourth-summary').html(data.daily.data[3].summary);
        $('#fourth-cloud').html(Math.round(data.daily.data[3].cloudCover * 100));
        $('#fourth-rain').html(Math.round(data.daily.data[3].precipProbability * 100));
        
        if ($('#label-C').hasClass('active')) {
            $('#fourth-wind').html(Math.round(data.daily.data[3].windSpeed * 1.6));
            $('#fourth-deg-max').html(tempConvert(data.daily.data[3].temperatureMax));
            $('#fourth-deg-min').html(tempConvert(data.daily.data[3].temperatureMin));
            $('#fourth-real-max').html(tempConvert(data.daily.data[3].apparentTemperatureMax));
            $('#fourth-real-min').html(tempConvert(data.daily.data[3].apparentTemperatureMin));
        } else {
            $('#fourth-wind').html(Math.round(data.daily.data[3].windSpeed));
            $('#fourth-deg-max').html(Math.round(data.daily.data[3].temperatureMax));
            $('#fourth-deg-min').html(Math.round(data.daily.data[3].temperatureMin));
            $('#fourth-real-max').html(Math.round(data.daily.data[3].apparentTemperatureMax));
            $('#fourth-real-min').html(Math.round(data.daily.data[3].apparentTemperatureMin));
        }
    }
    fourthForecast();
    
    // Change the day in tabs
    $('#tab3').html(unixTimeToDay(data.daily.data[2]));
    $('#tab4').html(unixTimeToDay(data.daily.data[3]));
}


// Ionicons classes
function iconClasses (apiData) {
    var iconClass;
        
    if (apiData === 'clear-day') {
        iconClass = 'ion-ios-sunny-outline';
    } else if (apiData === 'clear-night') {
        iconClass = 'ion-ios-moon-outline';
    } else if (apiData === 'partly-cloudy-day') {
        iconClass = 'ion-ios-partlysunny-outline';
    } else if (apiData === 'partly-cloudy-night') {
        iconClass = 'ion-ios-cloudy-night-outline';
    } else if (apiData === 'cloudy') {
        iconClass = 'ion-ios-cloudy-outline';
    } else if (apiData === 'rain') {
        iconClass = 'ion-ios-rainy-outline';
    } else if (apiData === 'sleet') {
        iconClass = 'ion-ios-rainy-outline';
    } else if (apiData === 'snow') {
        iconClass = 'ion-ios-snowy';
    } else if (apiData === 'wind') {
        iconClass = 'ion-leaf';
    } else if (apiData === 'fog') {
        iconClass = 'ion-ios-analytics';
    }
    
    return iconClass;
}


// Background picture links
function pictures (apiData) {
    var picLink;
        
    if (apiData === 'clear-day') {
        picLink = 'images/sunny.jpg';
    } else if (apiData === 'clear-night') {
        picLink = 'images/clear-night.jpg';
    } else if (apiData === 'partly-cloudy-day') {
        picLink = 'images/mostly-cloudy.jpg';
    } else if (apiData === 'partly-cloudy-night') {
        picLink = 'images/cloudy-night.jpg';
    } else if (apiData === 'cloudy') {
        picLink = 'images/cloudy.jpg';
    } else if (apiData === 'rain') {
        picLink = 'images/rain.jpg';
    } else if (apiData === 'sleet') {
        picLink = 'images/sleet.jpg';
    } else if (apiData === 'snow') {
        picLink = 'images/snow';
    } else if (apiData === 'wind') {
        picLink = 'images/wind.jpg';
    } else if (apiData === 'fog') {
        picLink = 'images/fog.jpg';
    }

    return picLink;
}

// Convert unix time
function unixTimeToDay(data) {
    var date = new Date(data.time * 1000);
    var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return dayName[date.getDay()];
};



































