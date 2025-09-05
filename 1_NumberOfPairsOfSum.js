/*
1. Find number of pairs in an array which has the sum provided as a parameter
For example:
const arr1 = [4, 2, 5, 6, 8, 1];
const sum = 6;
numberOfPairs(arr1, sum);
// Pais that matches are [4, 2] => 6. [5, 1] => 6
So output 2
*/

const userInput = [3,3,3,null];
const sumOfPairs = 6;

const findNumberOfPairsOfGivenSum = function (userInput, sumOfPairs) {
  //Check if the inputs were given
  if (!Array.isArray(userInput) || typeof sumOfPairs !== "number") {
    console.error("Invalid Input Given..");
    return;
  }

  //Check if the array is empty
  if (userInput.length === 0) return 0;

  const mapToHoldComplements = {};
  let totalPairs = 0;

  for (let i = 0; i < userInput.length; i++) {

    const currentElement = userInput[i];
    if(typeof currentElement !== 'number') continue;

    const complement = sumOfPairs - currentElement;
    
    if(typeof (mapToHoldComplements[complement]) === 'number'){
        totalPairs+= mapToHoldComplements[complement];
    }
    mapToHoldComplements[currentElement] = mapToHoldComplements[currentElement] + 1 || 1;
  }

  return totalPairs;
};

const totalPairs = findNumberOfPairsOfGivenSum(userInput, sumOfPairs);
if (typeof totalPairs === "number") {
  console.log("Total Pairs: ", totalPairs);
}
