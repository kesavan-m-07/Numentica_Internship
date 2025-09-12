/*
5. Implement a function to rotate the characters in a string by a given number of positions.
If the number is positive, rotate to the right.
If the number is negative, rotate to the left.
For example:
rotate("arun", 2)   // "unar"
rotate("arun", -2)  // "unar" (left rotation)
rotate("hello", 3)  // "llohe"
*/

const wordToRotate = "Karthikeyan";
const numberOfPositions = -20;

const splitWord = function (wordToSplit, startIndex, endIndex) {
  let splittedWord = "";
  for (let i = startIndex; i <= endIndex; i++) {
    splittedWord += wordToSplit[i];
  }
  return splittedWord;
};

const rotateWordToNumberOfPostion = function (wordToRotate, numberOfPositions) {
  //Check if the input are correct type
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

  let rotatedWord = "";
  let firstPartOfWord = "";
  let secondPartOfWord = "";

  //Change the negative position to appropirate positive positions
  if (numberOfPositions === 0) return wordToRotate;
  else if (numberOfPositions < 0) {
    numberOfPositions = numberOfPositions * -1;
    numberOfPositions %= wordLength;
    firstPartOfWord = splitWord(
      wordToRotate,
      numberOfPositions,
      wordLength - 1
    );
    secondPartOfWord = splitWord(wordToRotate, 0, numberOfPositions - 1);
    rotatedWord = firstPartOfWord + secondPartOfWord;
  } else {
    numberOfPositions %= wordLength;
    const startIndex = wordLength - numberOfPositions;
    firstPartOfWord = splitWord(wordToRotate, startIndex, wordLength - 1);
    secondPartOfWord = splitWord(wordToRotate, 0, startIndex - 1);
  }
  rotatedWord = firstPartOfWord + secondPartOfWord;

  return rotatedWord;
};

const rotatedWord = rotateWordToNumberOfPostion(
  wordToRotate,
  numberOfPositions
);
if (typeof rotatedWord === "string") {
  console.log("Rotated Word: ", rotatedWord);
}
