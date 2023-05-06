// Define function to update elements with the local time
function updateTime(className) {
  // Define the timezone offset for Eastern Time (ET)
  let ETOffset = -240;

  // Get the user's time zone offset from UTC in minutes
  let userOffset = new Date().getTimezoneOffset();

  // Convert the time zone offset to hours, considering UTC to ET and adjust for the user's location
  let offset = userOffset / 60 - 4;

  // Get all elements with the given class name
  let elements = document.querySelectorAll(`[class*="${className}"]`);

  // Check if the elements found are empty or not
  if (elements.length === 0) {
    console.log(`No element found with class name '${className}'`);
    return;
  }

  // Loop through all found elements
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];

    // Split the text content of the element into parts
    let bits = element.innerHTML.split(/[\s]+/);

    // Check if the game is already live so to not mess with the game time clock. (p is for Games tab and span is for Schedule tab and div is for Home)
    if (element.tagName.toLowerCase() === 'p' || element.tagName.toLowerCase() === 'span' || (element.tagName.toLowerCase() === 'div' && className == "ScoreboardGame_gameStatus" )
        && bits[0] != 'Q1' && bits[0] != 'Q2' && bits[0] != 'Q3' && bits[0] != 'Q4' && bits [0] != 'End' && bits [0] != 'Half') {

      // Get the hour and minute from the text content of the element
      t = bits[0];
      let split = t.split(/[:]+/);
    
      // Calculate the adjusted hour based on the user's timezone offset
      t = parseInt(split[0]) - offset;

      // Convert 24-hour format to 12-hour format and adjust AM/PM accordingly
      if(parseInt(t) >= 12 && bits[1] == "pm") {
        bits[1] = "am";
        if (parseInt(t) > 12) {
          t = parseInt(t) - 12;
        }
      }

      if(parseInt(t) >= 12 && bits[1] == "am") {
        bits[1] = "pm";
        if (parseInt(t) > 12) {
          t = parseInt(t) - 12;
        }
      }

      // Update the text content of the element with the adjusted time and user's time zone
      element.innerHTML = t + ":" + split[1] + " " + bits[1] + " (UTC" + (userOffset > 0 ? '-' : '+') + Math.abs(userOffset / 60) + ")"; // bits[1] +
    }
  }
}

// Define function to run when the window is loaded
window.onload = function() {

  // Call the updateTime function for each type of element that needs to be updated in nba.com
  updateTime('ScoreboardGame_gameStatus');// Home Page
  updateTime('GameCardMatchupStatusText');// Games Tab
  updateTime('ScheduleStatusText');// Schedule Tab
}
