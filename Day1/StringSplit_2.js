let sentence = "kesavan";
let count = 0;

function stringSplit(sentence, count) {
  if (sentence.length === 0 || count <= 0) return[];
  let splittedSentence = [];
  let sub = "";
  for (let i = 0; i < sentence.length; i++) {
    sub += sentence[i];
    if (sub.length === count) {
      splittedSentence.push(sub);
      sub = "";
    }
  }
  if (sub !== "") splittedSentence.push(sub);
  return splittedSentence;
}

console.log(stringSplit(sentence, count));
