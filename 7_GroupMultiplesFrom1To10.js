/*
7. Group multiples from 1 to 10
const inputArr = [34, 12, 10, 15, 7, 21, 81]
Output = [{1: [34, 12, 10, 15, 7, 21, 81]}, { 2: [34, 12, 10]}, {3: [12, 15, 21, 81] }]
*/

const userInput = [34,'56',33,new Date()];

const groupMultiplesFromOneToTen = function (userInput) {
  //Check the input is valid
  if (!Array.isArray(userInput)) {
    console.error("Invalid input");
    return;
  }

  //Check if the array is empty
  if (userInput.length === 0) return {};

  const multiplesFrom1To10 = {};
  for (let i = 0; i < userInput.length; i++) {
    const currentElement = userInput[i];
    if (typeof currentElement !== "number") continue;
    for (let j = 1; j <= 10; j++) {
        if(currentElement % j === 0){
            if(!multiplesFrom1To10[j]) multiplesFrom1To10[j] = []
            multiplesFrom1To10[j].push(currentElement);
        }
    }
  }

  return multiplesFrom1To10;
  
};

const multiplesFrom1To10 = groupMultiplesFromOneToTen(userInput);
if (typeof multiplesFrom1To10 === "object") console.log(multiplesFrom1To10);
