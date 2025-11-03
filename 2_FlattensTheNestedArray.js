/*
2. Write a function that flattens a nested array.Find
For example:
flatten([1, 2, [3, 4]]);
output: [1,2,3,4]
*/

const nestedUserInput = [1, 2, [3, [5, 6, [7, 8, [9], 10, null]]],undefined];

const mergeTwoInputs = function (firstInput, secondInput) {
  let mergedInput = [];
  for (let i = 0; i < firstInput.length; i++) {
    const currentElement = firstInput[i];
    mergedInput.push(currentElement);
  }

  for (let i = 0; i < secondInput.length; i++) {
    const currentElement = secondInput[i];
    mergedInput.push(currentElement);
  }

  return mergedInput;
};

const recuresiveFlattener = function (nestedUserInput) {
  let flattedUserInput = [];

  for (let i = 0; i < nestedUserInput.length; i++) {
    const currentElement = nestedUserInput[i];
    const currentElementType = typeof currentElement;

    // if (currentElementType !== "number" && !Array.isArray(currentElement))
    //   continue;

    if (Array.isArray(currentElement)) {
      const recursiveFlattedList = recuresiveFlattener(currentElement);
      if (recursiveFlattedList.length !== 0) {
        flattedUserInput = mergeTwoInputs(
          flattedUserInput,
          recursiveFlattedList
        );
      }
    } else {
      flattedUserInput.push(currentElement);
    }
  }
  return flattedUserInput;
};

const flattenTheNestedInput = function (nestedUserInput) {
  //Check If the input is an array
  if (!Array.isArray(nestedUserInput)) {
    console.error("Given Input is not an array");
    return;
  }

  return recuresiveFlattener(nestedUserInput);
};

const flattedUserInput = flattenTheNestedInput(nestedUserInput);
if (Array.isArray(flattedUserInput)) {
  console.log("Flatted List : ", flattedUserInput);
}
