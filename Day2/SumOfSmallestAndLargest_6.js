/*
Return the sum of smallest and largest number in an array
---------------------------------------------------------
Example: [45, 2, 25, 11, 16]
Here the output will be 2(smallest) + 45 (largest)
Output will be 47
*/

const userInput = [45,-10, null];

const sumOfSmallestAndLargest = function (userInput) {
  //Check if the input is given
  if (
    typeof userInput === undefined ||
    userInput.length === 0 ||
    typeof userInput !== "object"
  ) {
    console.error("Invalid Input..");
    return;
  }

  //Check if the given input is an array and it has the same element type
  if (typeof userInput === "object") {
    for (let i = 0; i < userInput.length; i++) {
      if (typeof userInput[i] !== "number") {
        console.error("All elements should be in number type");
        return;
      }
    }
  }


  //Find smallest and largest number
  let smallestNumber = Number.MAX_VALUE;
  let largestNumber = Number.MIN_VALUE;

  for(let i=0;i<userInput.length;i++){
    const currentNumber = userInput[i];
    if(smallestNumber >= currentNumber){
        smallestNumber = currentNumber;
    }
    if(largestNumber <= currentNumber){
        largestNumber = currentNumber;
    }
  }

  return smallestNumber + largestNumber;
  
};

const sum = sumOfSmallestAndLargest(userInput);
if (sum !== undefined) {
  console.log("Sum: ", sum);
}
