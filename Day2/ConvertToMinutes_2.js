/*
toMinutes(timeStr, options = { round: 'down' })
----------------------------------------------------
Convert "HH:MM[:SS][ am/pm]" to minutes. Support 12h/24h (not mixed).
Hours can exceed 24. Seconds rounding: 'down'|'nearest'|'up'. Throw on invalid.
Examples:
"2:30" → 150
"2:30:45" → 151 if round:'nearest', else 150
"12:00 am" → 0
"12:00 pm" → 720
"24:00" → 1440
"14:70" → throw (invalid minutes)
*/

const time = ":15";
const option = "nearest";

//Check 24 hours
const is24Hours = function (time) {
  return time[time.length - 1] !== "m";
};

//Splice the time string based on the input
const splicetime = function (time, startIndex, endIndex) {
  let splicedTime = "";
  for (let i = startIndex; i < endIndex; i++) {
    splicedTime += time[i];
  }
  return splicedTime;
};

//Splits the time string based on ':'
const splitTime = function (time) {
  let splittedTime = [];
  let startIndex = null;
  let i;
  for (i = 0; i < time.length; i++) {
    const currentLetter = time[i];
    if (currentLetter === ":") {
      if (startIndex !== null) {
        const splicedTime = splicetime(time, startIndex, i);
        if (splicedTime && !isNaN(Number(splicedTime)))
          splittedTime.push(Number(splicedTime));
        else {
          console.error("Invalid input..");
          return;
        }
        startIndex = null;
      } else {
        console.error("Invalid input..");
        return;
      }
    } else {
      if (startIndex === null) startIndex = i;
    }
  }

  splittedTime.push(Number(splicetime(time, startIndex, i)));

  return splittedTime;
};

const removeSpace = function (time) {
  let timeWithoutSpace = "";
  for (let i = 0; i < time.length; i++) {
    if (time[i] !== " ") timeWithoutSpace += time[i];
  }
  return timeWithoutSpace;
};

const convertTimeToMinutes = function (time, option) {
  //Check the input
  if (typeof time !== "string" && typeof option !== "string") {
    console.error("Invalid Input..");
    return;
  }

  //Remove Space
  const timeWithoutSpace = removeSpace(time);

  //Check if it 12 or 24 hrs
  const is24Hrs = is24Hours(timeWithoutSpace);
  let isAm;
  if (!is24Hrs) {
    const amOrPm = splicetime(
      timeWithoutSpace,
      timeWithoutSpace.length - 2,
      timeWithoutSpace.length
    );
    if (amOrPm.toLowerCase() === "am") isAm = true;
    else isAm = false;
  }
  let splittedTime;
  if (is24Hrs) {
    splittedTime = splitTime(time);
  } else {
    splittedTime = splitTime(
      splicetime(timeWithoutSpace, 0, timeWithoutSpace.length - 2)
    );
  }

  if (!is24Hrs) {
    const hour = splittedTime[0];
    if (hour > 12) {
      console.error("Invalid Input..");
      return;
    }
    if (!isAm) {
      if (hour != 12) {
        splittedTime[0] += 12;
      }
    } else {
      if (hour == 12) {
        splittedTime[0] -= 12;
      }
    }
  }


  //Extracting time from splittedTime
  const splittedhour = splittedTime[0];
  const splittedMinute = splittedTime[1];
  const splittedSeconds = splittedTime[2];

  //Check for invalid input
  if (splittedhour > 24 || splittedMinute >= 60 || splittedSeconds >= 60) {
    console.error("Invalid Input");
    return;
  }

  //Get the totalSeconds
  let totalSeconds = splittedhour * 3600 + splittedMinute * 60;

  if (splittedSeconds) {
    totalSeconds += splittedSeconds;
  }

  console.log("Total Seconds:", totalSeconds);

  let totalMinutes = Math.floor(totalSeconds / 60);
  let reminedSeconds = totalSeconds % 60;

  if (reminedSeconds === 0) return totalMinutes;
  else {
    if (option === "nearest") {
      if (reminedSeconds > 30) {
        totalMinutes += 1;
      }
    } else if (option === "up") {
      totalMinutes += 1;
    }
  }

  return totalMinutes;
};

const minutes = convertTimeToMinutes(time, option);
if (minutes !== undefined) {
  console.log("Minutes: ", minutes);
}
