function weatherBalloon(lat, lon) {
  var key = "38c5498d4dadceb8d2340968d741bc1f";
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}` +
      "&units=metric&appid=" +
      key
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      drawWeather(data);
    })
    .catch(function () {
      alert("ERROR! City not found!");
    });
}

window.onload = function () {
  weatherBalloon(50, -125);
};

document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = currentDate.getMonth();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const formattedTime = `${monthNames[monthIndex]} ${day}, ${year}, ${hour}:${minute}`;
  console.log(formattedTime);
  document.getElementById("time").innerHTML = formattedTime;
});

function drawWeather(data) {
  // get the description
  document.getElementById("description").innerHTML =
    data.current.weather[0].description;
  // temperature
  document.getElementById("temp").innerHTML = `${data.current.temp} °C`;
  // icon
  document.getElementById(
    "icon"
  ).src = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;

  // location
  document.getElementById("location").innerHTML = `${
    data.timezone.split("/")[1]
  }, ${data.timezone.split("/")[0]}`;
  // chance of rain

  var chanceOfRain = Math.round(data.daily[0].pop * 100) + "%";
  document.querySelector(
    ".rain"
  ).innerHTML = `Chance of rain: <span class="bold">${chanceOfRain}</span>`;
}
