/*
Check if the number / date is in range
----------------------------------
For example: checkInRange([1, 10], 4) // true since 4 is in between 1 and 10
checkInRange([10, 100], 8) // true false 8 is not in between 10 and 100
inRange([new Date('2025-01-01'), new Date('2025-02-01')], new Date('2025-02-01'); // false
*/

const range = [new Date("2025-01-01"), new Date("2025-02-01")];
const valueToCheck = new Date("01/10/2025");

const checkInRange = function (range, valueToCheck) {
  //Check if the ranges is an Array
  if (!Array.isArray(range)) {
    console.error("Range should be an array...");
    return;
  }

  //Check if the range only has two values
  if (range.length !== 2) {
    console.error("Given an invalid ranges..");
    return;
  }

  //Check if the value is date or number
  if (typeof valueToCheck !== "number" && typeof valueToCheck !== "object") {
    console.error("Only number and objects should br accepted for the value..");
    return;
  }

  const firstBound = range[0];
  const secondbound = range[1];

  console.log(typeof firstBound, typeof secondbound, typeof valueToCheck);

  //Check if the values are in same type
  if (
    typeof firstBound !== typeof secondbound &&
    typeof secondbound !== typeof valueToCheck
  ) {
    console.error("range and value should be in the same type...");
    return;
  }

  //Check if it is a correct date type
  if (typeof valueToCheck === "object") {
    console.log(valueToCheck.toISOString());
  }

  //Assign higher value to upperbound and lower value to lowerbound
  const upperBound = (firstBound < secondbound) ? secondbound : firstBound;
  const lowerBound = firstBound <= secondbound ? firstBound : secondbound;
  console.log(upperBound, lowerBound, valueToCheck);

  if (typeof upperBound === "object" || typeof upperBound === "number") {
    return valueToCheck < upperBound && valueToCheck > lowerBound;
  } else {
    console.error("Invalid Type...");
    return;
  }
};

console.log(checkInRange(range, valueToCheck));
