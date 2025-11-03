/*
3. Calculate total hours passed between two time
Accepted input format example "9:00 AM"
Ex: calculateTotalHoursElapsed("9:00 AM", "10:00 AM") //Output 1 Hour
Ex: calculateTotalHoursElapsed("9:00 AM", "3:12 PM") // Output 6 Hour 12 minutes
*/

const timeOne = "0012:51 pM     ";
const timeTwo = "4:50 aM     ";

//To Remove spaces in time also to extract the time and period
const normalizeTime = function (time) {
  let normalizedTime = "";
  for (let i = 0; i < time.length; i++) {
    const currentElement = time[i].toLowerCase();
    if (currentElement === " ") continue;
    normalizedTime += currentElement;
  }

  const period = normalizedTime.slice(-2);
  normalizedTime = normalizedTime.slice(0, -2);

  return { normalizedTime, period };
};

//To check the given time is valid
const isValidTime = function (hour, minutes) {
  return hour > 0 && hour <= 12 && minutes >= 0 && minutes < 60;
};

//To retreive the minutes from 12 am
const getMinutes = function (hour, minutes, period) {
  if (period === "pm" && hour !== 12) hour += 12;
  if (period === "am" && hour === 12) hour = 0;

  return hour * 60 + minutes;
};

const calculateTotalHoursElapsed = function (timeOne, timeTwo) {
  if (typeof timeOne !== "string" || typeof timeTwo !== "string") {
    console.error("Invalid Input");
    return;
  }
  const normalizedTimeOne = normalizeTime(timeOne);
  const normalizedTimeTwo = normalizeTime(timeTwo);

  const firstPeriod = normalizedTimeOne["period"];
  const secondPeriod = normalizedTimeTwo["period"];

  const firstTime = normalizedTimeOne["normalizedTime"];
  const secondTime = normalizedTimeTwo["normalizedTime"];

  if (
    (firstPeriod !== "am" && firstPeriod !== "pm") ||
    (secondPeriod !== "am" && secondPeriod !== "pm")
  ) {
    console.error("Period Not Given..");
    return;
  }
  const splittedTimeOne = firstTime.split(":");
  const splittedTimeTwo = secondTime.split(":");

  let firstTimeHour = parseInt(splittedTimeOne[0]);
  const firstTimeMinute = parseInt(splittedTimeOne[1]);

  let secondTimeHour = parseInt(splittedTimeTwo[0]);
  const secondTimeMinute = parseInt(splittedTimeTwo[1]);

  //To check for valid input
  if (
    isNaN(firstTimeHour) ||
    isNaN(firstTimeMinute) ||
    isNaN(secondTimeHour) ||
    isNaN(secondTimeMinute)
  ) {
    console.error("Invalid Time Given");
    return;
  }

  if (
    !isValidTime(firstTimeHour, firstTimeMinute) ||
    !isValidTime(secondTimeHour, secondTimeMinute)
  ) {
    console.error("Invalid Time Given");
    return;
  }

  const minutesOne = getMinutes(firstTimeHour, firstTimeMinute, firstPeriod);
  const minutesTwo = getMinutes(secondTimeHour, secondTimeMinute, secondPeriod);

  let diffrence = minutesTwo - minutesOne;

  //If diffence is negative it will wrap around for next day
  if (diffrence < 0) diffrence += 24 * 60;

  const totalHours = Math.floor(diffrence / 60);
  const totalMinutes = diffrence % 60;
  
  if (totalMinutes === 0) return `${totalHours} Hours`;
  return `${totalHours} Hours and ${totalMinutes} Minutes`;
};

const totalHoursElapsed = calculateTotalHoursElapsed(timeOne, timeTwo);
if (typeof totalHoursElapsed === "string") console.log(totalHoursElapsed);
