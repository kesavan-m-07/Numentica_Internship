/*
4. From an array of strings, return an object with the count of each string.
count(["a", "b", "a", "c", "b", "a"]);
// Output: { a: 3, b: 2, c: 1 }
*/

const userInput = ["a", "", "a", 1, "", "A",null];

const findTheCountOfEachLetter = function (userInput) {
  //Check if the user inout i an array
  if (!Array.isArray(userInput)) {
    console.error("Invalid Input found");
    return;
  }

  const frequencyMapOfLetters = {};

  for (let i = 0; i < userInput.length; i++) {
    const currentElement = userInput[i];
    if(typeof currentElement !== 'string' || currentElement.length === 0) continue;
    const updatedCurrentElement = currentElement.toLowerCase();
    frequencyMapOfLetters[updatedCurrentElement] = frequencyMapOfLetters[updatedCurrentElement] + 1 || 1;
  }
  return frequencyMapOfLetters;

};

const frequncyCountOfEachLetter = findTheCountOfEachLetter(userInput);
if (typeof frequncyCountOfEachLetter === "object") {
  console.log(frequncyCountOfEachLetter);
}
