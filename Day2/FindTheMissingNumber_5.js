/*
Find the missing number / numbers
----------------------------------------
Example: Given an array of numbers in random order, find the missing numbers
[7, 10, 12, 9] // output [8, 11] since these are the numbers missing in 7, 9, 10, 12
Note: The numbers will be given as input in any order.
*/

let userInput = [99,100];

const findMissingNumber = function (userInput) {
  //Check if the input is given
  if (typeof userInput === undefined || userInput.length === 0 || typeof userInput !== 'object') {
    console.error('Invalid Input..');
    return;
  }

  //Check if it has multiple elements
  if(userInput.length === 1){
    console.error("Array has single element only..Need Multiple elements");
    return;
  }

  //Check if the given input is an array and it has the same elements type
  if (typeof userInput === "object") {
    for (let i = 0; i < userInput.length; i++) {
      if (typeof userInput[i] !== "number") {
        console.error("All elements should be in number type");
        return;
      }
    }
  }

  

  //Sort user input
  const sortedUserInput = sortUserInput(userInput);
  const smallestNumber = sortedUserInput[0];
  const largestNumber = sortedUserInput[sortedUserInput.length-1];

  const missingNumbers = [];
  let findIndex = 0;

  //Running loop from small to large , and push the missing elements
  for(let i=smallestNumber;i<=largestNumber;i++){
    if(sortedUserInput[findIndex] !== i){
      missingNumbers.push(i);
    }
    else findIndex++;
  }

  return missingNumbers;
  
};

//To Sort the input
const sortUserInput = function (userInput) {
    for(let i=0;i<userInput.length-1;i++){
        let maxNumber = userInput[0];
        let maxIndex = 0;
        let last = userInput.length-i-1;
        for(let j=0;j<=last;j++){
            if(userInput[j] > maxNumber){
                maxNumber = userInput[j];
                maxIndex = j;
            }
        }

        let temporaryHolder = userInput[maxIndex];
        userInput[maxIndex] = userInput[last]
        userInput[last] = temporaryHolder;
    }

    return userInput;
};

const missingNumbers = findMissingNumber(userInput);
if(missingNumbers){
  console.log(missingNumbers);
}
