// import "../css/styles.css";
const { year } = require("./utils/time");
const Display = require("./lib/Display")
const display = new Display();
display.displayData();

console.log(`
   \u00A9 ${year} Edwin M. Escobar
   https://github.com/escowin/sun-tracker
`);