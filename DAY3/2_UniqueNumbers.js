/*
2. Find the numbers that are present in one array but not in the other.
For example:
const arr1 = [3, 45, 42, 11, 34];
const arr2 = [35, -7, 87, 11, 1, 45];
findDifference(arr1, arr2)
// Output: [3, 42, 34, 35, -7, 87, 1]
*/

const firstUserInput = [3, 45, 42, 11.0, 42];
const secondUserInput = [35, -7, 87, 11.0, 1, 45];

//Check the input for number type
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

const findUniqueElements = function (firstUserInput, secondUserInput) {
  //Check if the inputs are array
  if (!Array.isArray(firstUserInput) || !Array.isArray(secondUserInput)) {
    console.error("Invalid Inputs Given...");
    return;
  }

  //Check if both inputs are not empty
  if (firstUserInput.length === 0 && secondUserInput.length === 0) {
    return [];
  } else if (firstUserInput.length === 0 || secondUserInput.length === 0) {
    if (firstUserInput.length === 0) return secondUserInput;
    else if (secondUserInput === 0) return firstUserInput;
  }

  //Check if both inputs are in numbers type
  const isFirstInputValid = checkInputType(firstUserInput);
  if (!isFirstInputValid) {
    return false;
  }

  const isSecondInputValid = checkInputType(secondUserInput);
  if (!isSecondInputValid) {
    return false;
  }

  const mapToCheckPresence = {};
  const uniqueElements = [];

  for (let i = 0; i < firstUserInput.length; i++) {
    const currentElement = firstUserInput[i];
    if (!mapToCheckPresence[currentElement]) {
      mapToCheckPresence[currentElement] = true;
    }
  }

  for (let i = 0; i < secondUserInput.length; i++) {
    const currentElement = secondUserInput[i];
    if (mapToCheckPresence[currentElement]) {
      mapToCheckPresence[currentElement] = false;
    } else uniqueElements.push(currentElement);
  }

  for (let i = 0; i < firstUserInput.length; i++) {
    const currentElement = firstUserInput[i];
    if (mapToCheckPresence[currentElement]) {
      uniqueElements.push(currentElement);
      mapToCheckPresence[currentElement] = false;
    }
  }

  return uniqueElements;
};

const uniqueElements = findUniqueElements(firstUserInput, secondUserInput);
if (uniqueElements !== undefined) {
  console.log("Unique Elements: ", uniqueElements);
}
