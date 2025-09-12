let sentence = "be kind whenever possible kind. kindness is what matters";
let word = "be";

function findNumberOfOccurance(sentence, word) {
  if (word.length === 0 || sentence.length === 0) return 0;
  let totalCount = 0;
  let windowSize = word.length;

  let substring = "";
  for (let right = 0; right < sentence.length; right++) {
    substring += sentence.charAt(right);
    if (substring.length > windowSize) {
      substring = removeFirstChar(substring);
    }
    console.log(substring);
    if (substring === word) totalCount++;
  }
  return totalCount;
}

function removeFirstChar(str) {
  let newStr = "";
  for (let i = 1; i < str.length; i++) {
    newStr += str[i];
  }
  return newStr;
}

console.log(findNumberOfOccurance(sentence, word));
