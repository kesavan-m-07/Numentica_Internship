/*
Template String Replace
----------------------------
For example:
const string = “Numentica is a company focused on delivering high quality code. It is located in #[location] #[state] #[phone]“;
replaceTemplateString(string, [[“location”, “Chennai”], [“state”, “Tamil Nadu”], [“phone”, “9840164723"]])
Output: Numentica is a company focused on delivering high quality code. It is located in Chennai Tamil Nadu 9840164723
*/

const sentence =
  "Numentica is a company focused on # deliv[ering] high quality code. It is located in #[lOcation] #[state] #[phone]";
const wordsToReplace = [
  ["location", "Chennai"],
  ["state", "Tamil Nadu"],
  ["phone", "9840164723"],
];

const replaceTemplateString = function (sentence, wordsToReplace) {
  //Check if the input are given
  if (
    typeof sentence !== "string" ||
    typeof wordsToReplace !== "object" ||
    wordsToReplace.length === 0
  ) {
    console.error("Invalid Input..");
    return;
  }

  //To store wordsMap
  const map = {};

  for (let i = 0; i < wordsToReplace.length; i++) {
    const currentWord = wordsToReplace[i];
    console.log(currentWord);
    map[currentWord[0]] = currentWord[1];
  }

  //To store the index of the hash,brackets
  let hashtagIndex = null;
  let openBracketIndex = null;
  let closeBracketIndex = null;
  let replacedSentence = "";

  for (let i = 0; i < sentence.length; i++) {
    const currentLetter = sentence[i];
    
    if (currentLetter === "#") {
      if (i + 1 < sentence.length && sentence[i + 1] === "[") { //check the next letter for opening bracket
        if (!openBracketIndex && !closeBracketIndex) hashtagIndex = i;
        else {
          console.error("Invalid Input..");
          return;
        }
      } else replacedSentence += currentLetter;
    } else if (currentLetter === "[") {
      if (i - 1 >= 0 && sentence[i - 1] === "#") openBracketIndex = i; //check the previous letter for hashtag
      else replacedSentence += currentLetter;
    } else if (currentLetter === "]") {
      if (hashtagIndex && openBracketIndex) {
        const splicedSentence = spliceSentence(sentence, openBracketIndex, i);
        let replacedWord = map[splicedSentence.toLowerCase()];
        if (!replacedWord) {
          console.error("No matched word found..");
          return;
        }
        replacedSentence += replacedWord;
        hashtagIndex = null;
        openBracketIndex = null;
        closeBracketIndex = null;
      }
      else{
        replacedSentence += currentLetter;
      }
    } else if (hashtagIndex === null) {
      replacedSentence += currentLetter;
    }
  }

  return replacedSentence;
};

//Function to split the sentence
const spliceSentence = function (sentence, startIndex, endIndex) {
  let splicedSentence = "";
  for (let i = startIndex + 1; i <= endIndex - 1; i++) {
    splicedSentence += sentence[i];
  }
  return splicedSentence;
};

const replacedSentence = replaceTemplateString(sentence, wordsToReplace);
if (replacedSentence) {
  console.log("Replaced Sentence : ", replacedSentence);
}
