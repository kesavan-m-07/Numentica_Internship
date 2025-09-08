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

//To Check whether the element is already present in the given array
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

//It Retreives the existed array and merge the second array with it
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


//Used to add the given array in the given map(object)
const addValuesToMap = function (userInput, mapToMergeValues) {
  let mergedMap = mapToMergeValues;
  for (let keyOfObject in userInput) {
    if(keyOfObject === 'null' || keyOfObject === 'undefined')continue;
    
    const currentValue = userInput[keyOfObject];
    if (!Array.isArray(currentValue)) continue;//If the value is not an array,it skip it, so the valid elements after this will not get omitted
    keyOfObject = keyOfObject.toLowerCase();
    if (!mergedMap[keyOfObject]) {
      mergedMap[keyOfObject] = []; //Initialize empty array if the key is not available in the map
    }
    const listToBeUpdated = mergedMap[keyOfObject]; //Retreive the existing key
    mergedMap[keyOfObject] = mergeTwoInputs(listToBeUpdated, currentValue);// merge the current array with existing array
  }
  return mergedMap;
};


const mergeObjectWithMatchedKeys = function (userInputOne, userInputTwo) {
  //Check if the Both input are plain objects
  if (!isPlainObject(userInputOne) || !isPlainObject(userInputTwo)) {
    return;
  }

  let mapToMergeValues = {}; //The entire structure will be changed, so let is used

  mapToMergeValues = addValuesToMap(userInputOne, mapToMergeValues); //passing empty map and userInput one
  mapToMergeValues = addValuesToMap(userInputTwo, mapToMergeValues); //passing the map with values of userInput one and userinputTwo

  return mapToMergeValues;
};

//To check the dayatype of returned value
const mergedObject = mergeObjectWithMatchedKeys(userInputOne, userInputTwo);
if (typeof mergedObject === "object") {
  console.log(mergedObject);
}
