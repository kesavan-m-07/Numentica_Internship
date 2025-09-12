/*
6. Implement a function to reverse rotate the characters in a string by a given number of positions.
For example:
reverseRotate("unar", 2)   // "arun"
reverseRotate("llohe", 3)  // "hello"
*/

const wordToRotate = "llohe";
const numberOfPositions = 3;

const splitWord = function (wordToSplit, startIndex, endIndex) {
  let splittedWord = "";
  for (let i = startIndex; i <= endIndex; i++) {
    splittedWord += wordToSplit[i];
  }
  return splittedWord;
};

const reverseRotateTheWord = function (wordToRotate, numberOfPositions) {
  if (
    typeof wordToRotate !== "string" ||
    typeof numberOfPositions !== "number"
  ) {
    console.error("Invalid Input given..");
    return;
  }

  //Check if number of position in float
  if (numberOfPositions % 1 !== 0) {
    console.error("Given Input is not a whole number..");
    return;
  }

  const wordLength = wordToRotate.length;

  if (wordLength <= 0) {
    console.error("Invalid Input..");
    return;
  }

  let rotatedWord = '';

  numberOfPositions %= wordLength;
  const firstPartOfWord = splitWord(
      wordToRotate,
      numberOfPositions,
      wordLength - 1
    );
    const secondPartOfWord = splitWord(wordToRotate, 0, numberOfPositions - 1);
    rotatedWord = firstPartOfWord + secondPartOfWord;

    return rotatedWord;

};

const rotatedWord = reverseRotateTheWord(wordToRotate, numberOfPositions);
if (typeof rotatedWord === "string") {
  console.log("Rotated Word: ", rotatedWord);
}
