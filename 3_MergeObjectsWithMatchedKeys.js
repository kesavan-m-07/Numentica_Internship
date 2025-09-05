/*
3. Merge objects with array values
merge(
  { fruits: ["apple"], veggies: ["carrot"] },
  { fruits: ["banana"], drinks: ["water"] }
);
// Output: { fruits: ["apple", "banana"], veggies: ["carrot"], drinks: ["water"] }
*/

// const userInputOne = { fruits: ["apple"], veggies: ["carrot"] };

const userInputOne = {
  fruiTs: ["apple", "orange"],
  null: ["carrot", "tomato"],
};
const userInputTwo = {
  Fruits: ["apple", null, "fox", undefined],
  undefined: ["water", "coke", undefined],
};

const isPlainObject = function (userInput) {
  if (typeof userInput !== "object" || userInput === null) {
    console.error("Given Input is not a plain object...");
    return false;
  }

  //Check if the input protype is extended from Object prototype
  const objectPrototype = {};

  if (
    Object.getPrototypeOf(userInput) !== Object.getPrototypeOf(objectPrototype)
  ) {
    console.error("Given Input is not a plain object..");
    return false;
  }
  return true;
};

const isElementExist = function (valueToCheck, input) {
  for (let i = 0; i < input.length; i++) {
    const currentElement = input[i];
    if (typeof valueToCheck === "string") {
      valueToCheck = valueToCheck.toLowerCase();
    }
    if (currentElement === valueToCheck) return true;
  }
  return false;
};

const mergeTwoInputs = function (firstInput, secondInput) {
  let mergedInput = [];
  for (let i = 0; i < firstInput.length; i++) {
    const currentElement = firstInput[i];
    if (currentElement !== 'null' && currentElement !== 'undefined' && !isElementExist(currentElement, mergedInput)) {
      mergedInput.push(currentElement);
    }
  }

  for (let i = 0; i < secondInput.length; i++) {
    const currentElement = secondInput[i];
    if (currentElement !== null && currentElement !== undefined && !isElementExist(currentElement, mergedInput)) {
      mergedInput.push(currentElement);
    }
  }

  return mergedInput;
};

const addValuesToMap = function (userInput, mapToMergeValues) {
  let mergedMap = mapToMergeValues;
  for (let keyOfObject in userInput) {
    if(keyOfObject === 'null' || keyOfObject === 'undefined')continue;
    
    const currentValue = userInput[keyOfObject];
    if (!Array.isArray(currentValue)) continue;
    keyOfObject = keyOfObject.toLowerCase();
    if (!mergedMap[keyOfObject]) {
      mergedMap[keyOfObject] = [];
    }
    const listToBeUpdated = mergedMap[keyOfObject];
    mergedMap[keyOfObject] = mergeTwoInputs(listToBeUpdated, currentValue);
  }
  return mergedMap;
};

const mergeObjectWithMatchedKeys = function (userInputOne, userInputTwo) {
  //Check if the Both input are plain objects
  if (!isPlainObject(userInputOne) || !isPlainObject(userInputTwo)) {
    return;
  }

  let mapToMergeValues = {};

  mapToMergeValues = addValuesToMap(userInputOne, mapToMergeValues);
  mapToMergeValues = addValuesToMap(userInputTwo, mapToMergeValues);

  return mapToMergeValues;
};

const mergedObject = mergeObjectWithMatchedKeys(userInputOne, userInputTwo);
if (typeof mergedObject === "object") {
  console.log(mergedObject);
}
