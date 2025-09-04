/*
1. Find the common numbers in two arrays
const arr1 = [3, 42, 42, 11, 34];
const arr2 = [35, -7, 87, 11, 1, 42]
findCommon(arr1, arr2)
Output = [11, 45]
*/

const firstUserInput = ["3", 42.5, 42.5, 11, 34];
const secondUserInput = ['35', -7, 42.5, 11.0, 1, 42.5];

const checkInputType = function (userInput) {
  let inputPointer = 0;
  while (inputPointer < userInput.length) {
    const currentElement = userInput[inputPointer];
    if (typeof currentElement !== "number") {
      console.error("invalid input type...");
      return false;
    }
    inputPointer++;
  }
  return true;
};

const findCommonNumberInTwoArrays = function (firstUserInput, secondUserInput) {
  //Check if the inputs are array
  if (!Array.isArray(firstUserInput) || !Array.isArray(secondUserInput)) {
    console.error("Invalid Inputs Given...");
    return;
  }

  //Check if both inputs are not empty
  if (firstUserInput.length === 0 && secondUserInput.length === 0) {
    return [];
  } else if (firstUserInput.length === 0 || secondUserInput.length === 0) {
    return [];
  }

  //Check if both inputs are in numbers type
  // const isFirstInputValid = checkInputType(firstUserInput);
  // if (isFirstInputValid) {
  //   const isSecondInputValid = checkInputType(secondUserInput);
  //   if (!isSecondInputValid) {
  //     return;
  //   }
  // } else return;

  //Map Object to hold the frequncy of numbers of firstUserInput
  const mapToHoldFrequencyOfNumbers = {};
  const commonNumbers = [];

  for (let i = 0; i < firstUserInput.length; i++) {
    const currentElement = firstUserInput[i];
    const currentElementType = typeof currentElement;
    if (
      !mapToHoldFrequencyOfNumbers[currentElement] &&
      currentElementType === "number"
    ) {
      mapToHoldFrequencyOfNumbers[currentElement] = 0;
    }

    if (currentElementType === "number") {
      mapToHoldFrequencyOfNumbers[currentElement] =
        mapToHoldFrequencyOfNumbers[currentElement] + 1;
    }
  }

  console.log(mapToHoldFrequencyOfNumbers);

  for (let i = 0; i < secondUserInput.length; i++) {
    const currentElement = secondUserInput[i];
    const currentElementType = typeof currentElement;
    if (currentElementType === 'number' && mapToHoldFrequencyOfNumbers[currentElement]) {
      const frequencyOfANumber = mapToHoldFrequencyOfNumbers[currentElement];
      if (frequencyOfANumber > 0) {
        commonNumbers.push(currentElement);
        mapToHoldFrequencyOfNumbers[currentElement] =
          mapToHoldFrequencyOfNumbers[currentElement] - 1;
      }
    }
  }

  return commonNumbers;
};

const commonNumbers = findCommonNumberInTwoArrays(
  firstUserInput,
  secondUserInput
);

if (commonNumbers !== undefined) {
  console.log("Common Numbers: ", commonNumbers);
}
