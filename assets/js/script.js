// logic.converting units
const selectUnits = document.querySelector("#temp-units");
const kelvinRadio = document.querySelector("#kelvin");
const fahrenheitRadio = document.querySelector("#fahrenheit");
const celsiusRadio = document.querySelector("#celsius");

const temperature = function() {
   const temp = 5572;
   const kelvin = temp + " K";
   const fahrenheit = Math.round(temp * 1.8 - 459.67) + " °F";
   const celsius = Math.round(temp - 273.15) + " °C";

   if (kelvinRadio.checked) {
      $(".temp").text(kelvin);
   }
   if (celsiusRadio.checked) {
      $(".temp").text(celsius);
   }
   if (fahrenheitRadio.checked) {
      $(".temp").text(fahrenheit)
   }
};

// bug | Kelvin should display by default but nothing displays. hardcodded values as a temp solution.
selectUnits.addEventListener("click", function() {
   if (kelvinRadio.checked) {
      console.log("kelvin");
      temperature();
   } else if (celsiusRadio.checked) {
      console.log("celsius");
      temperature();
   } else if (fahrenheitRadio.checked) {
      console.log("fahrenheit");
      temperature();
   }
});

// logic.display copyright year
const copyrightYear = function() {
   let year = new Date().getFullYear();
   const copyrightYearEl = document.querySelector("#copyright-year");
   copyrightYearEl.textContent = year;
};

// logic.display current date
const currentDate = function() {
   let date = moment().format("MMMM Do");
   const currentDateEl = document.querySelector("#current-date");
   currentDateEl.textContent = date;
};

// logic.display days of the week
const forecast = function() {
   const day2El = document.querySelector("#day-2");
   const day3El = document.querySelector("#day-3");
   const day4El = document.querySelector("#day-4");
   const day5El = document.querySelector("#day-5");

   const tomorrow = moment().add(1, "days");
   day2El.textContent = tomorrow.format("dddd");

   const day3 = moment().add(2, "days");
   day3El.textContent = day3.format("dddd");

   const day4 = moment().add(3, "days");
   day4El.textContent = day4.format("dddd");

   const day5 = moment().add(4, "days");
   day5El.textContent = day5.format("dddd");
};

// logic.display api data
const displayCoronalMassEjections = function (CME) {
   const cmeTimeEl = document.querySelector("#cme-time");
   const cmeLatitudeEl = document.querySelector("#cme-latitude");
   const cmeLongitudeEl = document.querySelector("#cme-longitude");
   const cmeAngleEl = document.querySelector("#cme-angle");
   const cmeSpeedEl = document.querySelector("#cme-speed");
   const cmeTypeEl = document.querySelector("#cme-type");
   const cmeNoteEl = document.querySelector("#cme-note");

   // get latest coronal mass ejection data
   latestCME = CME[CME.length - 1];

   // reformat time
   const startTime = moment(latestCME.startTime).format("dddd, MMMM Do h:mm a");

   // display data
   cmeTimeEl.textContent = startTime;
   cmeLatitudeEl.textContent = latestCME.cmeAnalyses[0].latitude;
   cmeLongitudeEl.textContent = latestCME.cmeAnalyses[0].longitude;
   cmeAngleEl.textContent = latestCME.cmeAnalyses[0].halfAngle;
   cmeSpeedEl.textContent = latestCME.cmeAnalyses[0].speed;
   cmeTypeEl.textContent = latestCME.cmeAnalyses[0].type;
   cmeNoteEl.textContent = latestCME.note;
};

const displaySolarFlares = function (FLR) {
   const flrDateEl = document.querySelector("#flr-date");
   const flrDurationEl = document.querySelector("#flr-duration");
   const flrRegionEl = document.querySelector("#flr-region");
   const flrBeginTimeEl = document.querySelector("#flr-begin");
   const flrPeakTimeEl = document.querySelector("#flr-peak");
   const flrEndTimeEl = document.querySelector("#flr-end");
   const flrLocationEl = document.querySelector("#flr-location");
   const flrClassEl = document.querySelector("#flr-class");
   console.log(`
   \u00A9 2022 Edwin M. Escobar
   github.com/escowin/solar-weather-app
   `);

   // get latest solar flare data
   const latestFLR = FLR[FLR.length -1];

   // reformat time
   const flrDate = moment(latestFLR.beginTime).format("dddd, MMMM Do")
   const beginTime = moment(latestFLR.beginTime).format("hh:mm a");
   const peakTime = moment(latestFLR.peakTime).format("hh:mm a");
   const endTime = moment(latestFLR.endTime).format("hh:mm a");

   // calculating the solar flare duration 
   const start = new moment(latestFLR.beginTime);
   const end = new moment(latestFLR.endTime);
   const duration = moment.duration(end.diff(start)).as("minutes");
   
   flrDateEl.textContent = flrDate;
   flrDurationEl.textContent = duration;
   flrRegionEl.textContent = latestFLR.activeRegionNum;
   flrBeginTimeEl.textContent = beginTime;
   flrPeakTimeEl.textContent = peakTime;
   flrEndTimeEl.textContent = endTime;
   flrLocationEl.textContent = latestFLR.sourceLocation;
   flrClassEl.textContent = latestFLR.classType;
};

// logic.api set-up
// to-do : hide real api key
const apiKey = "DEMO_KEY";
const startDate = moment().subtract(7, "days").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

const getCoronalMassEjections = function() {
   const apiUrl = `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;

   // fetching the array of recent coronal mass ejections
   fetch(apiUrl).then(function(response) {
      // method formats the response as json. returns a promise. the then() method captures the actual data
      response.json().then(function(data) {
         displayCoronalMassEjections(data)
      });
   });
};

const getSolarFlares = function() {
   const apiUrl = `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;

   // fetching the array of recent solar flares
   fetch(apiUrl).then(function(response) {
      // method formats the response as json. returns a promise. the then() method captures the actual data
      response.json().then(function(data) {
         displaySolarFlares(data);
      });
   });
};


// calls
copyrightYear();
currentDate();
forecast();
// getCoronalMassEjections();
// getSolarFlares();
